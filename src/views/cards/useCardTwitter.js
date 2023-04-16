// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

import moment from 'moment'
import 'moment/locale/id'

moment.locale('id')

const CardTwitter = ({ post }) => {
  const sortedPosts = post.sort((a, b) => b.id - a.id)

  return (
    <>
      {sortedPosts.map((row, i) => (
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.black', my: 2 }} key={i}>
          <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    alt='Mary Vaughn'
                    src={`https://hrportal.toyota.co.id/Content/images/0${row.authorId}.jpg`}
                    sx={{ width: 34, height: 34, marginRight: 2.75 }}
                  />
                  <Typography variant='h6' sx={{ color: 'common.black' }}>
                    {row.nama}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5 }}>
                  <Typography variant='caption' sx={{ color: 'common.black' }}>
                    {' '}
                    {moment(row.createdAt).fromNow()}
                  </Typography>
                </Box>
              </Box>{' '}
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5 }}>
                <Typography variant='caption' sx={{ color: 'common.black' }}>
                  {moment(row.createdAt).format('dddd, DD/MM/YY HH:MM')} wib
                </Typography>
              </Box>
            </Box>
            <Divider></Divider>
            <Typography variant='body2' sx={{ marginBottom: 3, p: 2, color: 'common.black' }}>
              {row.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default CardTwitter
