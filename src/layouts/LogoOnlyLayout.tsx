import { Outlet } from 'react-router-dom'
import styled from 'styled-components/macro'
import React from 'react'

const Wrapper = styled.div``

export default function LogoOnlyLayout() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  )
}
