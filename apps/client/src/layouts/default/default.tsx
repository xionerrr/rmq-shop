import { DefaultLayoutProps } from './models'
import * as S from './styles'

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return <S.Wrapper>{children}</S.Wrapper>
}
