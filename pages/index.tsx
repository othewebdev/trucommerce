import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Hero } from '@components/ui'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/api/operations/get-all-pages'
import getAllProducts from '@framework/api/operations/get-all-products'
import getSiteInfo from '@framework/api/operations/get-site-info'
import rangeMap from '@lib/range-map'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  // Get Featured Products
  const { products: featuredProducts } = await getAllProducts({
    variables: { field: 'featuredProducts', first: 12 },
    config,
    preview,
  })

  // Get Best Selling Products
  const { products: bestSellingProducts } = await getAllProducts({
    variables: { field: 'bestSellingProducts', first: 6 },
    config,
    preview,
  })

  // Get Best Newest Products
  const { products: newestProducts } = await getAllProducts({
    variables: { field: 'newestProducts', first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  const { featured, bestSelling } = (() => {
    const products = [...featuredProducts]
    return {
      featured: rangeMap(6, (i) => featuredProducts[i] ?? products.shift())
        .filter(nonNullable)
        .sort((a, b) => a.node.prices.price.value - b.node.prices.price.value)
        .reverse(),
      bestSelling: rangeMap(
        6,
        (i) => bestSellingProducts[i] ?? products.shift()
      ).filter(nonNullable),
    }
  })()

  return {
    props: {
      featured,
      bestSelling,
      newestProducts,
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

const nonNullable = (v: any) => v

export default function Home({
  newestProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Hero
        headline="Truley Unique"
        description="Find a Unique style today"
        subtitle="Face masks, earrings, cookie cutters and more!"
      />

      <Grid className="px-4" layout="normal">
        {newestProducts.slice(0, 9).map(({ node }, i) => (
          <ProductCard
            key={node.path}
            product={node}
            imgWidth={i === 0 ? 668 : 442}
            imgHeight={i === 0 ? 668 : 442}
            imgPriority
            imgLoading="eager"
          />
        ))}
      </Grid>
    </div>
  )
}

Home.Layout = Layout
