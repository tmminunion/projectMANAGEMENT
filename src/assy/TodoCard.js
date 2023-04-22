import React from 'react'
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material'

import IconCeklis from 'src/@icon/IconCeklis'

function TodoCard({ todos, fillColor }) {
  return (
    <>
      {' '}
      {todos.map(todo => (
        <Card variant='outlined' key={todo.id} sx={{ my: 1 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <IconCeklis w={30} sx={{ mr: 1 }} fillColor={fillColor} />
            <Typography variant='h5' component='div' sx={{ ml: 1 }}>
              {todo.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default TodoCard
