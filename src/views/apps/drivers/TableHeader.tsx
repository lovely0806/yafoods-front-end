// ** import Next
// import { useRouter } from 'next/router'
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, value } = props

  // const router = useRouter()

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search Drivers'
          onChange={e => handleFilter(e.target.value)}
        />
      </Box>
      <Button sx={{ mb: 2 }} variant='contained' component={Link} href='/drivers/vehicles-drivers/AddDriver'>
        {' '}
        Add Drivers
      </Button>
      {/* <Button sx={{ mb: 2 }} variant='contained' onClick={() => router.replace('/drivers/vehicles-drivers/AddDriver')}>
        Add Drivers
      </Button> */}
    </Box>
  )
}

export default TableHeader
