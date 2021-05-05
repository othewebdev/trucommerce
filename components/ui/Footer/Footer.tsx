import React, { FC } from 'react'
import { Container } from '@components/ui'
import s from './Footer.module.css'

interface Props {
  className?: string
  headline: string
  description: string
  bg: string
  text: string
}

const Footer: FC<Props> = ({ headline, description, bg, text }) => {
  return (
    <div className="mx-4" style={{ backgroundColor: bg }}>
      <Container>
        <div className={s.root}>
          <h2
            className={`text-4xl leading-10 text-center font-extrabold sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl ${text}`}
          >
            {headline}
          </h2>
          <div className="flex text-center lg:text-left flex-col justify-between">
            <p className={`mt-5 text-xl leading-7 text-accent-2 ${text}`}>
              {description}
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
