import React, { FC } from 'react'
import { Container } from '@components/ui'
import s from './Announcement.module.css'

interface Props {
  className?: string
  description: string
  bg: string
  text: string
}

const Announcement: FC<Props> = ({ description, bg, text }) => {
  return (
    <div style={{ backgroundColor: bg }}>
      <Container>
        <div className={s.root}>
          <div className=" text-center ">
            <p style={{ color: text }} className={` leading-7 text-accent-2 `}>
              {description}
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Announcement
