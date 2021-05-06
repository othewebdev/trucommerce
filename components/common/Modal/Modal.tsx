import s from './Modal.module.css'
import { FC, useMemo, Dispatch, SetStateAction } from 'react'

type Dispatcher<S> = Dispatch<SetStateAction<S>>

interface Props {
  imageSrc?: string
  setImageURL?: Dispatch<SetStateAction<string>>
}

const Modal: FC<Props> = ({ imageSrc, setImageURL }) => {
  return useMemo(
    () => (
      <div className={s.modalBox} onClick={() => setImageURL!('')}>
        <div className={s.modalImageContainer}>
          <img src={imageSrc} />
        </div>
      </div>
    ),
    []
  )
}

export default Modal
