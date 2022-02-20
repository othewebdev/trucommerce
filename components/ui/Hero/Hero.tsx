import React, { FC } from 'react'
import { Container, Button } from '@components/ui'
import Butterfly from '../Butterfly'
import Link from 'next/link'
import s from './Hero.module.css'
import * as gtag from '../../../lib/gtag'

interface Props {
  className?: string
  headline: string
  description: string
  subtitle?: string
}

const Hero: FC<Props> = ({ headline, subtitle, description }) => {
  const logGtag = () => {
    gtag.event({
      action: 'clicked_header_button',
      category: 'shopping',
      label: 'User is shopping',
      value: 'User is shopping',
    })
  }
  return (
    <div>
      <div className={s.heroSplit}>
        <div className={s.section}>
          <h2
            style={{ textTransform: 'uppercase', lineHeight: '3.5rem' }}
            className={`text-5xl text-center font-bold   `}
          >
            {description}
          </h2>
          <Link href="/search">
            <Button onClick={logGtag} className={s.btn}>
              Shop Now
            </Button>
          </Link>
        </div>
        <div className={s.section}>
          <h2
            style={{
              textTransform: 'uppercase',
              lineHeight: '3.5rem',
            }}
            className={`text-5xl text-center font-bold`}
          >
            {headline}
          </h2>
          <p className={`text-center font-semibold`}>{subtitle}</p>
        </div>
      </div>

      {/* <div className="gridContainer">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Butterfly />
          </div>
          <div style={{ textAlign: 'left' }} className={s.root}>
           
            <div className="flex flex-col justify-between">
              <h2
                style={{ textTransform: 'capitalize', lineHeight: '2rem' }}
                className={`text-lg font-medium text-center ${text}`}
              >
                {description}
              </h2>
            </div>
            <Link href="/search">
              <Button onClick={logGtag} className={s.btn}>
                Shop Now
              </Button>
            </Link>
          </div>
        </div> */}
    </div>
  )
}

export default Hero
