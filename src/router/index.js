import Vue from 'vue'
import VueRouter from 'vue-router'
import Frontpage from '../views/Frontpage.vue'
import Game from '../views/Game.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Frontpage',
    component: Frontpage
  },
  {
    path: '/game',
    name: 'game',
    component: Game,
    props: route => ({ 
      amount: route.query.amount,
      difficulty: route.query.amount,
      category: route.query.amount,
    })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
