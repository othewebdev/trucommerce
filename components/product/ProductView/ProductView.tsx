import { ProductSlider, Swatch } from '@components/product'
import { Button, Container, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import type { ProductNode } from '@framework/api/operations/get-product'
import useAddItem from '@framework/cart/use-add-item'
import usePrice from '@framework/use-price'
import cn from 'classnames'
import { ArrowLeft, RightArrow } from '../../icons'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { FC, useState } from 'react'
import {
  getCurrentVariant,
  getProductOptions,
  SelectedOptions,
} from '../helpers'
import s from './ProductView.module.css'

interface Props {
  className?: string
  children?: any
  product: ProductNode
}

const ProductView: FC<Props> = ({ product }) => {
  const addItem = useAddItem()
  const { price } = usePrice({
    amount: product.prices?.price?.value,
    baseAmount: product.prices?.retailPrice?.value,
    currencyCode: product.prices?.price?.currencyCode!,
  })
  const { openSidebar } = useUI()
  const options = getProductOptions(product)
  const [loading, setLoading] = useState(false)
  const [readMore, setReadMore] = useState(false)
  const [choices, setChoices] = useState<SelectedOptions>({
    size: null,
    color: null,
  })
  const variant =
    getCurrentVariant(product, choices) || product.variants.edges?.[0]

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: product.entityId,
        variantId: product.variants.edges?.[0]?.node.entityId!,
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  console.log(choices)

  return (
    <Container className="max-w-none w-full" clean>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images.edges?.[0]?.node.urlOriginal!,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
      <div className={cn(s.root, 'fit')}>
        <div className={cn(s.productDisplay, 'fit')}>
          <div className={s.sliderContainer}>
            <ProductSlider key={product.entityId}>
              {product.images.edges?.map((image, i) => (
                <div key={image?.node.urlOriginal} className={s.imageContainer}>
                  <Image
                    className={s.img}
                    src={image?.node.urlOriginal!}
                    alt={image?.node.altText || 'Product Image'}
                    width={1050}
                    height={1050}
                    priority={i === 0}
                    quality="100"
                  />
                </div>
              ))}
            </ProductSlider>
          </div>
        </div>

        <div className={s.sidebar}>
          <section>
            <div>
              <h1 className="text-2xl">{product.name}</h1>
              <div className="text-4xl">
                {price}
                {` `}
                {product.prices?.price.currencyCode}
              </div>
            </div>
            {options?.map((opt: any) => (
              <div className="pb-4" key={opt.displayName}>
                <h2 className="capitalize font-light">
                  Choose a {opt.displayName}:
                </h2>
                <div className="flex flex-wrap items-center  py-2">
                  {opt.values.map((v: any, i: number) => {
                    const active = (choices as any)[opt.displayName]
                    return (
                      <>
                        <Swatch
                          key={`${v.entityId}-${i}`}
                          active={v.label === active}
                          variant={opt.displayName}
                          color={v.hexColors ? v.hexColors[0] : ''}
                          label={v.label}
                          onClick={() => {
                            setChoices((choices) => {
                              return {
                                ...choices,
                                [opt.displayName]: v.label,
                              }
                            })
                          }}
                        />
                      </>
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="pb-14 break-words w-full">
              <Text
                html={
                  readMore
                    ? product.description
                    : `${product.description.substring(0, 600)}...`
                }
              />
              <button onClick={() => setReadMore(!readMore)}>
                {readMore ? '... Show Less' : 'Read More...'}
              </button>
            </div>
          </section>
          <div>
            <Button
              aria-label="Add to Cart"
              type="button"
              className={s.button}
              onClick={addToCart}
              loading={loading}
              disabled={!variant}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ProductView
