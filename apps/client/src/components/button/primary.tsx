import { ButtonHTMLAttributes } from 'react'

import * as S from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function PrimaryButton({ children, ...rest }: ButtonProps) {
  return <S.PrimaryAction {...rest}>{children}</S.PrimaryAction>
}
