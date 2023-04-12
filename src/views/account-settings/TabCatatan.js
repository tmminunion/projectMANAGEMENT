// ** MUI Imports
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

const TabCatatan = ({ data }) => {
  data.sort((a, b) => b.id - a.id)

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {data.map(row => (
          <Alert severity={row.nama} key={row.id}>
            {row.content}
          </Alert>
        ))}
      </Stack>
    </>
  )
}

export default TabCatatan
