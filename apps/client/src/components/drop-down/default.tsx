import { useRef, useState, type ReactNode } from 'react'

import * as S from './styles'

import { useClickOutside } from 'hooks'

interface DropDownProps {
  children: ReactNode
  itemsList?: ReactNode[]
  isArrowHidden?: boolean
}

export function DefaultDropDown({ children, itemsList, isArrowHidden = false }: DropDownProps) {
  const [isMenuActive, setIsMenuActive] = useState(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const handleToggleMenu = () => {
    setIsMenuActive((prev) => !prev)
  }

  const handleClickOutside = () => {
    setIsMenuActive(false)
  }

  useClickOutside(wrapperRef, handleClickOutside)

  return (
    <S.Wrapper ref={wrapperRef} className={'drop-down__wrapper'}>
      <S.DropDownAction $isActive={isMenuActive} onClick={handleToggleMenu}>
        {children}
        {!isArrowHidden && <image className={'medium-arrow-svg__icon'} />}
      </S.DropDownAction>
      {isMenuActive ? (
        <S.ItemsListInner className={'drop-down__items'}>{itemsList}</S.ItemsListInner>
      ) : null}
    </S.Wrapper>
  )
}
