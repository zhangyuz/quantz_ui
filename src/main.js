import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import indicatorsAll from 'highcharts/indicators/indicators-all'
import fullscreen from 'highcharts/modules/full-screen'
import stockTools from 'highcharts/modules/stock-tools'
import exportingInit from 'highcharts/modules/exporting'
import darkUnica from 'highcharts/themes/dark-unica'

/** 主题 */
darkUnica(Highcharts)

/** 初始化 */
stockInit(Highcharts)

indicatorsAll(Highcharts)
fullscreen(Highcharts)
stockTools(Highcharts)

exportingInit(Highcharts)

Vue.config.productionTip = false
Vue.use(HighchartsVue)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
