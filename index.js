const {isNode} = require('./src/utils')
const Nested = require('./src/Nested')

if (isNode()) module.exports = Nested
else throw new Error('[Fatal Error] NestedJS - No valid context found')
