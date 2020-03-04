import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login'
import Register from '../pages/useralter'
import Heom from '../pages/heom.vue'
import Scenes from '../pages/mange/scenes.vue'
import Insetm from '../pages/mange/insetm.vue'
Vue.use(Router) 
 
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
    ,
    {
      path: '/heom',
      name: 'Heom',
      component: Heom
    }
    ,
    {
      path: '/scenes',
      name: 'Scenes',
      component: Scenes
    } ,
    {
      path: '/movie',
      name: 'Movie',
      component: resolve => require(['../pages/mange/movie.vue'], resolve)
    },
    {
      path: '/insetm',
      name: 'Insetm',
      component: Insetm
    }
  ]
})
