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

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const TimelinePage = ({ tasks, Jobs }) => {
  let lastEndTime = moment()

  const items = Jobs.map((task, i) => {
    const startTime = moment().add(Math.max(0, lastEndTime.diff(moment(), 'days') + 1), 'days')
    const multiplier = task.priority === 0 ? 3 : task.priority === 1 ? 2 : 1
    const endTime = moment(startTime).add(2 + multiplier, 'days')
    lastEndTime = moment(endTime)

    let backgroundColor = 'fuchsia'
    if (task.priority === 0) {
      backgroundColor = 'lightblue'
    } else if (task.priority === 1) {
      backgroundColor = 'yellow'
    } else if (task.priority === 2) {
      backgroundColor = 'pink'
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
    <div>
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
                backgroundColor: 'yellow',
                width: '5px'
              }

              return <div style={customStyles} onClick={undefined} />
            }}
          </TodayMarker>
          <CustomMarker date={moment().add(4, 'day')}>
            {({ styles, date }) => {
              const customStyles = {
                ...styles,
                backgroundColor: 'green',
                width: '5px'
              }

              return <div style={customStyles} onClick={undefined} />
            }}
          </CustomMarker>
          <CustomMarker date={lastEndTime}>
            {({ styles, date }) => {
              const customStyles = {
                ...styles,
                backgroundColor: 'deeppink',
                width: '4px'
              }

              return <div style={customStyles} onClick={undefined} />
            }}
          </CustomMarker>
        </TimelineMarkers>
      </Timeline>
    </div>
  )
}

export default TimelinePage

export async function getServerSideProps() {
  const tasks = await prisma.Task.findMany()
  const Jobs = await prisma.Job.findMany()

  return {
    props: {
      tasks: JSON.parse(JSON.stringify(tasks)),
      Jobs: JSON.parse(JSON.stringify(Jobs))
    }
  }
}
