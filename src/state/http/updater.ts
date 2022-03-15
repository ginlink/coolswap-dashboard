import { useCallback, useMemo, useState } from 'react'

import { HTTP_POLL_DELAY, HTTP_QUEUEQUERY_DELAY } from '@/constants/misc'
import useInterval from '@/hooks/useInterval'
import { useQueryFaucetList, useQueryTokenList } from './hooks'

export default function Updater(): null {
  const [, setTimes] = useState<number>(0)

  const query1 = useQueryFaucetList()
  const query2 = useQueryTokenList()

  const queryQueue = useMemo((): any[] => {
    const queue = [] as any
    queue.push(query1)
    queue.push(query2)

    return queue
  }, [query1, query2])

  const queryDataHandler = useCallback(() => {
    setTimes((prev: number) => {
      return ++prev
    })

    // Queue element request interval, default 500ms
    const len = queryQueue.length
    for (let i = 0; i < len; ++i) {
      if (!queryQueue || typeof queryQueue[i] != 'function') continue

      setTimeout(() => {
        queryQueue[i]()
      }, HTTP_QUEUEQUERY_DELAY * (i + 1))
    }
  }, [queryQueue])

  useInterval(queryDataHandler, HTTP_POLL_DELAY, true)

  return null
}
