import Chip from '@mui/material/Chip'

export const priorityOptions = [
  { label: 'Biasa', color: 'success' },
  { label: 'Penting', color: 'warning' },
  { label: 'Mendesak', color: 'error' },
  { label: 'done', color: 'secondary' }
]

export default function PriorityChip(props) {
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
          fontWeight: 300
        }}
      />
    </>
  )
}
