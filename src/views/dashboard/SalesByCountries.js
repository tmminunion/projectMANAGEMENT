// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import moment from 'moment'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import DotsVertical from 'mdi-material-ui/DotsVertical'

const SalesByCountries = ({ data }) => {
  return (
    <Card>
      <CardHeader
        title='Catatan Project'
        titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        <Stack sx={{ width: '100%' }} spacing={2}>
          {data.map(row => (
            <Alert severity={row.nama} key={row.id}>
              {moment(row.createdAt).format('DD/MM/YYYY hh:mm')} wib : {row.content}
            </Alert>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SalesByCountries
