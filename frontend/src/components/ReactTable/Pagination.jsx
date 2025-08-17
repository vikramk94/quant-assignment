import React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { styled } from '@mui/material'

const ICON_SIZE = 28

const DivRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  marginTop: '16px'
}))

const DivMainContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  marginLeft: '10px',
  alignItems: 'center'
}))

const DivBtnContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  marginLeft: '15px',
  columnGap: '10px'
}))

const ButtonBtn = styled('button')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'inherit',
  border: 'solid 0.5px #cecece',
  borderRadius: '5px',

  '&:hover': {
    backgroundColor: theme.palette.background.hover
  }
}))

const ChevronLeftIconIcon = styled(ChevronLeftIcon)(({ theme }) => ({
  fontSize: ICON_SIZE
}))

const ChevronRightIconIcon = styled(ChevronRightIcon)(({ theme }) => ({
  fontSize: ICON_SIZE
}))

const Pagination = ({
  pageIndex,
  pageOptions,
  previousPage,
  canPreviousPage,
  nextPage,
  canNextPage
}) => {
  return (
    <DivRoot>
      <DivMainContainer>
        <div>
          <span>
            Page
            <span style={{ marginLeft: '5px' }}>
              {pageIndex + 1} of {pageOptions.length}
            </span>
          </span>
        </div>
        <DivBtnContainer>
          <ButtonBtn onClick={() => previousPage()} disabled={!canPreviousPage}>
            <ChevronLeftIconIcon />
          </ButtonBtn>
          <ButtonBtn onClick={() => nextPage()} disabled={!canNextPage}>
            <ChevronRightIconIcon />
          </ButtonBtn>
        </DivBtnContainer>
      </DivMainContainer>
    </DivRoot>
  )
}

export default Pagination
