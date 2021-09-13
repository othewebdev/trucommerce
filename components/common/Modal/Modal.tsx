import s from './Modal.module.css'
import { FC, useMemo, Dispatch, SetStateAction } from 'react'

type Dispatcher<S> = Dispatch<SetStateAction<S>>

interface Props {
  imageSrc?: string
  imageTag?: string
  setImageURL?: Dispatch<SetStateAction<string>>
  setImageAlt?: Dispatch<SetStateAction<string>>
}

const Modal: FC<Props> = ({ imageSrc, imageTag, setImageURL, setImageAlt }) => {
  return useMemo(
    () => (
      <div
        className={s.modalBox}
        onClick={() => {
          setImageURL!('')
          setImageAlt!('')
        }}
      >
        <div className={s.modalImageContainer}>
          <img src={imageSrc} alt={imageTag} />
        </div>
      </div>
    ),
    []
  )
}

export default Modal
