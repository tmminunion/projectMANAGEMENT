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
import { postData } from 'src/@api/axios'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { PrismaClient } from '@prisma/client'
import { useState, useEffect } from 'react'

const TimelinePage = ({ tasks, Jobs }) => {
  let lastEndTime = moment()
  let lastEndTime2 = moment()

  const today = moment().startOf('day')

  const items = Jobs.map((task, i) => {
    const multiplier = task.priority === 0 ? 1 : task.priority === 1 ? 2 : 3
    let startTime
    let endTime
    let canMove = true
    let canResize = true

    if (task.onprogress === 1) {
      canMove = false
      canResize = false
    }

    if (task.onprogress === 1 || task.statustask === 1) {
      // data onprogress tidak 0 dimulai dari tanggal awal dan ke belakang
      endTime = moment(task.endDate)
      startTime = moment(task.startDate)
      lastEndTime2 = moment(endTime)
    } else {
      startTime = moment().add(Math.max(0, lastEndTime.diff(moment(), 'days')), 'days')
      endTime = moment(startTime).add(1 + multiplier, 'days')
      lastEndTime = moment(endTime)
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
      canMove: canMove,
      canResize: canResize,

      itemProps: {
        onDoubleClick: () => {
          console.log('You clicked double!')
        },
        style: { background: backgroundColor, color: 'black' } // tambahkan style
      }
    }
  })

  const [itemlist, setitemlist] = useState(items)
  const [lasttime, setlastime] = useState(lastEndTime)

  const groups = tasks.map(task => ({
    id: task.id,
    title: task.name,
    stackItems: true
  }))

  const itemHeight = 30 // set tinggi item
  const height = groups.length * itemHeight + 100 // hitung tinggi halaman

  const handleItemMove = async (itemId, dragTime, newGroupOrder) => {
    // mencari item yang sesuai dengan itemId
    const itemIndex = itemlist.findIndex(item => item.id === itemId)
    const item = itemlist[itemIndex]

    // menghitung waktu mulai dan selesai yang baru
    const newStartTime = moment(dragTime)
    const newEndTime = moment(dragTime) + (item.end_time - item.start_time)

    // mengupdate waktu mulai dan selesai pada item
    item.start_time = newStartTime
    item.end_time = newEndTime

    // mengupdate itemlist dengan item yang telah diupdate
    const updatedItemList = [...itemlist]
    updatedItemList[itemIndex] = item
    setitemlist(updatedItemList)

    const date = new Date(newStartTime)
    const stardata = new Date(newEndTime)

    const data = { id: itemId, startDate: date.toISOString(), endDate: stardata.toISOString() }

    const response = await postData(data)
  }

  const handleItemResize = async (itemId, time, edge) => {
    console.log(itemId)

    const updatedItems = itemlist.map(item => {
      if (item.id === itemId) {
        if (edge === 'left') {
          return {
            ...item,
            start_time: time
          }
        } else if (edge === 'right') {
          return {
            ...item,
            end_time: time
          }
        }
      }

      return item
    })
    setitemlist(updatedItems)
    const updatedItem = itemlist.find(item => item.id === itemId)
    const date = new Date(time)
    const stardata = new Date(updatedItem.start_time)

    const data = { id: itemId, startDate: stardata.toISOString(), endDate: date.toISOString() }

    const response = await postData(data)
  }

  const getLatestEndTime = itemlist => {
    const sortedItems = [...itemlist].sort((a, b) => {
      if (moment(a.end_time).isAfter(moment(b.end_time))) return -1
      if (moment(b.end_time).isAfter(moment(a.end_time))) return 1

      return 0
    })

    return sortedItems[0].end_time
  }

  useEffect(() => {
    const latestEndTime = getLatestEndTime(itemlist)
    setlastime(latestEndTime)
  }, [itemlist])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ m: 5 }}>
          <Typography variant='h5'>TIMELINE PROJECT</Typography>
          <Typography variant='body2'>Planing Waktu Kerja Project </Typography>
        </Grid>
        <Grid item xs={12}>
          <Timeline
            groups={groups}
            items={itemlist}
            defaultTimeStart={moment().add(0, 'day')}
            defaultTimeEnd={moment().add(30, 'day')}
            headerLabelFormats={{ year: 'YYYY', month: 'MMMM' }}
            headerBackgroundColor='blue'
            style={{ height, width: '100%' }} // set tinggi halaman
            itemHeight={itemHeight} // set tinggi item
            fixedHeader='fixed'
            sidebarWidth={250}
            onItemMove={handleItemMove}
            onItemResize={handleItemResize}
          >
            <TimelineMarkers>
              <TodayMarker>
                {({ styles, date }) => {
                  const customStyles = {
                    ...styles,
                    backgroundColor: 'blue',
                    width: '10px'
                  }

                  return <div style={customStyles} onClick={undefined} />
                }}
              </TodayMarker>

              <CustomMarker date={lasttime}>
                {({ styles, date }) => {
                  const customStyles = {
                    ...styles,
                    backgroundColor: 'red',
                    width: '10px'
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
      </Grid>
    </>
  )
}

export default TimelinePage

export async function getServerSideProps() {
  const prisma = new PrismaClient()
  const tasks = await prisma.Task.findMany()
  const Jobs = await prisma.Job.findMany()

  return {
    props: {
      tasks: JSON.parse(JSON.stringify(tasks)),
      Jobs: JSON.parse(JSON.stringify(Jobs))
    }
  }
}
