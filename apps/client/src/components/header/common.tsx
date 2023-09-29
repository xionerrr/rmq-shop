import * as S from './styles'

export function CommonHeader() {
  return (
    <S.CommonWrapper>
      <nav>
        <button>Home</button>
        <button>Orders</button>
        <button>Products</button>
      </nav>
      <div>
        <button>Log in</button>
      </div>
    </S.CommonWrapper>
  )
}
