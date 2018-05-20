import Node from '../src/Node'

export default class Nested {

    /**
     * @param {Array} data
     */
    constructor(data = []) {
        this.data = this.buildTree(data)
        this.currentNode = null
        this.parentNode = null
        this.prevNode = null
        this.nextNode = null
    }

    /**
     * Retrieve node by id
     * @param {String} id
     * @param {Array|null} data
     * @returns {Node|null}
     */
    retrieveNode(id, data = null) {
        if (this.currentNode !== null && this.currentNode.getId() === id)
            return this.currentNode

        if (data === null) {
            data = this.data
            this.currentNode = null
            this.prevNode = null
            this.nextNode = null
        }

        let node = null
        for (let i = 0; i < data.length; i++) {
            node = data[i]
            if (node.getId() === id) {
                this.prevNode = data[i - 1] || null
                this.nextNode = data[i + 1] || null
                node.setProperty('__previd', this.prevNode !== null ? this.prevNode.getId() : null)
                node.setProperty('__nextid', this.nextNode !== null ? this.nextNode.getId() : null)
                break
            } else if (node.hasChildNodes()) {
                node = this.retrieveNode(id, node.childNodes())
            } else node = null
        }
        this.currentNode = node
        return this.currentNode
    }

    /**
     * Retrieve nodes by key-value couple
     * @param {String} key
     * @param {*|null|undefined} value
     * @param {Array} data
     * @returns {Node[]|[]}
     */
    retrieveNodesBy(key, value, data = null) {
        return (data || this.data).reduce((acc, node) => {
            if (node.hasProperty(key) && node.getProperty(key) === value) acc.push(node)
            if (node.hasChildNodes())
                acc = acc.concat(this.retrieveNodesBy(key, value, node.childNodes()))
            return acc
        }, [])
    }

    /**
     * Retrieve node parent
     * @param {Node|String} node
     * @returns {Node|null}
     */
    getParentNode(node) {
        const id = node.constructor === Node ? node.getParentId() : node
        return this.retrieveNode(id)
    }

    /**
     * Retrieve node siblings
     * @param {Node|String} node
     * @returns {Array}
     */
    getSiblingsNodes(node) {
        return [].concat(this.getPreviousNodes(node), this.getNextNodes(node))
    }

    /**
     * Retrieve previous nodes by id
     * @param {Node|String} node
     * @returns {Array}
     */
    getPreviousNodes(node) {
        if (node.constructor === String) node = this.retrieveNode(node)
        let previousNodes = []
        if (node.getPreviousId() !== null) {
            previousNodes.push(node.previousNode())
            previousNodes = previousNodes.concat(this.getPreviousNodes(node.getPreviousId()))
        }
        return previousNodes
    }

    /**
     * Retrieve previous node
     * @param {Node|String} node
     * @returns {Node}
     */
    getPreviousNode(node) {
        const id = node.constructor === Node ? node.getId() : node
        this.retrieveNode(id)
        return this.prevNode
    }

    /**
     * Retrieve node next nodes
     * @param {Node|String} node
     * @returns {Array}
     */
    getNextNodes(node) {
        if (node.constructor === String) node = this.retrieveNode(node)
        let nextNodes = []
        if (node.getNextId() !== null) {
            nextNodes.push(node.nextNode())
            nextNodes = nextNodes.concat(this.getNextNodes(node.getNextId()))
        }
        return nextNodes
    }

    /**
     * Retrieve next node
     * @param {Node|String} node
     * @returns {Node}
     */
    getNextNode(node) {
        const id = node.constructor === Node ? node.getId() : node
        this.retrieveNode(id)
        return this.nextNode
    }

    /**
     * Retrieve node breadcrumb
     * @param {Node|String} node
     * @returns {Array}
     */
    getBreadcrumb(node) {
        if (node.constructor === String) node = this.retrieveNode(node)
        let breadcrumb = []
        breadcrumb.push(node)
        if (node.getParentId() !== null)
            breadcrumb = breadcrumb.concat(this.getBreadcrumb(node.getParentId()))
        return breadcrumb
    }

    /**
     * @param {Array} data
     * @param {String|null} parentid
     * @returns {Node[]}
     */
    buildTree(data = [], parentid = null) {
        if (!this.count) this.count = 0
        return data.reduce((acc, node) => {
            this.count += 1
            if (node.constructor !== Node)
                node = new Node(node)
            node.setProperty('__nodeid', `node-${this.count}`)
            node.setProperty('__parentid', parentid)
            node.setProperty('__tree', this)
            if (node.hasChildNodes())
                node.setProperty('children', this.buildTree(node.childNodes(), node.getId()))
            acc.push(node)
            return acc
        }, [])
    }

}