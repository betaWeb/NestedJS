const libraryName = 'Nested'
const outputFile = `${libraryName}.min.js`

const config = {
    entry: __dirname + '/index.js',
    output: {
        path: __dirname + '/build',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
}

module.exports = config