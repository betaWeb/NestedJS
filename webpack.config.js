const config = {
    entry: {
        'Nested': __dirname + '/index.js',
        'main': __dirname + '/public/js/main.js'
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].min.js',
        library: '[name]',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    }
}

module.exports = config