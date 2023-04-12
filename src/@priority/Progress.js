import Chip from '@mui/material/Chip'

const priorityOptions = [
  { label: 'On Progress', color: 'info' },
  { label: 'Pending', color: 'secondary' },
  { label: 'Stag', color: 'warning' },
  { label: 'Delay', color: 'error' },
  { label: 'Finish', color: 'success' }
]

export default function ProgressChip(props) {
  const { val } = props

  return (
    <>
      <Chip
        label={priorityOptions[val].label}
        color={priorityOptions[val].color}
        sx={{
          height: 20,
          fontSize: '0.75rem',
          textTransform: 'capitalize',
          fontWeight: 30
        }}
      />
    </>
  )
}
