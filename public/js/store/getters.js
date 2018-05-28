export const tree = state => state.tree || null
export const collection = state => state.tree ? state.tree.data : null
export const item = state => state.item || null
export const hasItem = state => state.item  !== null
export const selected = state => state.selected || null
export const hasSelected = state => state.selected !== null
export const isFolder = state => state.item && state.item.type === 'folder'
export const prevItem = state => state.item ? state.item.previousNode() : null
export const nextItem = state => state.item ? state.item.nextNode() : null
export const parentItem = state => state.item ? state.item.parentNode() : null
export const rootItem = state => state.item ? state.item.rootNode() : null
export const breadcrumb = state => state.item ? state.item.breadcrumb() : []
export const hasOpened = state => id => state.opened.includes(id)
export const icon = () => node => {
    let default_icon = 'fa fa-file'
    if (!node || !node.type) return default_icon
    switch (node.type) {
        case 'folder':
            return 'fa fa-folder'
        case 'image':
            return 'fa fa-image'
        case 'pdf':
            return 'fa fa-file-pdf'
        default:
            return default_icon
    }
}
