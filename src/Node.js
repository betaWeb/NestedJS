const PRIVATE_PROPERTIES = ['__nodeid', '__parentid', '__nextid', '__previd', '__tree']

class Node {

    /**
     * @param {Object} node
     */
    constructor(node = {}, tree_instance = null) {
        this._properties = this._mapProperties(node)
        this._tree_instance = tree_instance
    }

    /**
     * Return node properties
     * @returns {Object}
     */
    get properties() {
        return this._properties
    }

    /**
     * Check if node property exists
     * @param {String} key
     * @returns {boolean}
     */
    hasProperty(key) {
        return this._properties[key] !== undefined
    }

    /**
     * Returns node property if exists, defaultValue otherwise
     * @param {String} key
     * @param {*} defaultValue
     * @returns {*}
     */
    getProperty(key, defaultValue = null) {
        return this._properties[key] || defaultValue
    }

    /**
     * Set node property
     * @param {String} key
     * @param {*} value
     */
    setProperty(key, value) {
        this._properties[key] = value
    }

    /**
     * Returns node unique id
     * @returns {String}
     */
    getId() {
        return this.getProperty(this.getTree().options.properties.node_id)
    }

    /**
     * Returns node parent unique id
     * @returns {String|null}
     */
    getParentId() {
        return this.getProperty(this.getTree().options.properties.parent_id)
    }

    /**
     * Returns previous node unique id
     * @returns {String|null}
     */
    getPreviousId() {
        return this.getProperty(this.getTree().options.properties.prev_id)
    }

    /**
     * Returns next node unique id
     * @returns {String|null}
     */
    getNextId() {
        return this.getProperty(this.getTree().options.properties.next_id)
    }

    /**
     * Returns an array of child nodes
     * @returns {Node[]}
     */
    childNodes() {
        return this.getProperty(this.getTree().options.properties.children_key, [])
    }

    /**
     * Returns an array of previous nodes if exists, null otherwise
     * @returns {Node[]|null}
     */
    previousNodes() {
        let instance = this.getTree()
        return instance !== null ? instance.getPreviousNodes(this) : null
    }

    /**
     * Returns previous node if exists, null otherwise
     * @returns {Node|null}
     */
    previousNode() {
        let instance = this.getTree()
        return instance !== null ? instance.getPreviousNode(this) : null
    }

    /**
     * Returns an array of next nodes if exists, null otherwise
     * @returns {Node[]|null}
     */
    nextNodes() {
        let instance = this.getTree()
        return instance !== null ? instance.getNextNodes(this) : null
    }

    /**
     * Returns next node if exists, null otherwise
     * @returns {Node|null}
     */
    nextNode() {
        let instance = this.getTree()
        return instance !== null ? instance.getNextNode(this) : null
    }

    /**
     * Returns parent node if exists, null otherwise
     * @returns {Node|null}
     */
    parentNode() {
        let instance = this.getTree()
        return instance !== null ? instance.getParentNode(this) : null
    }

    /**
     * Returns an array of siblings nodes if exists, null otherwise
     * @returns {Node[]|null}
     */
    siblingsNodes() {
        let instance = this.getTree()
        return instance !== null ? instance.getSiblingsNodes(this) : null
    }

    /**
     * Returns Nested instance
     * @returns {Nested|null}
     */
    getTree() {
        return this._tree_instance || null
    }

    /**
     * Returns current node breadcrumb
     * @returns {Node[]|Array}
     */
    breadcrumb() {
        let instance = this.getTree()
        if (instance !== null)
            return instance.getBreadcrumb(this).reverse()
        return []
    }

    /**
     * Returns node first child if exists, null otherwise
     * @returns {Node|null}
     */
    firstChild() {
        if (!this.hasChildNodes()) return null
        const children = this.childNodes()
        return children && children.length ? children[0] : null
    }

    /**
     * Returns node last child if exists, null otherwise
     * @returns {Node|null}
     */
    lastChild() {
        if (!this.hasChildNodes()) return null
        const children = this.childNodes()
        return children && children.length ? children[children.length - 1] : null
    }

    /**
     * Returns node child by index if exists, null otherwise
     * @returns {Node|null}
     */
    nthChild(index) {
        if (!this.hasChildNodes()) return null
        const children = this.childNodes()
        return children && children.length ? children[index] : null
    }

    /**
     * Count node childs
     * @returns {Number}
     */
    countChildren() {
        if (!this.hasChildNodes()) return 0
        return this.childNodes().length
    }

    /**
     * @returns {Boolean}
     */
    hasChildNodes() {
        const children = this.childNodes()
        return Boolean(children !== undefined && children !== null && children.length > 0)
    }

    /**
     * @returns {Boolean}
     */
    hasParentNode() {
        return Boolean(this.getParentId() !== null)
    }

    /**
     * @returns {Boolean}
     */
    hasPreviousNode() {
        return Boolean(this.getPreviousId() !== null)
    }

    /**
     * @returns {Boolean}
     */
    hasNextNode() {
        return Boolean(this.getNextId() !== null)
    }

    /**
     * Map node properties
     * @param {Object} properties
     * @returns {Object}
     * @private
     */
    _mapProperties(properties) {
        for (let property_name in properties) {
            if (properties.hasOwnProperty(property_name)) {
                if (!this[property_name] && !PRIVATE_PROPERTIES.includes(property_name))
                    this[property_name] = properties[property_name]
            }
        }
        return properties
    }

}

module.exports = Node