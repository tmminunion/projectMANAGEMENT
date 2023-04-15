import Timeline, {
  TimelineMarkers,
  CustomMarker,
  TodayMarker,
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const TimelinePage = ({ tasks, Jobs }) => {
  let lastEndTime = moment()
  let lastEndTime2 = moment()

  const today = moment().startOf('day')

  const items = Jobs.map((task, i) => {
    const multiplier = task.priority === 0 ? 1 : task.priority === 1 ? 2 : 3
    let startTime
    let endTime

    if (task.onprogress === 0) {
      // data onprogress 0 dimulai dari hari ini dan ke depan
      startTime = moment().add(Math.max(0, lastEndTime.diff(moment(), 'days')), 'days')
      endTime = moment(startTime).add(1 + multiplier, 'days')
      lastEndTime = moment(endTime)
    } else {
      // data onprogress tidak 0 dimulai dari tanggal awal dan ke belakang
      endTime = moment(today).subtract(Math.max(0, today.diff(lastEndTime2, 'days')), 'days')
      startTime = moment(endTime).subtract(multiplier, 'days')
      lastEndTime2 = moment(startTime)
    }

    let backgroundColor = 'fuchsia'
    if (task.priority === 0 && task.onprogress === 0) {
      backgroundColor = 'lightblue'
    } else if (task.priority === 0 && task.onprogress === 1) {
      backgroundColor = '#0A2647'
    } else if (task.priority === 1 && task.onprogress === 0) {
      backgroundColor = 'yellow'
    } else if (task.priority === 1 && task.onprogress === 1) {
      backgroundColor = '#94690D'
    } else if (task.priority === 2 && task.onprogress === 0) {
      backgroundColor = 'pink'
    } else if (task.priority === 2 && task.onprogress === 1) {
      backgroundColor = '#69263A'
    }

    return {
      id: task.id,
      group: task.taskId,
      title: task.name,
      start_time: startTime,
      end_time: endTime,
      canMove: true,
      canResize: true,

      itemProps: {
        onDoubleClick: () => {
          console.log('You clicked double!')
        },
        style: { background: backgroundColor, color: 'black' } // tambahkan style
      }
    }
  })

  const groups = tasks.map(task => ({
    id: task.id,
    title: task.name,
    stackItems: false,
    width: 50
  }))

  const itemHeight = 30 // set tinggi item
  const height = groups.length * itemHeight + 100 // hitung tinggi halaman

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ m: 5 }}>
          <Typography variant='h5'>TIMELINE PROJECT</Typography>
          <Typography variant='body2'>Planing Waktu Kerja Project </Typography>
        </Grid>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(0, 'day')}
          defaultTimeEnd={moment().add(30, 'day')}
          headerLabelFormats={{ year: 'YYYY', month: 'MMMM' }}
          style={{ height, width: '100%' }} // set tinggi halaman
          itemHeight={itemHeight} // set tinggi item
          fixedHeader='fixed'
          sidebarWidth={250}
        >
          <TimelineMarkers>
            <TodayMarker>
              {({ styles, date }) => {
                const customStyles = {
                  ...styles,
                  backgroundColor: 'green',
                  width: '7px'
                }

                return <div style={customStyles} onClick={undefined} />
              }}
            </TodayMarker>

            <CustomMarker date={lastEndTime}>
              {({ styles, date }) => {
                const customStyles = {
                  ...styles,
                  backgroundColor: 'deeppink',
                  width: '7px'
                }

                return <div style={customStyles} onClick={undefined} />
              }}
            </CustomMarker>
            <CustomMarker date={lastEndTime2}>
              {({ styles, date }) => {
                const customStyles = {
                  ...styles,
                  backgroundColor: 'Black',
                  width: '7px'
                }

                return <div style={customStyles} onClick={undefined} />
              }}
            </CustomMarker>
          </TimelineMarkers>
          <TimelineHeaders>
            <SidebarHeader>
              {() => {
                const customStylese = {
                  backgroundColor: '#1a237e',
                  width: '250px',
                  color: 'white',
                  align: 'center',
                  padding: '3px'
                }

                return <div style={customStylese}>Pekerjaan</div>
              }}
            </SidebarHeader>
            <DateHeader unit='primaryHeader' style={{ backgroundColor: '#1a237e' }} />
            <DateHeader />
          </TimelineHeaders>
        </Timeline>{' '}
      </Grid>
    </>
  )
}

export default TimelinePage
