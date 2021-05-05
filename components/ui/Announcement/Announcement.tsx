import React, { FC } from 'react'
import { Container } from '@components/ui'
import s from './Announcement.module.css'

interface Props {
  className?: string
  text: string
  bg: string
  textColor: string
}

const Announcement: FC<Props> = ({ text, bg, textColor }) => {
  return (
    <div style={{ backgroundColor: bg }}>
      <Container>
        <div className={s.root}>
          <div className=" text-center ">
            <p
              style={{ color: textColor, textTransform: 'capitalize' }}
              className={` leading-7 text-accent-2 `}
            >
              {text}
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Announcement
