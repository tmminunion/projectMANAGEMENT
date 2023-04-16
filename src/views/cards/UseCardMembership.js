// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import moment from 'moment'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Link from '@mui/material/Link'
import { useState } from 'react'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import StarOutline from 'mdi-material-ui/StarOutline'
import AccountOutline from 'mdi-material-ui/BriefcaseEdit'
import LockOpenOutline from 'mdi-material-ui/BriefcaseUpload'
import PriorityChip from 'src/@priority/Priority'

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const CardMembership = ({ indek, nama, desc, Jobs, finish, nom, tgl, Task }) => {
  const totalPriority = Jobs.reduce((acc, curr) => acc + curr.priority + 1, 0)
  const dataprio = Math.ceil(totalPriority / Jobs.length) - 1
  let color = 'info.main'
  const fin = finish / Jobs.length
  if (fin == 1) {
    color = 'success.main'
  }

  return (
    <Card>
      <Grid container spacing={6}>
        <Grid
          item
          xs={12}
          sm={1}
          sx={{ bgcolor: color, justifyContent: 'center', display: 'flex', alignItems: 'center' }}
        >
          <Typography variant='h3' sx={{ textAlign: 'center' }}>
            {nom}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
            <Link href={`/project/${indek}`}>
              <Typography variant='h6'>{nama}</Typography>
              <Typography variant='body2'>{desc}</Typography>
            </Link>
            <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
            <Grid container spacing={4}>
              <Grid item xs={12} sm={2} sx={{ alignItems: 'center' }}>
                <StyledBox>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PriorityChip val={dataprio} />
                  </Box>{' '}
                </StyledBox>
              </Grid>
              <Grid item xs={12} sm={3}>
                <StyledBox>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>{Jobs.length} Tugas</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>{Task.length} Pekerjaan</Typography>
                  </Box>
                </StyledBox>{' '}
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                  <Typography variant='body2'>{finish} Tugas Selesai</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                  <Typography variant='body2'>{moment(tgl).format('DD/MM/YYYY')}</Typography>
                </Box>{' '}
              </Grid>

              <Grid item xs={12} sm={3}>
                {' '}
                <Box
                  sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Rating
                    name='text-feedback'
                    value={(finish / Jobs.length) * 5}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                  />
                </Box>
              </Grid>
            </Grid>{' '}
          </CardContent>{' '}
        </Grid>
        <Grid item sm={2} xs={12}>
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'action.hover'
            }}
          >
            <Box>
              <CircularProgressbar
                value={Jobs.length ? (finish / Jobs.length) * 100 : 0}
                text={Jobs.length ? `${((finish / Jobs.length) * 100).toFixed(0)}%` : '0%'}
              />
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CardMembership
