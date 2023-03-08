import moment from 'moment'

export const createData = (id, date, userId, isAnonymous, createdAt, updatedAt, actions) => ({
  id,
  date: moment(date).format('DD-MM-YYYY'),
  userId,
  isAnonymous: String(isAnonymous),
  createdAt: moment(createdAt).format('DD-MM-YYYY hh:mm:ss'),
  updatedAt: moment(updatedAt).format('DD-MM-YYYY hh:mm:ss'),
  actions,
})
