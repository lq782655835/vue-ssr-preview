import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import title from './mixins/title'

Vue.mixin(title)
import ElementUI from 'element-ui'
import vuele from 'vuele';
import 'element-ui/lib/theme-chalk/index.css';
import 'vuele/dist/vuele.css';
Vue.use(ElementUI)
Vue.use(vuele, {})


export function createApp() {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
