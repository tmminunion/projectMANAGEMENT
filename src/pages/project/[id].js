import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardMembership from 'src/views/cards/CardProjek'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

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
      Task: {
        include: {
          Job: true
        }
      }
    }
  })
  console.log(projects)

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects))
    }
  }
}

const CardBasic = ({ projects }) => {
  const [value, setValue] = useState('account')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Grid container spacing={6} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', mb: 5 }}>
        <Grid item xs={12} md={12}>
          <CardMembership indek={projects.id} nama={projects.name} />
        </Grid>

        <Grid item xs={12} md={12} spacing={6} sx={{ mb: 5 }}>
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              aria-label='account-settings tabs'
              sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            >
              <Tab
                value='account'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountOutline />
                    <TabName>Account</TabName>
                  </Box>
                }
              />
              <Tab
                value='security'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LockOpenOutline />
                    <TabName>Security</TabName>
                  </Box>
                }
              />
              <Tab
                value='info'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InformationOutline />
                    <TabName>Info</TabName>
                  </Box>
                }
              />
            </TabList>

            <TabPanel sx={{ p: 0 }} value='account'>
              <TabAccount data={projects} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='security'>
              <TabSecurity />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='info'>
              <TabInfo />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </>
  )
}

export default CardBasic
