// import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
    tree: null,
    item: null,
    selected: null,
    opened: [],
    window_maximized: false
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})