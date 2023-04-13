// ** MUI Imports
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import moment from 'moment'

const TabCatatan = ({ data }) => {
  data.sort((a, b) => b.id - a.id)

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {data.map(row => (
          <Alert severity={row.nama} key={row.id}>
            {moment(row.createdAt).format('DD/MM/YYYY hh:mm')} wib : {row.content}
          </Alert>
        ))}
      </Stack>
    </>
  )
}

export default TabCatatan
