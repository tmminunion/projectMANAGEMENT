// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CheckCircle from 'mdi-material-ui/CheckCircle'
import HomeOutline from 'mdi-material-ui/HomeOutline'

import BookOutline from 'mdi-material-ui/BookOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountArrowRightOutline'
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
      icon: GoogleCirclesExtended,
      path: '/timeline'
    },
    {
      sectionTitle: 'Tugas'
    },
    {
      title: 'Tugas On Progress',
      icon: AlertCircleOutline,
      path: '/tugas/onprogress/'
    },
    {
      title: 'Tugas Selesai',
      icon: CheckCircle,
      path: '/tugas'
    },
    {
      sectionTitle: 'User'
    },
    {
      title: 'Logout',
      icon: AccountPlusOutline,
      path: '#'
    }
  ]
}

export default navigation
