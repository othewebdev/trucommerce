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
    <div className={bg}>
      <Container>
        <div className={s.root}>
          <div className=" text-center ">
            <p className={` leading-7 text-accent-2 ${text}`}>{description}</p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Announcement
