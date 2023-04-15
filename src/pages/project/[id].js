import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardMembership from 'src/views/cards/CardMembership'
import DaftarJob from 'src/views/tables/DaftarJob'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import TimelinePage from 'src/views/timeline/TimeLine'

import InformationOutline from 'mdi-material-ui/InformationOutline'
import IconList from 'src/@icon/IconList'
import IconCatatan from 'src/@icon/IconCatatan'
import IconCalender from 'src/@icon/IconCalender'
import IconDiskusi from 'src/@icon/IconDiskusi'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'

import TabCatatan from 'src/views/account-settings/TabCatatan'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { PrismaClient } from '@prisma/client'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

export async function getServerSideProps(context) {
  const prisma = new PrismaClient()
  const { id } = context.query
  const parsedId = parseInt(id)

  const projects = await prisma.project.findUnique({
    where: {
      id: parsedId
    },
    include: {
      Catatan: true,
      Jobs: true,
      Task: {
        include: {
          Job: true
        }
      }
    }
  })

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects))
    }
  }
}

const CardBasic = ({ projects }) => {
  const [value, setValue] = useState('0')
  const [valuex, setValuex] = useState(0)

  const [Task, setTask] = useState(projects.Task)
  const [update, setupdate] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    const nedara = valuex + parseInt(newValue)
    setValuex(nedara)
  }

  let onProgressCount = 0

  projects.Jobs.forEach(job => {
    if (job.onprogress === 1) {
      onProgressCount++
    }
  })

  return (
    <>
      <Grid container spacing={6} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', mb: 5 }}>
        <Grid item xs={12} md={12}>
          <CardMembership
            indek={projects.id}
            nama={projects.name}
            desc={projects.description}
            Jobs={projects.Jobs}
            finish={onProgressCount}
            tgl={projects.endDate}
            Task={projects.Task}
          />
        </Grid>

        <Grid item xs={12} md={12} spacing={6} sx={{ mb: 5 }}>
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              aria-label='account-settings tabs'
              sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            >
              <Tab
                value='0'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconList w='25px' />
                    <TabName>DAFTAR PEKERJAAN</TabName>
                  </Box>
                }
              />
              <Tab
                value='1'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconCatatan w='25px' />
                    <TabName>CATATAN</TabName>
                  </Box>
                }
              />
              <Tab
                value='2'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconCalender w='25' />
                    <TabName>TIMELINE</TabName>
                  </Box>
                }
              />{' '}
              <Tab
                value='3'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconDiskusi w='25' />
                    <TabName>DISKUSI</TabName>
                  </Box>
                }
              />
            </TabList>

            <TabPanel sx={{ p: 5 }} value='0'>
              <DaftarJob
                data={Task}
                setTask={setTask}
                setupdate={setupdate}
                update={update}
                valuex={valuex}
                setValuex={setValuex}
              />
            </TabPanel>
            <TabPanel sx={{ p: 5 }} value='1'>
              <TabCatatan data={projects.Catatan} />
            </TabPanel>
            <TabPanel sx={{ p: 5 }} value='2'>
              <TimelinePage tasks={projects.Task} Jobs={projects.Jobs} />
            </TabPanel>
            <TabPanel sx={{ p: 5 }} value='3'>
              <TabInfo />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </>
  )
}

export default CardBasic
