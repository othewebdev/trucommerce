import type { ProductNode } from '@framework/api/operations/get-all-products'
import usePrice from '@framework/use-price'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import s from './ProductCard.module.css'
import * as gtag from '../../../lib/gtag'

interface Props {
  className?: string
  product: ProductNode
  variant?: 'slim' | 'simple'
  imgWidth: number | string
  imgHeight: number | string
  imgLayout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  imgPriority?: boolean
  imgLoading?: 'eager' | 'lazy'
  imgSizes?: string
}

const ProductCard: FC<Props> = ({
  className,
  product: p,
  variant,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const src = p.images.edges?.[0]?.node?.urlOriginal!
  const { price } = usePrice({
    amount: p.prices?.price?.value,
    baseAmount: p.prices?.retailPrice?.value,
    currencyCode: p.prices?.price?.currencyCode!,
  })

  const logGtag = () => {
    gtag.event({
      action: 'click_on_product',
      category: 'products',
      label: 'Product clicked',
      value: 'Product clicked',
    })
  }

  return (
    <Link href={`/product${p.path}`}>
      <a
        onClick={logGtag}
        className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}
      >
        {variant === 'slim' ? (
          <div className="relative overflow-hidden box-border">
            <div className="absolute inset-0 flex items-center justify-end mr-8 z-20">
              <span className="bg-black text-white inline-block p-3 font-light text-xl break-words">
                {p.name}
              </span>
            </div>
            <Image
              quality="100"
              width={imgWidth}
              sizes={imgSizes}
              height={imgHeight}
              layout={imgLayout}
              loading={imgLoading}
              priority={imgPriority}
              src={p.images.edges?.[0]?.node.urlOriginal!}
              alt={p.images.edges?.[0]?.node.altText || 'Product Image'}
            />
          </div>
        ) : (
          <>
            <div />
            <div className="flex flex-row justify-between box-border absolute z-20"></div>
            <div onClick={logGtag} className={s.imageContainer}>
              <Image
                quality="100"
                src={src}
                alt={p.name}
                className={s.productImage}
                width={imgWidth}
                sizes={imgSizes}
                height={imgHeight}
                layout={imgLayout}
                loading={imgLoading}
                priority={imgPriority}
              />
            </div>
            <div className={s.productInfoBox}>
              <h3 className={s.productTitle}>
                <span>{p.name}</span>
              </h3>
              <span className={s.productPrice}>{price}</span>
            </div>
          </>
        )}
      </a>
    </Link>
  )
}

export default ProductCard
