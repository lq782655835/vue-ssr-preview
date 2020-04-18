import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import title from './mixins/title'

Vue.mixin(title)
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import vuele from 'vuele';
import 'vuele/dist/vuele.css';

console.log(12312)
Vue.use(vuele, {
    // 传入项目级配置
    selectUrl() {
        return './test'; // 通用下拉url配置函数，需返回字符串类型
    },
    resolveCommonReturn(res) {
        // 处理通用下拉接口的返回函数，更多使用可参见KSSelectMixin
    },
    remoteSelectUrl() {
        return '/remote'; // 远程搜索下拉组件的通用url配置函数，需返回字符串类型
    },
    authUrl: '', // 系统级的获取权限接口，更多使用可参见KSAuthMixin文档
    unauthorizedUrl: '', // 系统级的无权限页
    transferAuthResult() {
        // 权限接口返回值的处理函数，更多使用可参见KSAuthMixin文档
    }
})

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
