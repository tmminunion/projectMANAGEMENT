// ** React Imports
import { useState } from 'react'
import TableCollapsible from 'src/views/tables/DaftarJob'
import { styled } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'

const TabAccount = ({ data }) => {
  // ** State

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <CardContent>
      <div>
        <TableCollapsible data={data} />
      </div>
    </CardContent>
  )
}

export default TabAccount
