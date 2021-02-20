import React, { FC } from 'react'
import { Container } from '@components/ui'
import s from './Hero.module.css'

interface Props {
  className?: string
  headline: string
  headlineTwo: string
  bg: string
  text: string
}

const Hero: FC<Props> = ({ headline, headlineTwo, bg, text }) => {
  return (
    <div className={bg}>
      <Container>
        <div className={s.root}>
          <h2
            className={`text-4xl leading-10 text-center font-medium sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl ${text}`}
          >
            {headline}
          </h2>
          <div className="flex flex-col justify-between">
            <h2
              className={`text-4xl leading-10 text-center font-bold sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl ${text}`}
            >
              {headlineTwo}
            </h2>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
