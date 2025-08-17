import React from 'react'
import { styled } from '@mui/material'

const TableContainer = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: '8px',
  boxShadow: '0 11px 44px 0 rgb(18 18 19 / 10%)'
}))

const StyledTableContainer = (props) => {
  return <TableContainer>{props.children}</TableContainer>
}

export default StyledTableContainer
