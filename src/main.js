import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

const appEleWrapper = document.createElement('div');
const appEle = document.createElement('div');
appEleWrapper.setAttribute('id', 'shopify-files-download-wrapper');
appEle.setAttribute('id', 'shopify-files-download');
appEleWrapper.appendChild(appEle)
document.body.prepend(appEleWrapper);

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#shopify-files-download')
