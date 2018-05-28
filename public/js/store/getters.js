export const tree = state => state.tree || null
export const collection = state => state.tree ? state.tree.data : null
export const item = state => state.item || null
export const selected = state => state.selected || null
export const isFolder = state => state.item && state.item.type === 'folder'
export const hasSelected = state => state.selected !== null
export const prevItem = state => state.item ? state.item.previousNode() : null
export const nextItem = state => state.item ? state.item.nextNode() : null
export const parentItem = state => state.item ? state.item.parentNode() : null
export const rootItem = state => state.item ? state.item.rootNode() : null
export const depth = state => state.item ? state.item.depth() : 0
export const breadcrumb = state => state.item ? state.item.breadcrumb() : []
export const hasOpened = state => id => state.opened.includes(id)
