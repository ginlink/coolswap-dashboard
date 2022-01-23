import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components/macro'

import { useEagerConnect, useInactiveListener } from '../../hooks/web3'

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
`

const Message = styled.h2`
  color: ${({ theme }) => theme.secondary1};
`

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
  const { active } = useWeb3React()

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // handle delayed loader state
  // const [showLoader, setShowLoader] = useState(false)
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowLoader(true)
  //   }, 600)

  //   return () => {
  //     clearTimeout(timeout)
  //   }
  // }, [])

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null
  }

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (!active) {
    return (
      <MessageWrapper>
        <Message>
          Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.
        </Message>
      </MessageWrapper>
    )
  }

  return children
}
