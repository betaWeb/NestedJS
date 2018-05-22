const expect = require('chai').expect
// const sinon = require('sinon')
const NestedJS = require('../src/Nested')
const collection = require('./collection')

describe('Tree', () => {

    let tree = new NestedJS(collection)

    it('should have transformed collection', () => {
        expect(tree).to.have.property('data')
        expect(tree.data).to.not.be.empty
    })

})