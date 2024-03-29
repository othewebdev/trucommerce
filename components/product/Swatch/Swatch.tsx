import Button, { ButtonProps } from '@components/ui/Button'
import { isDark } from '@lib/colors'
import cn from 'classnames'
import { FC } from 'react'
import s from './Swatch.module.css'
interface Props {
  active?: boolean
  children?: any
  className?: string
  label?: string
  variant?: 'size' | 'color' | string
  color?: string
}

const Swatch: FC<Props & ButtonProps> = ({
  className,
  color = '',
  label,
  variant = 'size',
  active,
  ...props
}) => {
  variant = variant?.toLowerCase()
  label = label?.toLowerCase()

  const rootClassName = cn(
    s.root,
    {
      [s.active]: active,
      [s.size]: variant === 'size',
      [s.color]: color,
      [s.dark]: color ? isDark(color) : false,
    },
    className
  )

  return (
    <Button
      className={rootClassName}
      style={color ? { backgroundColor: color } : {}}
      aria-label="Variant Swatch"
      {...props}
    >
      {variant === 'product option' ? label : null}
      {variant === 'cutter/embosser' ? label : null}
      {variant === 'size' ? label : null}
      {variant === 'color' && label}
    </Button>
  )
}

export default Swatch
