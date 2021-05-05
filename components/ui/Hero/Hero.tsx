import React, { FC } from 'react'
import { Container } from '@components/ui'
import Butterfly from '../Butterfly'
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
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
              className={`md:text-6xl lg:text-6xl text-4xl text-center font-bold   ${text}`}
            >
              {headline}
            </h2>
            <div className="flex flex-col justify-between">
              <h2
                style={{ textTransform: 'capitalize', lineHeight: '2rem' }}
                className={`text-sm md:text-lg lg:text-lg font-medium text-center ${text}`}
              >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
