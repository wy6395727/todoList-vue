import Vue from 'vue'
import Router from 'vue-router'
import Layouts from '@/components/layouts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layouts',  //路径名
      component: Layouts
    }
  ]
})
