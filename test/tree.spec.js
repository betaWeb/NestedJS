const expect = require('chai').expect
const {clearContext, getContext} = require('../src/utils')
const NestedJS = require('../index')
const collection = require('./collection')

clearContext()

let tree = new NestedJS(collection)
let nodes = tree.retrieveNodesBy('name', 'entry 23')
node = nodes[0]

let parentNode = node.parentNode()
let parentPreviousNode = parentNode.previousNode()
let previousNode = node.previousNode()
let nextNode = node.nextNode()

describe('NestedJS', () => {

    after(() => process.exit(0))

    describe('Tree', () => {

        it('should have build collection tree', () => {
            expect(tree).to.have.property('data')
            expect(tree.data).to.not.be.empty
        })

        it('should have 17 entries on the tree', () => expect(tree.getTreeSize()).to.equal(17))

        it('should have uniqueid', () => expect(tree.getUniqueId()).to.not.be.null)

        it('should have stocked context', () => {
            let context = getContext(tree.getUniqueId())
            expect(context).to.not.be.null
            expect(context).to.not.be.empty
            expect(context.getUniqueId()).to.equal(tree.getUniqueId())
        })

        it('should retrieve depth 1 nodes', () => {
            let nodes = tree.retrieveNodesByDepth(1)
            expect(nodes).not.to.be.empty
            expect(nodes.length).to.equal(7)
        })

        it('should retrieve depth 2 nodes', () => {
            let nodes = tree.retrieveNodesByDepth(2)
            expect(nodes).not.to.be.empty
            expect(nodes.length).to.equal(6)
        })

        it('should not retrieve depth 4 nodes', () => {
            let nodes = tree.retrieveNodesByDepth(4)
            expect(nodes).to.be.empty
        })
    })

    describe('Node', () => {

        it('should have node with property name as "entry 23"', () => {
            expect(nodes).to.not.be.empty
            expect(node.name).to.equal('entry 23')
        })

        it('should have child nodes', () => expect(node.hasChildNodes()).to.be.true)

        it('should have previous node named "entry 22"', () => {
            expect(previousNode).to.not.be.null
            expect(previousNode.name).to.equal('entry 22')
        })

        it('should not have next node', () => expect(nextNode).to.be.null)

        it('should have parent node named "entry 2"', () => {
            expect(parentNode).to.not.be.null
            expect(parentNode.name).to.equal('entry 2')
        })

        it('should have parent previous node named "entry 1"', () => {
            expect(parentPreviousNode).to.not.be.null
            expect(parentPreviousNode.name).to.equal('entry 1')
        })

        it('should have a 2 entries breadcrumb', () => {
            expect(node.breadcrumb()).to.not.be.empty
            expect(node.breadcrumb().length).to.equal(2)
        })

        it('should have first breadcrumb entry name to "entry 2"', () => {
            let breadcrumb = node.breadcrumb()
            expect(breadcrumb[0].name).to.equal('entry 2')
        })

        it('should have root node', () => {
            let root = node.rootNode()
            expect(root).not.to.be.null
            expect(root.getId()).to.equal(node.getRootId())
            expect(root.getParentId()).to.be.null
            expect(root.parentNode()).to.be.null
        })

    })
})