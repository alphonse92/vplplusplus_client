export const logoutByExpiration = store => next => action => {
  next(action)
}