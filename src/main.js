import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (store.state.username && to.path.startsWith('/admin')) {
    initAdminMenu(router, store)
  }
  if (to.meta.requireAuth) {
    if (store.state.username){
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
const initAdminMenu = (router, store) => {
  if (store.state.adminMenus.length >0) {
    return
  }
  axios.get('menu').then(res => {
    if (res && res.status === 200) {
      var fmtRoutes = formatRoutes(res.data.object)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}

// 没明白
const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      // component: resolve => {
      //   require(['./components/admin/' + route.component + '.vue'], resolve)
      // },
      component: (resolve) => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      children: route.children,
      meta: {
        requireAuth: true
      }
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}

new Vue({
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
}).$mount('#app')