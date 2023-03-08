export const createData = (id, date, userId, isAnonymous, createdAt, updatedAt, actions) => ({
  id,
  date,
  userId,
  isAnonymous: String(isAnonymous),
  createdAt,
  updatedAt,
  actions,
})
