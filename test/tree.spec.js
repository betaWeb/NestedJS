const expect = require('chai').expect
const {clearContext, getContext} = require('../src/utils')
const NestedJS = require('../index')
const collection = require('./collection')

describe('NestedJS', () => {

    before(() => {
        this.tree = new NestedJS(collection)
        this.nodes = this.tree.retrieveNodesBy('name', 'entry 23')
        this.node = this.nodes[0]
        this.parentNode = this.node.parentNode()
        this.parentPreviousNode = this.parentNode.previousNode()
        this.previousNode = this.node.previousNode()
        this.nextNode = this.node.nextNode()
    })

    after(() => {
        clearContext()
        process.exit(0)
    })

    describe('Tree', () => {

        it('should have build collection tree', () => {
            expect(this.tree).to.have.property('data')
            expect(this.tree.data).to.not.be.empty
        })

        it('should have 17 entries on the tree', () => expect(this.tree.getTreeSize()).to.equal(17))

        it('should have uniqueid', () => expect(this.tree.getUniqueId()).to.not.be.null)

        it('should have stocked context', () => {
            let context = getContext(this.tree.getUniqueId())
            expect(context).to.not.be.null
            expect(context).to.not.be.empty
            expect(context.getUniqueId()).to.equal(this.tree.getUniqueId())
        })

        it('should retrieve depth 1 nodes', () => {
            let nodes = this.tree.retrieveNodesByDepth(1)
            expect(nodes).not.to.be.empty
            expect(nodes.length).to.equal(7)
        })

        it('should retrieve depth 2 nodes', () => {
            let nodes = this.tree.retrieveNodesByDepth(2)
            expect(nodes).not.to.be.empty
            expect(nodes.length).to.equal(6)
        })

        it('should not retrieve depth 4 nodes', () => {
            let nodes = this.tree.retrieveNodesByDepth(4)
            expect(nodes).to.be.empty
        })
    })

    describe('Node', () => {

        it('should have node with property name as "entry 23"', () => {
            expect(this.nodes).to.not.be.empty
            expect(this.node.name).to.equal('entry 23')
        })

        it('should have child nodes', () => expect(this.node.hasChildNodes()).to.be.true)

        it('should have previous node named "entry 22"', () => {
            expect(this.previousNode).to.not.be.null
            expect(this.previousNode.name).to.equal('entry 22')
        })

        it('should not have next node', () => expect(this.nextNode).to.be.null)

        it('should have parent node named "entry 2"', () => {
            expect(this.parentNode).to.not.be.null
            expect(this.parentNode.name).to.equal('entry 2')
        })

        it('should have parent previous node named "entry 1"', () => {
            expect(this.parentPreviousNode).to.not.be.null
            expect(this.parentPreviousNode.name).to.equal('entry 1')
        })

        it('should have a 2 entries breadcrumb', () => {
            expect(this.node.breadcrumb()).to.not.be.empty
            expect(this.node.breadcrumb().length).to.equal(2)
        })

        it('should have first breadcrumb entry name to "entry 2"', () => {
            let breadcrumb = this.node.breadcrumb()
            expect(breadcrumb[0].name).to.equal('entry 2')
        })

        it('should have root node', () => {
            let root = this.node.rootNode()
            expect(root).not.to.be.null
            expect(root.getId()).to.equal(this.node.getRootId())
            expect(root.getParentId()).to.be.null
            expect(root.parentNode()).to.be.null
        })

    })
})