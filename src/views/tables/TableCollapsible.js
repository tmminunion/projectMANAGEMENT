// ** React Imports
import { useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import { CircularProgressbar } from 'react-circular-progressbar'
import { EditText } from 'react-edit-text'
import 'react-edit-text/dist/index.css'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const Row = props => {
  // ** Props
  const { row, dodol, job } = props
  const router = useRouter()
  const { id } = router.query

  // ** State
  const [open, setOpen] = useState(false)
  const [detailJOb, setdetailJOb] = useState(job)

  const record = async ({ name, value, previousValue }) => {
    console.log('dodol', name, value)
    const datatas = parseInt(name)

    const res = await fetch('/api/db/job/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: value,
        taskId: datatas,
        status: 0,
        statustask: 0,
        progress: 0,
        onprogress: 0,
        projectId: parseInt(id)
      })
    })

    const data = await res.json()
    if (res.status === 201) {
      console.log(`Job with ID ${data.id} has been created`)
      setdetailJOb([
        ...detailJOb, // that contains all the old items
        data
      ])
      setOpen(false)
    } else {
      console.log('eroro')
    }
  }

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell>{dodol + 1}</TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='right'>sdfsdf</TableCell>
        <TableCell align='right'>sdfsdfsd</TableCell>

        <TableCell align='right'>wdaeasd</TableCell>
        <TableCell align='center'></TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={1} sx={{ py: '0 !important' }}></TableCell>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Table size='small' aria-label='purchases'>
                <TableBody>
                  {detailJOb.map((historyRow, i) => (
                    <TableRow key={i + 1}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        {' '}
                        <svg
                          width='20px'
                          height='20px'
                          viewBox='0 0 1024 1024'
                          class='icon'
                          version='1.1'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z' fill='#4CAF50' />
                          <path
                            d='M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z'
                            fill='#CCFF90'
                          />
                        </svg>
                      </TableCell>
                      <TableCell>{historyRow.name}</TableCell>
                      <TableCell>{historyRow.name}</TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell sx={{ width: 30 }}>
                      <svg
                        width='20px'
                        height='20px'
                        viewBox='0 0 1024 1024'
                        class='icon'
                        version='1.1'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z' fill='#cc8400' />
                        <path d='M448 298.666667h128v426.666666h-128z' fill='#FFFFFF' />
                        <path d='M298.666667 448h426.666666v128H298.666667z' fill='#FFFFFF' />
                      </svg>
                    </TableCell>
                    <TableCell colSpan={2} align='left'>
                      <EditText placeholder='Tambah Tugas' name={row.id} onSave={record} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const TableCollapsible = ({ data }) => {
  const [nilainya, setnilainya] = useState(data.Task)
  const router = useRouter()
  const { id } = router.query

  const record = async ({ name, value, previousValue }) => {
    const datatas = parseInt(id)
    const date = new Date()
    const formattedDate = date.toISOString() // menghasilkan string ISO date, contoh: '2023-04-12T11:30:00.000Z'

    const res = await fetch('/api/db/task/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: value,
        projectId: datatas,
        status: 0,
        progress: 0,
        onprogress: 0,
        endDate: formattedDate
      })
    })

    const data = await res.json()
    if (res.status === 201) {
      console.log(data)
      setnilainya([
        ...nilainya, // that contains all the old items
        data
      ])
      const input = document.querySelector(`input[name="${name}"]`)
      if (input) {
        input.value = ''
      }
    } else {
      console.log('eroro')
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow sx={{ bgcolor: 'warning.main' }}>
            <TableCell />
            <TableCell sx={{ width: 30 }}>no</TableCell>
            <TableCell>Nama Pekerjaan</TableCell>
            <TableCell align='right'>item</TableCell>
            <TableCell align='right'>Start</TableCell>
            <TableCell align='right'>end</TableCell>
            <TableCell align='center'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nilainya.map((row, i) => (
            <Row key={i} row={row} job={row.Job} dodol={i} />
          ))}

          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component='th' scope='row'>
              <svg
                width='20px'
                height='20px'
                viewBox='0 0 1024 1024'
                class='icon'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z' fill='#337bff' />
                <path d='M448 298.666667h128v426.666666h-128z' fill='#FFFFFF' />
                <path d='M298.666667 448h426.666666v128H298.666667z' fill='#FFFFFF' />
              </svg>
            </TableCell>
            <TableCell colSpan={4}>
              <EditText placeholder='Tambah Tugas' name={11} onSave={record} />
            </TableCell>

            <TableCell align='center'></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableCollapsible
