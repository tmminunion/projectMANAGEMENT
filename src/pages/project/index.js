// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardMembership from 'src/views/cards/CardMembership'
import Modal from '@mui/material/Modal'

import { PrismaClient } from '@prisma/client'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useState } from 'react'
import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4
}

export async function getServerSideProps(context) {
  const prisma = new PrismaClient()

  const projects = await prisma.project.findMany({
    include: {
      Jobs: true,
      Task: true
    }
  })

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects))
    }
  }
}

const CardBasic = ({ projects }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  function countOnProgress(projectId) {
    const project = projects.find(project => project.id === projectId)

    if (!project) {
      throw new Error(`Project with ID ${projectId} not found`)
    }

    let onProgressCount = 0

    project.Jobs.forEach(job => {
      if (job.onprogress === 1) {
        onProgressCount++
      }
    })

    return onProgressCount
  }

  return (
    <>
      <Grid container spacing={6} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', mb: 5 }}>
        <Grid item xs={12} sx={{ paddingBottom: 4 }}>
          <Typography variant='h5'>Daftar project</Typography>
        </Grid>
        {projects.map((project, i) => (
          <Grid item xs={12} md={12} key={i}>
            <CardMembership
              indek={project.id}
              nom={i + 1}
              nama={project.name}
              desc={project.description}
              Jobs={project.Jobs}
              finish={countOnProgress(project.id)}
              tgl={project.endDate}
              Task={project.Task}
            />
          </Grid>
        ))}
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'grey',
              '& > :not(style)': { m: 1 }
            }}
          >
            <Box component='span' sx={{ p: 2, border: '1px dashed grey' }}>
              <Button onClick={handleOpen}>Tambah Project Baru</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <FormLayoutsBasic />
        </Box>
      </Modal>
    </>
  )
}

export default CardBasic
