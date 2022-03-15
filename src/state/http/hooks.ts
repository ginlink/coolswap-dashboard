import { useCallback, useMemo } from 'react'
import { AppState } from '@/state'
import { useAppSelector } from '@/state/hooks'
import { shallowEqualArr } from '@/utils/shallowEqual'
import { useDispatch } from 'react-redux'
import { faucetListApi, FaucetListItem } from '@/services/api'
import { setFaucetList, setTokenList } from './actions'
import { tokenListApi, TokenListItem } from '@/services/token'

export function useQueryFaucetList() {
  const dispatch = useDispatch()

  return useCallback(() => {
    return faucetListApi().then((data: any) => {
      dispatch(setFaucetList({ list: data }))
    })
  }, [dispatch])
}

export function useQueryTokenList() {
  const dispatch = useDispatch()

  return useCallback(() => {
    return tokenListApi().then((data: any) => {
      dispatch(setTokenList({ list: data }))
    })
  }, [dispatch])
}

export function useFaucetList(): [AppState['http']['faucetList'], (list: FaucetListItem[] | undefined) => void] {
  const dispatch = useDispatch()

  const list = useAppSelector((state: AppState) => {
    return state.http.faucetList
  }, shallowEqualArr)

  const updateList = useCallback(
    (list: FaucetListItem[] | undefined) => {
      dispatch(setFaucetList({ list }))
    },
    [dispatch]
  )

  return useMemo(() => [list, updateList], [list, updateList])
}

export function useTokenList(): [AppState['http']['tokenList'], (list: TokenListItem[] | undefined) => void] {
  const dispatch = useDispatch()

  const list = useAppSelector((state: AppState) => {
    return state.http.tokenList
  }, shallowEqualArr)

  const updateList = useCallback(
    (list: TokenListItem[] | undefined) => {
      dispatch(setTokenList({ list }))
    },
    [dispatch]
  )

  return useMemo(() => [list, updateList], [list, updateList])
}
