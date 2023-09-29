import { styled } from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
`

type DropDownActionProps = {
  $isActive: boolean
}

export const DropDownAction = styled.button<DropDownActionProps>`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  max-width: 280px;
  height: 40px;
  padding-left: 12px;
  padding-right: 15px;

  border-radius: 4px;
  border: 1.5px solid #e2e8f0;
  background: #fff;

  .medium-arrow-svg__icon {
    transform: ${({ $isActive }) => ($isActive ? 'rotate(0deg)' : 'rotate(180deg)')};
  }
`

export const Title = styled.div`
  color: #64748b;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`

export const ItemsListInner = styled.div`
  position: absolute;

  overflow: auto;
  top: 90%;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 90%;
  max-height: 200px;
  padding: 2px 0;

  z-index: 2;

  border: 1px solid #e2e8f0;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0px 8px 13px -3px rgba(0, 0, 0, 0.07);
`

export type ItemProps = {
  $isSelected?: boolean
}

export const Item = styled.button<ItemProps>`
  cursor: pointer;

  width: 100%;
  padding: 7px 12px;

  text-align: start;
  color: #8a99af;
  font-size: 14px;
  font-weight: ${({ $isSelected }) => ($isSelected ? '700' : '400')};
  line-height: 22px;

  border: 0;
  background: transparent;

  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
`
