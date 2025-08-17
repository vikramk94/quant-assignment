import { styled } from '@mui/material'

export const StyledTableRoot = styled('table')(({ theme }) => ({
  width: '100%',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.default,
  borderSpacing: '0 0',
  borderRadius: '16px',
}))

export const StyledTh = styled('th')(({ theme }) => ({
  padding: '16px 0',
  textAlign: 'left',
  paddingLeft: '16px',
  borderInline: '1px solid #dee2e6',
  color: '#5c6c7bff',
}))

export const TrBodyRow = styled('tr')(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}))

export const StyledTd = styled('td')(({ theme }) => ({
  padding: '8px 0',
  textAlign: 'left',
  paddingLeft: '16px',
  fontSize: '14px',
  // borderBottom: '1px solid #dee2e6',
  fontWeight: '400',
  color: 'black',
}))

export const TrChildHeader = styled('tr')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: 'none',
}))
