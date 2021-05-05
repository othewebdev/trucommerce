import rangeMap from '@lib/range-map'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Announcement, Grid, Footer, Hero } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/api/operations/get-all-products'
import getSiteInfo from '@framework/api/operations/get-site-info'
import getAllPages from '@framework/api/operations/get-all-pages'

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
  featured,
  bestSelling,
  brands,
  categories,
  newestProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Hero
        bg="bg-white"
        text="text-black"
        headline="Tired Of Trying To Fit In?"
        headlineTwo=" Truley Stand Out."
      />
      <Grid layout="normal">
        {featured.slice(0, 6).map(({ node }, i) => (
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
      <Footer
        bg="bg-black"
        text="text-white"
        headline="Protecting The World At All Costs."
        description="
        Our face masks are hand sewn and come with a pocket for medical grade filter material. Need adjustments? Each mask comes with 3D printed strap adjusters so you never have to worry about mask comfort. Getting fog on your glasses? Our masks contour to your face so no air can escape where it's not supposed too. We've got you covered.
        "
      />
    </div>
  )
}

Home.Layout = Layout
