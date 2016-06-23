var path = require('path');

module.exports = {
    entry: {
    	index: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }]
    },
    resolve: {
    	extensions: ['', '.js', '.less']
    }
}
