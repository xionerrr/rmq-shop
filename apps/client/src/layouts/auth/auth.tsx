import { AuthLayoutProps } from './models'
import * as S from './styles'

export function AuthLayout({ children }: AuthLayoutProps) {
  return <S.Wrapper>{children}</S.Wrapper>
}
