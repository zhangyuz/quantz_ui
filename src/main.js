import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import { createProvider } from './vue-apollo'

stockInit(Highcharts)

Vue.config.productionTip = false
Vue.use(HighchartsVue)

new Vue({
  router,
  store,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
