import moment from 'moment'

export const getLatestEndTime = itemlist => {
  const sortedItems = [...itemlist].sort((a, b) => {
    if (moment(a.end_time).isAfter(moment(b.end_time))) return -1
    if (moment(b.end_time).isAfter(moment(a.end_time))) return 1

    return 0
  })

  return sortedItems[0].end_time
}
