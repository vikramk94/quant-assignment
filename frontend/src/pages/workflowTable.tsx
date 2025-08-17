import React, { useEffect, useState } from 'react'
import { Typography, Button } from '@mui/material'
import { styled } from '@mui/system'
import Stack from '@mui/material/Stack'

// icons
import AddIcon from '@mui/icons-material/Add'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CategoryIcon from '@mui/icons-material/Category'
import AccountTreeIcon from '@mui/icons-material/AccountTree'

import { showNotification } from '../utils/toast.utils'
import { getWorkflows } from '../service/workflow.service'

// components
import StyledTable from '../components/ReactTable/StyledTable'
import StyledTableContainer from '../components/StyledTableContainer/StyledTableContainer'
import StyledEmptyHeader from '../components/StyledEmptyHeader/StyledEmptyHeader'
import StyledSelectField from '../components/StyledSelectField/StyledSelectField'

// Layout Wrappers
const Page = styled('div')({
  display: 'flex',
  height: '100vh',
})

// Styled Components
const SidePanel = styled('div')({
  width: '150px',
  backgroundColor: '#0a4b8c',
  color: '#fff',
  display: 'flex',
  borderTopRightRadius: '12px',
  borderBottomRightRadius: '12px',
  flexDirection: 'column',
  padding: '20px 10px',
})

const MenuItem = styled('div')<{ active?: boolean }>(({ active }) => ({
  padding: '12px 16px',
  borderRadius: '8px',
  marginBottom: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: active ? '#2563eb' : 'transparent',
  color: active ? '#fff' : '#cbd5e1',
  transition: 'all 0.2s ease',

  '&:hover': {
    backgroundColor: active ? '#1d4ed8' : '#83ade7ff',
    color: '#fff',
  },
}))

const Container = styled('div')({
  flex: 1,
  padding: '16px',
  backgroundColor: '#ebf2f7ff',
  overflow: 'auto',
})

const Divider = styled('div')({
  borderBottom: '1px solid #ddd',
  margin: '8px 0',
})

const InputBox = styled('input')({
  width: '50%',
  padding: '10px',
  borderRadius: '32px',
  border: '1px solid #d9d9d9',
  fontSize: '14px',
  marginBottom: '4px',
  marginTop: '8px',
})

const CreateButton = styled('button')({
  width: 'fit-content',
  fontSize: '14px',
  padding: '8px 16px',
  borderRadius: '8px',
  backgroundColor: '#0a4b8c',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  marginLeft: 'auto',
})

interface OptionType {
  value: string
  label: string
}

const MENU_ICON_FONT = 'small'

const WorkflowTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [workflows, setWorkflows] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusOptions, setStatusOptions] = useState<OptionType[]>([])
  const [selectedStatus, setSelectedStatus] = useState<OptionType>({
    label: 'All status',
    value: 'all',
  })
  const [totalRows, setTotalRows] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const pageSize = 5

  const totalPages = Math.ceil(totalRows / pageSize)

  interface WorkflowApiResponse {
    total: number
    page: number
    limit: number
    totalPages: number
    data: any[]
  }

  const fetchData = async (page: number = 1) => {
    try {
      setIsLoading(true)
      const response: WorkflowApiResponse = await getWorkflows({
        page,
        limit: pageSize,
      })
      console.log('API Response:', response)

      if (response.data) {
        setWorkflows(response.data)
        setTotalRows(response.total)
        setPageNo(response.page)

        const uniqueStatuses = Array.from(
          new Set(response.data.map((wf: any) => wf.status))
        )
        setStatusOptions([
          { label: 'All status', value: 'all' },
          ...uniqueStatuses.map((s: string) => ({ label: s, value: s })),
        ])
      } else {
        showNotification('Invalid API response format', 'error')
      }
    } catch (err) {
      console.error('Error fetching workflows:', err)
      showNotification('Failed to fetch workflows', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(pageNo)
  }, [pageNo])

  // Filter data by search term + status
  const filteredData = workflows.filter((wf) => {
    const matchesSearch = wf.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus =
      selectedStatus.value === 'all' || wf.status === selectedStatus.value
    return matchesSearch && matchesStatus
  })

  const columns = [
    { id: 'id', header: 'ID', accessorKey: 'id' },
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'status', header: 'Status', accessorKey: 'status' },
    { id: 'owner', header: 'Owner', accessorKey: 'owner' },
    { id: 'startTime', header: 'Start time', accessorKey: 'startTime' },
  ]

  return (
    <Page>
      <SidePanel>
        <h2 style={{ textAlign: 'left', marginTop: '0' }}>Assignment </h2>
        <Divider />
        <MenuItem>
          <AddIcon fontSize={MENU_ICON_FONT} /> New
        </MenuItem>
        <MenuItem>
          <MenuBookIcon fontSize={MENU_ICON_FONT} /> Workspace
        </MenuItem>
        <MenuItem>
          <AccessTimeIcon fontSize={MENU_ICON_FONT} />
          Recent
        </MenuItem>
        <MenuItem>
          <CategoryIcon fontSize={MENU_ICON_FONT} />
          Catalog
        </MenuItem>
        <MenuItem active>
          <AccountTreeIcon fontSize={MENU_ICON_FONT} />
          Workflow
        </MenuItem>
      </SidePanel>

      <Container>
        <div className='flex items-center justify-between'>
          <h2
            className='text-xl font-semibold mt-2'
            style={{ marginTop: '0px' }}
          >
            Workflow List
          </h2>
          <h5 style={{ color: '#888', fontSize: '14px', marginTop: '-10px' }}>
            A Short description will be placed right over here
          </h5>
        </div>
        <Divider />

        <Stack
          sx={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          <InputBox
            placeholder='Search by name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <StyledSelectField
            label=''
            placeHolderText='Select status'
            selectedValue={selectedStatus}
            selectOptions={statusOptions}
            onChangeHandler={(value: OptionType | null) =>
              setSelectedStatus(value || { label: 'All status', value: 'all' })
            }
            isMulti={false}
            isSearchable={true}
            isDisabled={false}
            noOptionsMessage='No options available'
          />

          <CreateButton sx={{ marginLeft: 'auto' }}>
            + Create workflow
          </CreateButton>
        </Stack>

        <StyledTableContainer>
          {isLoading && <StyledEmptyHeader>Loading...</StyledEmptyHeader>}
          {!isLoading && workflows.length === 0 && (
            <StyledEmptyHeader>There are no data to show.</StyledEmptyHeader>
          )}

          {workflows.length > 0 && (
            <StyledTable
              pagination={false}
              columns={columns}
              data={filteredData}
              hiddenColumns={[]}
            />
          )}
        </StyledTableContainer>
        <Stack
          direction='row'
          spacing={2}
          justifyContent='space-between'
          sx={{ marginTop: '16px' }}
        >
          <Typography variant='body1'>
            Page {pageNo} of {totalPages}
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button
              variant='outlined'
              size='small'
              disabled={pageNo === 1}
              onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))}
            >
              Prev
            </Button>
            <Button
              variant='outlined'
              size='small'
              disabled={pageNo === totalPages || totalPages === 0}
              onClick={() => setPageNo((prev) => prev + 1)}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Page>
  )
}

export default WorkflowTable
