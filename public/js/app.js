import Vue from 'vue'
import App from './components/App'
import store from './store'


new Vue({
    store,
    el: '#nestedjs__file__explorer',
    render: h => h(App)
})