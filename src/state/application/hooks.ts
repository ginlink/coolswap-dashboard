import { useCallback, useMemo } from 'react'
import { useActiveWeb3React } from '../../hooks/web3'
import { useAppDispatch, useAppSelector } from '../hooks'
import { AppState } from '../index'
import { updatePopTip } from './actions'
import { PopTip } from './reducer'

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React()

  return useAppSelector((state: AppState) => state.application.blockNumber[chainId ?? -1])
}

export function usePopTip(): [PopTip, (newPopTip: PopTip) => void] {
  const popTip = useAppSelector((state: AppState) => state.application.popTip)
  const dispatch = useAppDispatch()

  const updatePopTip111 = useCallback(
    (newPopTip: PopTip) => {
      dispatch(updatePopTip(newPopTip))
    },
    [dispatch]
  )

  return useMemo(() => [popTip, updatePopTip111], [popTip, updatePopTip111])
}
export function usePopTipSuccess(): (message: string, delay?: number) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (message: string, delay = 3000) => {
      const newPopTip: PopTip = {
        open: true,
        message,
        autoHideDuration: delay,
        severity: 'success',
      }

      dispatch(updatePopTip(newPopTip))
    },
    [dispatch]
  )
}
export function usePopTipError(): (message: string, delay?: number) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (message: string, delay = 3000) => {
      const newPopTip: PopTip = {
        open: true,
        message,
        autoHideDuration: delay,
        severity: 'error',
      }

      dispatch(updatePopTip(newPopTip))
    },
    [dispatch]
  )
}
