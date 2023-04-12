// ** React Imports
import { useState, Fragment, forwardRef } from 'react'
import { useRouter } from 'next/router'
import LinearProgress from '@mui/material/LinearProgress'
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
import moment from 'moment'
import PriorityChip from 'src/@priority/Priority'
import ProgressChip from 'src/@priority/Progress'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import IconCeklis from 'src/@icon/IconCeklis'
import IconHapus from 'src/@icon/IconHapus'

const Row = props => {
  // ** Props
  const { row, dodol, job } = props
  const router = useRouter()
  const { id } = router.query

  const [open, setOpen] = useState(false)
  const [detailJOb, setdetailJOb] = useState(job)

  const editdata = async ({ name, value, previousValue }) => {
    console.log(value)
  }

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
    } else {
      console.log('eroro')
    }
  }

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} bgcolor='#F9F9F9'>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell>{dodol + 1}</TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='center'>{row.Job.length}</TableCell>
        <TableCell align='center'>
          <PriorityChip val={row.priority} />
        </TableCell>
        <TableCell width='40px' align='center'>
          <EditText value={moment(row.endDate).format('DD/mm/yyyy')} name={11} onSave={editdata} />
        </TableCell>

        <TableCell align='center'>
          {' '}
          <LinearProgress
            color='primary'
            value={Math.floor(Math.random() * 100)}
            variant='determinate'
            style={{ height: 17 }}
          />
        </TableCell>
        <TableCell align='center'>
          <ProgressChip val={row.progress} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={1} sx={{ py: '0 !important' }}></TableCell>
        <TableCell colSpan={8} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Table size='small' aria-label='purchases'>
                <TableBody>
                  {detailJOb.map((historyRow, i) => (
                    <TableRow key={i + 1}>
                      <TableCell width={'30px'}>{i + 1}</TableCell>
                      <TableCell width={'30px'}>
                        <IconCeklis w='20px' fillColor='silver' />
                      </TableCell>
                      <TableCell align='left'>{historyRow.name}</TableCell>
                      <TableCell align='center' width='30px'>
                        <PriorityChip val={historyRow.priority} />
                      </TableCell>
                      <TableCell align='center'> {moment(historyRow.updatedAt).format('DD/MM/YY hh:mm')}</TableCell>
                      <TableCell align='center' width='30px'>
                        <ProgressChip val={historyRow.progress} />
                      </TableCell>
                      <TableCell width={'30px'}>
                        <IconHapus w='20px' fillColor='silver' />
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell sx={{ width: 30 }}>
                      <svg
                        width='20px'
                        height='20px'
                        viewBox='0 0 1024 1024'
                        version='1.1'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z' fill='#337bff' />
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
            <TableCell width={'30px'} align='center'>
              item
            </TableCell>
            <TableCell width='40px' align='center'>
              Prioritas
            </TableCell>
            <TableCell width='40px' align='center'>
              Target
            </TableCell>
            <TableCell align='center'>Progress</TableCell>
            <TableCell align='center' width='50px'>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nilainya.map((row, i) => (
            <Row key={i} row={row} job={row.Job} dodol={i} />
          ))}

          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} bgcolor='F9F9F9'>
            <TableCell component='th' scope='row'>
              <svg width='20px' height='20px' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                <path d='M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z' fill='#337bff' />
                <path d='M448 298.666667h128v426.666666h-128z' fill='#FFFFFF' />
                <path d='M298.666667 448h426.666666v128H298.666667z' fill='#FFFFFF' />
              </svg>
            </TableCell>
            <TableCell colSpan={5}>
              <EditText placeholder='Tambah Pekerjaan' name={11} onSave={record} />
            </TableCell>

            <TableCell align='center'></TableCell>
            <TableCell align='center'></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableCollapsible
