const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
        rules: [
            {
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['es2015', 'stage-0'] }
                },
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}

module.exports = config