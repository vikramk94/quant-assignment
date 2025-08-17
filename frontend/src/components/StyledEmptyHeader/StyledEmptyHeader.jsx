import React from 'react'
import { styled } from '@mui/material'

const DivEmptyHeader = styled('div')(({ theme }) => ({
  marginTop: '16px',
  color: theme.palette.primary.main,
  fontSize: '14px'
}))

const StyledEmptyHeader = (props) => {
  const { children } = props

  return (
    <DivEmptyHeader>
      <em>{children}</em>
    </DivEmptyHeader>
  )
}

export default StyledEmptyHeader
