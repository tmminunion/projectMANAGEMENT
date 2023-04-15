// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useState, useEffect } from 'react'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const WeeklyOverview = ({ persen }) => {
  // ** Hook
  const theme = useTheme()
  const [colorfin, setcolorfin] = useState('#ff0000')
  useEffect(() => {
    if (persen > 66) {
      setcolorfin('#56ca00') // hijau
    } else if (persen > 33) {
      setcolorfin('#ffcc00') // kuning
    } else {
      setcolorfin('#ff0000') // merah
    }
  }, [persen])

  const options = {
    chart: {
      type: 'radialBar'
    },
    color: ['#1E88E5'],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 10,
          size: '60%',
          background: colorfin
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 2,
            blur: 9,
            opacity: 0.65
          }
        },
        dataLabels: {
          name: {
            offsetY: -1,
            color: '#d3d3d3',
            fontSize: '1px'
          },
          value: {
            color: '#1E88E5',
            fontSize: '60px',
            show: true,
            offsetY: 4
          }
        }
      }
    },
    fill: {
      type: 'solid',
      colors: ['#9155fd'] // Tiga warna yang berbeda
    }
  }

  return (
    <Card>
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='radialBar' height={385} options={options} series={[persen]} />
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
