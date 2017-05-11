import userService from './services/user.service'

export default {
  requireAuth (to, from, next) {
    userService.getCurrentUser()
      .then(res => {
        (typeof res.data.error !== 'undefined')
        ? next({ path: '/login' })
        : next()
      })
  },
  isLogged (to, from, next) {
    return userService.getCurrentUser()
      .then(res => {
        (typeof res.data.error === 'undefined')
        ? next({ path: '/browse' })
        : next()
      })
  }
}
