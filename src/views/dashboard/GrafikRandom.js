import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// import ApexCharts from 'react-apexcharts'

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

function Grafikrandom({ maxna }) {
  const [max, setmax] = useState(100)

  const [options, setOptions] = useState({
    chart: {
      id: 'random-data',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 2000
        }
      },

      toolbar: {
        show: false
      },
      height: 100 // Ubah tinggi grafik menjadi 200
    },
    grid: {
      show: false // you can either change hear to disable all grids
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: false
      },
      tooltip: {
        show: false
      }
    },
    yaxis: {
      min: 0,
      max: max,
      labels: {
        show: false
      },
      tooltip: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    tooltip: {
      enabled: false
    }
  })

  const [series, setSeries] = useState([
    {
      name: 'Data',
      data: [],
      color: '#56ca00'
    },
    {
      name: 'Target',
      data: [],
      color: '#ff0000' // set the color to red
    }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomData = Math.floor(Math.random() * (max + 5))
      const targetData = 100 - max
      let newData = series[0].data.slice(-20)
      let newTargetData = series[1].data.slice(-20)
      newData.push({ x: Date.now(), y: randomData })
      newTargetData.push({ x: Date.now(), y: targetData })
      setSeries([{ data: newData }, { data: newTargetData }])
    }, 5000)

    return () => clearInterval(interval)
  }, [series, max])

  useEffect(() => {
    setmax(maxna)
  }, [maxna])

  return (
    <div className='app'>
      <ApexCharts options={options} series={series} type='area' height={130} />
    </div>
  )
}

export default Grafikrandom
