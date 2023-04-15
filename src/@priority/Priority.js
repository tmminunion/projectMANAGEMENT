import Chip from '@mui/material/Chip'

export const priorityOptions = [
  { label: 'Normal', color: 'success' },
  { label: 'Penting', color: 'warning' },
  { label: 'Mendesak', color: 'error' }
]

export default function PriorityChip(props) {
  const { val, size } = props
  console.log(val)

  if (isNaN(val)) {
    return (
      <>
        <Chip
          label='none'
          color='default'
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
