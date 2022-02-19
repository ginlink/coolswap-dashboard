import { useSnackbar as useSnackbarOrigin, OptionsObject as SnackbarOptions } from 'notistack'
import { useCallback } from 'react'

export function useSnackbar() {
  const { enqueueSnackbar } = useSnackbarOrigin()

  const alertSuccess = useCallback(
    (message: string, options?: SnackbarOptions) => {
      enqueueSnackbar(message, {
        ...options,
        variant: 'success',
      })
    },
    [enqueueSnackbar]
  )
  const alertError = useCallback(
    (message: string, options?: SnackbarOptions) => {
      enqueueSnackbar(message, {
        ...options,
        variant: 'error',
      })
    },
    [enqueueSnackbar]
  )

  return { alertSuccess, alertError }
}
