export const instanciateTree = (state, collection) => {
    if (state.tree === null) state.tree = new Nested(collection)
}

export const setItem = (state, item) => {
    state.item = item
}

export const setSelectedFile = (state, selected) => {
    state.selected = selected
}

export const toggleOpened = (state, id) => {
    if (state.opened.includes(id))
        state.opened = state.opened.filter(i => i !== id)
    else state.opened = [...state.opened, id]
}

export const toggleMaximize = (state) => {
    state.window_maximized = !state.window_maximized
}