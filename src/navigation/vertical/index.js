// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import BookOutline from 'mdi-material-ui/BookOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },

    {
      sectionTitle: 'Project'
    },
    {
      title: 'Project',
      icon: BookOutline,
      path: '/project'
    },
    {
      title: 'Timeline',
      icon: BookOutline,
      path: '/timeline'
    },
    {
      title: 'Tugas',
      icon: BookOutline,
      path: '/tugas'
    }
  ]
}

export default navigation
