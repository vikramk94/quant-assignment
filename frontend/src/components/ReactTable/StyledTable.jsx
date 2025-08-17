import React, { useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'

import Pagination from './Pagination'
import { StyledTableRoot, StyledTd, StyledTh, TrBodyRow } from './styles'

const StyledTable = (props) => {
  const columns = React.useMemo(() => props.columns, [props.columns])
  const data = React.useMemo(() => props.data, [props.data])

  const table = useReactTable({
    columns,
    data,
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  useEffect(() => {
    if (props.pagination) {
      table.setPageSize(props.pageCount)
    } else {
      table.setPageSize(data.length)
    }
  }, [data.length, props.pageCount, props.pagination, table])

  return (
    <>
      <StyledTableRoot>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <StyledTh key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </StyledTh>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TrBodyRow
              key={row.id}
              onClick={() =>
                props.rowClickHandler
                  ? props.rowClickHandler(row.original)
                  : console.log('DEFAULT')
              }
            >
              {row.getVisibleCells().map((cell) => (
                <StyledTd key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </StyledTd>
              ))}
            </TrBodyRow>
          ))}
        </tbody>
      </StyledTableRoot>

      {props.pagination && (
        <Pagination
          pageIndex={table.getState().pagination.pageIndex}
          pageOptions={table.getPageCount()}
          previousPage={table.previousPage}
          canPreviousPage={table.getCanPreviousPage()}
          nextPage={table.nextPage}
          canNextPage={table.getCanNextPage()}
        />
      )}
    </>
  )
}

export default StyledTable
