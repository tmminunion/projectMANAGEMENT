// ** MUI Imports
import Grid from '@mui/material/Grid'
import { PrismaClient } from '@prisma/client'

import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/BagChecked'
import HelpCircleOutline from 'mdi-material-ui/Ballot'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/JOBlistIndex'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { useState } from 'react'

export async function getServerSideProps(context) {
  const prisma = new PrismaClient()

  const projects = await prisma.project.findMany({
    include: {
      Jobs: true
    }
  })

  const Catatan = await prisma.Catatan.findMany({
    take: 4,
    orderBy: {
      createdAt: 'desc'
    }
  })

  const Job = await prisma.Job.findMany({
    take: 5,
    where: {
      onprogress: 0
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const Jobfin = await prisma.Job.findMany({
    take: 5,
    where: {
      onprogress: 1
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  const countJOB = await prisma.Job.count()

  const countJOBselesai = await prisma.Job.count({
    where: {
      onprogress: 1
    }
  })

  const counts = await prisma.Job.groupBy({
    by: ['priority', 'onprogress'],
    _count: {
      priority: true,
      onprogress: true
    }
  })

  const countTask = await prisma.Task.count()
  const countLog = await prisma.Catatan.count()
  const countPost = await prisma.Post.count()

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
      Catatan: JSON.parse(JSON.stringify(Catatan)),
      Jobbel: JSON.parse(JSON.stringify(Job)),
      Jobfin: JSON.parse(JSON.stringify(Jobfin)),
      countJOB: countJOB,
      countTask: countTask,
      countLog: countLog,
      countPost: countPost,
      countJOBselesai: countJOBselesai,
      counts: counts
    }
  }
}

const Dashboard = ({
  projects,
  Catatan,
  Jobbel,
  Jobfin,
  countTask,
  countJOB,
  countLog,
  countPost,
  countJOBselesai,
  counts
}) => {
  const [Catatanx, SetCatatanx] = useState(Catatan)
  const [Vanena, SetVanena] = useState(0)

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy total={projects.length} />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard countJOB={countJOB} countTask={countTask} countLog={countLog} countPost={countPost} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview persen={((countJOBselesai / countJOB) * 100).toFixed(0)} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning countJOBselesai={countJOBselesai} countJOB={countJOB} counts={counts} SetVanena={SetVanena} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={`${((countJOBselesai / countJOB) * 100).toFixed(0)}%`}
                icon={<Poll />}
                color='success'
                trendNumber={`-${100 - ((countJOBselesai / countJOB) * 100).toFixed(0)}%`}
                title='Persentasi'
                subtitle='Pencapaian'
                trend='negative'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={Vanena + '%'}
                title='AvePriority'
                trend='negative'
                color='secondary'
                trendNumber={`-${100 - Vanena}%`}
                subtitle='Rata-rata'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={`${(countJOBselesai / 3).toFixed(2)}`}
                trend='negative'
                title='AveFinish'
                subtitle='Priority Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={(countJOB / countJOBselesai).toFixed(2)}
                color='warning'
                trend='negative'
                subtitle='Oke Ratio '
                title='Ratio'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Table projects={projects} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries data={Catatanx} />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw Job={Jobbel} Jobfin={Jobfin} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
