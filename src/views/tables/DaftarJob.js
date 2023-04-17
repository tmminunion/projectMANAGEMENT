// ** React Imports
import { useState, Fragment, useEffect } from 'react'
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
import IconPlus from 'src/@icon/IconPlus'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import moment from 'moment'
import PriorityChip, { priorityOptions } from 'src/@priority/Priority'
import ProgressChip from 'src/@priority/Progress'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import IconCeklis from 'src/@icon/IconCeklis'
import IconHapus from 'src/@icon/IconHapus'

const Row = props => {
  // ** Props
  const { row, dodol, job, setupdate, setValuex } = props
  const router = useRouter()
  const { id } = router.query
  const [Tagex, settagex] = useState(0)
  const [open, setOpen] = useState(false)
  const [detailJOb, setdetailJOb] = useState(job)

  const totalPriority = job.reduce((acc, curr) => acc + curr.priority + 1, 0)
  let dataprio = 0
  if (Array.isArray(job) && job.length > 0) {
    dataprio = Math.ceil(totalPriority / job.length) - 1
  } else {
    dataprio = 0
  }
  let onProgressCount = 0

  job.forEach(job => {
    if (job.onprogress === 1) {
      onProgressCount++
    }
  })
  const [progressValue, setProgressValue] = useState((onProgressCount / job.Length) * 100)

  let progressBarColor = 'error'
  if (progressValue < 33) {
    progressBarColor = 'error'
  } else if (progressValue >= 33 && progressValue < 67) {
    progressBarColor = 'secondary'
  } else {
    progressBarColor = 'primary'
  }

  let waerebgcolor = '#F9F9F9'
  if (progressValue == 100) {
    waerebgcolor = 'grey'
  }

  const handleChangex = event => {
    settagex(event.target.value)
  }

  const editdata = async ({ name, value, previousValue }) => {
    console.log(value)
  }

  const record = async ({ name, value, previousValue }) => {
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
        priority: Tagex,
        projectId: parseInt(id)
      })
    })

    const data = await res.json()
    if (res.status === 201) {
      setupdate(true)
      setValuex(0)
      setdetailJOb([
        ...detailJOb, // that contains all the old items
        data
      ])
    } else {
      console.log('eroro')
    }
  }

  const completeTask = async (idx, prio) => {
    const updatedRows = detailJOb.map(historyRow => {
      if (historyRow.id === idx) {
        historyRow.onprogress = 1
        historyRow.progress = 4
      }

      return historyRow
    })
    setdetailJOb(updatedRows)

    const date = new Date()
    date.setDate(date.getDate() - (prio + 1))
    const startDate = date.toISOString()
    const nowdate = new Date()
    const endDate = nowdate.toISOString()

    const res = await fetch('/api/db/job/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: idx,
        progress: 4,
        onprogress: 1,
        endDate,
        startDate,
        projectId: parseInt(id)
      })
    })

    const data = await res.json()
  }

  return (
    <Fragment>
      <TableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        bgcolor={onProgressCount / row.Job.length == 1 ? ' #e3ffca' : '#F9F9F9'}
      >
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell>{dodol + 1}</TableCell>
        <TableCell component='th' scope='row'>
          {onProgressCount / row.Job.length === 1 ? (
            <span style={{ textDecoration: 'line-through' }}> {row.name}</span>
          ) : (
            <span> {row.name}</span>
          )}
        </TableCell>
        <TableCell align='center'>{row.Job.length}</TableCell>
        <TableCell align='center'>
          <PriorityChip val={dataprio} />
        </TableCell>
        <TableCell width='40px' align='center'>
          <EditText value={moment(row.endDate).format('DD/MM/yyyy')} name={11} onSave={editdata} />
        </TableCell>

        <TableCell align='center'>
          <LinearProgress
            color={progressBarColor}
            value={row.Job.length ? (onProgressCount / row.Job.length) * 100 : 0}
            variant='determinate'
            style={{ height: 17 }}
          />
        </TableCell>
        <TableCell align='center' width={'10px'}>
          {row.Job.length ? ((onProgressCount / row.Job.length) * 100).toFixed(0) : '0'}%
        </TableCell>
        <TableCell align='center'>
          {onProgressCount / row.Job.length == 1 ? <ProgressChip val={4} /> : <ProgressChip val={row.progress} />}
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
                      <TableCell
                        width={'30px'}
                        onClick={() => completeTask(historyRow.id, historyRow.priority)}
                        id={'Cell_' + historyRow.id}
                      >
                        {historyRow.onprogress === 1 ? (
                          <IconCeklis w='20px' fillColor='green' />
                        ) : (
                          <IconCeklis w='20px' fillColor='silver' />
                        )}
                      </TableCell>
                      <TableCell align='left'>
                        {historyRow.onprogress === 1 ? (
                          <span style={{ textDecoration: 'line-through' }}>{historyRow.name}</span>
                        ) : (
                          <span>{historyRow.name}</span>
                        )}
                      </TableCell>
                      <TableCell align='center' width='30px'>
                        <PriorityChip val={historyRow.priority} />
                      </TableCell>
                      <TableCell align='center'> {moment(historyRow.updatedAt).format('DD/MM/YY HH:mm')}</TableCell>
                      <TableCell align='center' width='30px'>
                        <ProgressChip val={historyRow.progress} />
                      </TableCell>
                      <TableCell width={'30px'}>
                        <IconHapus w='20px' fillColor='silver' />
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell sx={{ width: 30 }}>{/* <IconPlus w={'20px'} /> */}</TableCell>
                    <TableCell colSpan={2} align='left'>
                      <EditText placeholder='Tambah Tugas' name={row.id} onSave={record} />
                    </TableCell>
                    <TableCell>
                      <FormControl>
                        <Select
                          value={Tagex}
                          onChange={handleChangex}
                          renderValue={value => <PriorityChip val={value} />}
                        >
                          {priorityOptions.map((name, i) => (
                            <MenuItem value={i} key={i}>
                              {name.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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

const DaftarJob = ({ data, setTask, update, setupdate, valuex, setValuex }) => {
  const router = useRouter()
  const [Tage, settage] = useState(0)
  const { id } = router.query

  if (update && valuex > 0) {
    router.reload()
  }

  const handleChange = event => {
    settage(event.target.value)
  }

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
        priority: Tage,
        onprogress: 0,
        endDate: formattedDate
      })
    })

    const datanew = await res.json()
    if (res.status === 201) {
      setTask([
        ...data, // that contains all the old items
        datanew
      ])
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
            <TableCell align='center' width={'10px'}></TableCell>
            <TableCell align='center' width='50px'>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <Row key={i} row={row} job={row.Job} dodol={i} setupdate={setupdate} setValuex={setValuex} />
          ))}

          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} bgcolor='F9F9F9'>
            <TableCell align='right'>
              <IconPlus w={'20px'} />
            </TableCell>
            <TableCell colSpan={3}>
              <EditText placeholder='Tambah Pekerjaan' name={11} onSave={record} />
            </TableCell>{' '}
            <TableCell align='center'>
              {/* <FormControl>
                <Select value={Tage} onChange={handleChange} renderValue={value => <PriorityChip val={value} />}>
                  {priorityOptions.map((name, i) => (
                    <MenuItem value={i} key={i}>
                      {name.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
            </TableCell>
            <TableCell align='center'></TableCell>
            <TableCell align='center' colSpan={3}></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DaftarJob
