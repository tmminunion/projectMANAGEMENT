// ** React Imports
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'

import CardContent from '@mui/material/CardContent'

const FormLayoutsBasic = () => {
  // ** States
  const [values, setValues] = useState()
  const [namaAcara, setNamaAcara] = useState('')
  const router = useRouter()

  const SubmitForm = async e => {
    e.preventDefault()
    const date = new Date()
    const formattedDate = date.toISOString() // menghasilkan string ISO date, contoh: '2023-04-12T11:30:00.000Z'

    const res = await fetch('/api/db/project/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: namaAcara,
        description: values,
        status: 0,
        progress: 0,
        onprogress: 0,
        priority: 0,
        endDate: formattedDate,
        startDate: formattedDate
      })
    })

    const data = await res.json()
    if (res.status === 201) {
      router.push(`/project/${data.id}`)
    } else {
      console.log('eroro')
    }
  }

  return (
    <Card>
      <CardHeader title='Tambah Project Baru' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => SubmitForm(e)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Nama Project'
                placeholder='Masukan Nama Project'
                onChange={e => setNamaAcara(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='text'
                label='Keterangan'
                placeholder='Description Project'
                onChange={e => setValues(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button type='submit' variant='contained' size='large'>
                  Buat Project!
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsBasic
