// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'

const data = [
  {
    progress: 0,
    imgHeight: 20,
    title: 'Normal',
    color: 'success',
    amount: '0',
    subtitle: 'Tugas Normal',
    imgSrc: '/images/cards/logo-zipcar.png'
  },
  {
    progress: 0,
    color: 'warning',
    imgHeight: 20,
    title: 'Penting',
    amount: '0',
    subtitle: 'Harus di Kerjakan',
    imgSrc: '/images/cards/logo-bitbank.png'
  },
  {
    progress: 0,
    imgHeight: 20,
    title: 'Mendesak',
    color: 'error',
    amount: '0',
    subtitle: 'Harus di selesaikan',
    imgSrc: '/images/cards/logo-aviato.png'
  }
]

const TotalEarning = ({ countJOB, countJOBselesai, counts, SetVanena }) => {
  const countJOB1 = (counts.find(count => count.priority === 1 && count.onprogress === 0) || {})._count || 0 || 0
  const countJOB1f = (counts.find(count => count.priority === 1 && count.onprogress === 1) || {})._count || 0 || 0
  const countJOB2 = (counts.find(count => count.priority === 2 && count.onprogress === 0) || {})._count || 0 || 0
  const countJOB2f = (counts.find(count => count.priority === 2 && count.onprogress === 1) || {})._count || 0 || 0
  const countJOB0 = (counts.find(count => count.priority === 0 && count.onprogress === 0) || {})._count || 0 || 0
  const countJOB0f = (counts.find(count => count.priority === 0 && count.onprogress === 1) || {})._count || 0 || 0

  // menangani nilai undefined pada count.priority
  const countJOB1_prio = countJOB1.priority || 0
  const countJOB1f_prio = countJOB1f.priority || 0
  const countJOB2_prio = countJOB2.priority || 0
  const countJOB2f_prio = countJOB2f.priority || 0
  const countJOB0_prio = countJOB0.priority || 0
  const countJOB0f_prio = countJOB0f.priority || 0

  data[0].progress = (
    (parseInt(countJOB0f_prio) / (parseInt(countJOB0f_prio) + parseInt(countJOB0_prio))) *
    100
  ).toFixed(0)
  data[1].progress = (
    (parseInt(countJOB1f_prio) / (parseInt(countJOB1f_prio) + parseInt(countJOB1_prio))) *
    100
  ).toFixed(0)
  data[2].progress = (
    (parseInt(countJOB2f_prio) / (parseInt(countJOB2f_prio) + parseInt(countJOB2_prio))) *
    100
  ).toFixed(0)

  data[0].amount = `${parseInt(countJOB0f_prio)}/${parseInt(countJOB0f_prio) + parseInt(countJOB0_prio)} - ${
    data[0].progress
  }% (-${parseInt(countJOB0_prio)})`
  data[1].amount = `${parseInt(countJOB1f_prio)}/${parseInt(countJOB1f_prio) + parseInt(countJOB1_prio)} - ${
    data[1].progress
  }% (-${parseInt(countJOB1_prio)})`
  data[2].amount = `${parseInt(countJOB2f_prio)}/${parseInt(countJOB2f_prio) + parseInt(countJOB2_prio)} - ${
    data[2].progress
  }% (-${parseInt(countJOB2_prio)})`
  const one0 = parseInt(data[0].progress) * 9
  const one1 = parseInt(data[1].progress) * 3

  const avena = one1 + one0 + parseInt(data[2].progress)

  SetVanena((avena / 13).toFixed(0))

  return (
    <Card>
      <CardHeader
        title='Prioritas Tugas'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
            {countJOBselesai} / {countJOB}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
            <MenuUp sx={{ fontSize: '1.875rem', verticalAlign: 'middle' }} />
            <Typography variant='body2' sx={{ fontWeight: 600, color: 'error.main' }}>
              -{(countJOB - countJOBselesai).toFixed(0)}
            </Typography>
          </Box>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 10 }}>
          Perlu Effort Pencapaian Sebesar {(((countJOB - countJOBselesai) / countJOB) * 100).toFixed(0)}%
        </Typography>

        {data.map((item, index) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== data.length - 1 ? { mb: 8.5 } : {})
              }}
            >
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 40,
                  height: 40,
                  backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
                }}
              >
                <img src={item.imgSrc} alt={item.title} height={item.imgHeight} />
              </Avatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant='caption'>{item.subtitle}</Typography>
                </Box>

                <Box sx={{ minWidth: 150, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                    {item.amount}
                  </Typography>
                  <LinearProgress
                    color={item.color}
                    value={item.progress}
                    variant='determinate'
                    style={{ height: 10 }}
                  />
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TotalEarning
