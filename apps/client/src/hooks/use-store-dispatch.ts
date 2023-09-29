import { useDispatch } from 'react-redux'

import type { RootDispatch } from 'store'

export function useStoreDispatch() {
  return useDispatch<RootDispatch>()
}
