export const instanciateTree = ({ commit }, collection) => {
    commit('instanciateTree', collection)
}

export const setItem = ({ commit }, item) => {
    commit('setItem', item)
}

export const setSelectedFile = ({ commit }, item) => {
    commit('setSelectedFile', item)
}

export const toggleOpened = ({ commit }, id) => {
    commit('toggleOpened', id)
}