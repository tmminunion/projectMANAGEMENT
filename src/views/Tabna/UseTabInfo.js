// ** React Imports
import { forwardRef, useState } from 'react'
import { useSettings } from 'src/@core/hooks/useSettings'

import Grid from '@mui/material/Grid'
import CardTwitter from '../cards/useCardTwitter'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

const TabInfo = ({ pid, post, setpost }) => {
  // ** State
  const [value, setvalue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { userNama, userNoreg } = useSettings()

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)

    const data = {
      authorId: userNoreg,
      nama: userNama,
      title: userNama,
      content: value,
      projectId: pid
    }

    try {
      const response = await fetch('/api/db/komentar/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const datanew = await response.json()
      if (response.status === 201) {
        setvalue('')
        setpost([...post, datanew])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CardContent>
      <Grid container spacing={2} sx={{ px: 5, margin: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt='Mary Vaughn'
              src={`https://hrportal.toyota.co.id/Content/images/0${userNoreg}.jpg`}
              sx={{ width: 34, height: 34, marginRight: 2.75 }}
            />
            <Typography variant='h6' sx={{ color: 'common.black' }}>
              {userNama}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ px: 5 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label='Tulis Komentar'
              minRows={2}
              placeholder='Apa yang anda tulis'
              value={value}
              onChange={e => setvalue(e.target.value)}
              required
              disabled={isLoading} // disable ketika isLoading true
            />
          </Grid>

          <Grid item xs={12}>
            <Button type='submit' variant='contained' sx={{ marginRight: 2.5 }} disabled={isLoading}>
              {isLoading ? 'Mengirim...' : 'Kirim'} {/* Tulisan menjadi "Mengirim..." ketika isLoading true */}
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={() => setDate(null)}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid item xs={12} sm={12} md={12} sx={{ p: 5, marginTop: 3 }}>
        <CardTwitter post={post} />
      </Grid>
    </CardContent>
  )
}

export default TabInfo
