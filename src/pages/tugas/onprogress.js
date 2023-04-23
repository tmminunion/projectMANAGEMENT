import TodoCard from 'src/assy/TodoCard'
import Grid from '@mui/material/Grid'
import { PrismaClient } from '@prisma/client'
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

function JobsPage({ incompleteJobs }) {
  return (
    <>
      <Grid item xs={12} sx={{ m: 5 }}>
        <Typography variant='h5'>TUGAS ONPROGRESS </Typography>
        <Typography variant='body2'>Daftar Tugas yang harus di kerjakan</Typography>
      </Grid>
      <List>
        <TodoCard todos={incompleteJobs} fillColor={'silver'} />
      </List>
    </>
  )
}

export async function getServerSideProps() {
  const prisma = new PrismaClient()

  const incompleteJobs = await prisma.job.findMany({
    where: {
      onprogress: 0
    },
    orderBy: {
      endDate: 'desc'
    },
    take: 20
  })

  return {
    props: {
      incompleteJobs: JSON.parse(JSON.stringify(incompleteJobs))
    }
  }
}

export default JobsPage
