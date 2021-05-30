import React, { FC } from 'react'
import { Container, Button } from '@components/ui'
import Butterfly from '../Butterfly'
import Link from 'next/link'
import s from './Hero.module.css'

interface Props {
  className?: string
  headline: string
  description: string
  bg: string
  text: string
}

const Hero: FC<Props> = ({ headline, description, bg, text }) => {
  return (
    <div className={bg}>
      <Container>
        <div className="gridContainer">
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
            <h2
              style={{ textTransform: 'capitalize', lineHeight: '3.5rem' }}
              className={`text-6xl text-center font-bold   ${text}`}
            >
              {headline}
            </h2>
            <div className="flex flex-col justify-between">
              <h2
                style={{ textTransform: 'capitalize', lineHeight: '2rem' }}
                className={`text-lg font-medium text-center ${text}`}
              >
                {description}
              </h2>
            </div>
            {/* <Link href="/search">
              <Button className={s.button}>Shop Now</Button>
            </Link> */}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
