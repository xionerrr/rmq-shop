import { ButtonHTMLAttributes } from 'react'

import * as S from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function DefaultButton({ children, ...rest }: ButtonProps) {
  return <S.DefaultAction {...rest}>{children}</S.DefaultAction>
}
