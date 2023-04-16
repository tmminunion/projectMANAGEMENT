// ** React Imports
import { useState } from 'react'
import { signIn, useSession, signOut } from 'next-auth/react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import Alert from '@mui/material/Alert'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })
  const { status, data } = useSession()
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [Loading, setLoading] = useState(false)

  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  const { error } = router.query

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSubmit = e => {
    e.preventDefault()
    signIn('credentials', { user, pwd })
      .then(() => {
        // Route callback untuk pengguna berhasil masuk
        router.push('/')
      })
      .catch(() => {
        // Route callback untuk pengguna gagal masuk
        router.push('/login')
      })
  }

  if (status === 'authenticated') {
    router.push('/api/auth/oke?data=refresh', undefined, { shallow: true })
  } else {
    return (
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Silahkan Login ! 👋🏻
              </Typography>
              <Typography variant='body2'>
                Gunakan 7 digit Noreg dan password dengan tanggal lahir format ddmmyyyy contoh 02101987
              </Typography>
            </Box>
            {error ? (
              <Box sx={{ mb: 6, mt: 2 }}>
                <Alert variant='filled' severity='error'>
                  Noreg atau Password SALAH ...!!!
                </Alert>
              </Box>
            ) : (
              ''
            )}

            <form autoComplete='off' onSubmit={handleSubmit}>
              <TextField
                autoFocus
                fullWidth
                id='user'
                label='noreg'
                sx={{ marginBottom: 4 }}
                value={user}
                onChange={e => setUser(e.target.value)}
                required
              />
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-password' required>
                  Password
                </InputLabel>
                <OutlinedInput
                  label='Password'
                  value={pwd}
                  onChange={e => setPwd(e.target.value)}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                  required
                />
              </FormControl>
              <Box
                sx={{
                  mb: 8,
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between'
                }}
              >
                <Link passHref href='/'>
                  <LinkStyled onClick={e => e.preventDefault()}></LinkStyled>
                </Link>
              </Box>
              <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} type='submit'>
                Login
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}></Box>
            </form>
          </CardContent>
        </Card>
        <FooterIllustrationsV1 />
      </Box>
    )
  }
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
