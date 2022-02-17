import { Modal } from '@components/common'
import { Swatch } from '@components/product'
import { Button, Container, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import type { ProductNode } from '@framework/api/operations/get-product'
import useAddItem from '@framework/cart/use-add-item'
import usePrice from '@framework/use-price'
import cn from 'classnames'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { FC, useState } from 'react'
import {
  getCurrentVariant,
  getProductOptions,
  SelectedOptions,
} from '../helpers'
import s from './ProductView.module.css'
import * as gtag from '../../../lib/gtag'
import Link from 'next/link'

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
  let [imageURL, setImageURL] = useState('')
  let [imageAlt, setImageAlt] = useState('')
  const [choices, setChoices] = useState<SelectedOptions>({
    size: 0,
    color: 0,
    'cutter/embosser': 0,
  })
  const variant =
    getCurrentVariant(product, choices) || product.variants.edges?.[0]

  const createProductName = () => {
    if (product.name.length > 98) {
      return product.name.substring(0, 98) + '...'
    } else {
      return product.name
    }
  }

  const addToCart = async () => {
    setLoading(true)

    try {
      await addItem({
        productId: product.entityId,
        variantId:
          product.variants.edges?.[
            choices.size ||
              choices.color ||
              (choices['cutter/embosser'] && choices.size)
          ]?.node.entityId!,
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
    gtag.event({
      action: 'add_to_cart',
      category: 'products',
      label: 'Product added to cart',
      value: 'Product added to cart',
    })
  }

  return (
    <Container className={s.container} clean>
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
              alt: product.name,
            },
          ],
        }}
      />
      {imageURL && (
        <Modal
          imageSrc={imageURL}
          setImageURL={setImageURL}
          imageTag={imageAlt}
          setImageAlt={setImageAlt}
        />
      )}
      <div className={cn(s.root)}>
        <div className={cn(s.productDisplay)}>
          <div className={s.sliderContainer}>
            <div className={s.breadContainerTop}>
              <Link href="/search">{'Products '}</Link>
              <p>{' /'}</p>
              <div className={s.activeLink}>
                <Link href={'/product' + product.path}>
                  {' ' + product.name}
                </Link>
              </div>
            </div>
            <div className={s.selectedImageContainer}>
              {product.images.edges?.slice(0, 1).map((image) => (
                <div className={s.selectedImageContainer}>
                  <Image
                    alt={image?.node.altText!}
                    width={550}
                    height={550}
                    quality={50}
                    onClick={() => {
                      setImageAlt(image?.node.altText!)
                      setImageURL(image?.node.urlOriginal!)
                    }}
                    src={image?.node.urlOriginal!}
                  />
                </div>
              ))}
            </div>
            <div className={s.thumbImageContainer}>
              {product.images.edges?.slice(1, 50).map((image, i) => (
                <div className={s.thumbImage} key={image?.node.urlOriginal}>
                  <Image
                    alt={image?.node.altText!}
                    onClick={() => setImageURL(image?.node.urlOriginal!)}
                    src={image?.node.urlOriginal!}
                    quality={50}
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={s.sidebar}>
          <section>
            <div className={s.breadContainer}>
              <Link href="/search">{'Products' + ' ' + '/'}</Link>
              <div className={s.activeLink}>
                <Link href={'/product' + product.path}>
                  {createProductName()}
                </Link>
              </div>
            </div>
            <div>
              <h1 className="text-2xl text-center">{product.name}</h1>
              <div className="text-4xl font-semibold text-center">
                {price}
                {` `}
                {product.prices?.price.currencyCode}
              </div>
            </div>

            {options?.map((opt: any) => (
              <div className="pb-4" key={opt.displayName}>
                <h2 className="capitalize text-center font-light">
                  Choose a {opt.displayName}:
                </h2>
                <div className="flex flex-wrap justify-center text-center py-2">
                  {opt.values.map((v: any, i: number) => {
                    const active = (choices as any)[opt.displayName]
                    return (
                      <Swatch
                        key={`${v.entityId}-${i}`}
                        active={i === active}
                        variant={opt.displayName}
                        color={v.hexColors ? v.hexColors[0] : ''}
                        label={v.label}
                        onClick={() => {
                          setChoices((choices) => {
                            return {
                              ...choices,
                              [opt.displayName]: i,
                            }
                          })
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="pb-14 break-words sm:block md:hidden lg:hidden w-full">
              <Text
                html={
                  readMore
                    ? product.description
                    : `${product.description.substring(0, 425)}...`
                }
                style={{}}
              />
              <button onClick={() => setReadMore(!readMore)}>
                {readMore ? 'Show Less...' : 'Read More...'}
              </button>
            </div>
            <div className="pb-14 break-words hidden sm:hidden md:block lg:block w-full">
              <Text html={product.description} />
            </div>
          </section>
          <div className={s.btnContainer}>
            <Button
              aria-label="Add to Cart"
              type="button"
              className={s.btn}
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
