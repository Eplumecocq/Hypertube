import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import middleware from './middleware'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      functional: true,
      component: require('./views/homepage.vue'),
      beforeEnter: middleware.isLogged
    },
    {
      path: '/login',
      name: 'Login',
      component: require('./views/login.vue'),
      beforeEnter: middleware.isLogged
    },
    {
      path: '/users/:username',
      name: 'Profil',
      component: require('./views/profil.vue')
    },
    {
      path: '/me/edit',
      name: 'Editprofil',
      component: require('./views/editprofil.vue'),
      beforeEnter: middleware.requireAuth
    },
    {
      path: '/me/mymovies',
      name: 'Mymovies',
      component: require('./views/mymovies.vue'),
      beforeEnter: middleware.requireAuth
    },
    {
      path: '/browse',
      name: 'Library',
      functional: true,
      component: require('./views/library.vue'),
      beforeEnter: middleware.requireAuth
    },
    {
      path: '/movies/:imdbId',
      name: 'MoviePage',
      component: require('./views/moviepage.vue'),
      beforeEnter: middleware.requireAuth
    },
    {
      path: '/*',
      name: '404',
      component: require('./views/404.vue')
    }
  ]
})
