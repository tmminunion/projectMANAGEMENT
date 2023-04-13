// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import LinearProgress from '@mui/material/LinearProgress'
import Link from '@mui/material/Link'
import ProgressChip from 'src/@priority/Progress'

const statusObj = {
  1: { color: 'info' },
  2: { color: 'error' },
  3: { color: 'primary' },
  4: { color: 'warning' },
  5: { color: 'success' }
}

const DashboardTable = ({ projects }) => {
  console.log(projects)

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead bgcolor='#ffb400'>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell align='center'>Progress</TableCell>
              <TableCell align='center'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((row, i) => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{i + 1}</TableCell>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Link href={`project/${row.id}`}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                      <Typography variant='caption'>{row.description}</Typography>
                    </Box>
                  </Link>
                </TableCell>
                <TableCell sx={{ width: '40%' }}>
                  <LinearProgress
                    color='primary'
                    value={Math.floor(Math.random() * 100)}
                    variant='determinate'
                    style={{ height: 17 }}
                  />
                </TableCell>

                <TableCell align='center'>
                  <ProgressChip val={row.progress} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableHead>
            <TableRow bgcolor='#ffb400'>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align='center'></TableCell>
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
