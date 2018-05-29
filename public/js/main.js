import 'es6-promise'
import Vue from 'vue'
import App from './components/App.vue'
import store from './store'

new Vue({
    store,
    el: '#nestedjs__file__explorer',
    render: h => h(App)
})