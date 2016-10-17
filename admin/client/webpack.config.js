var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        'user': path.join(__dirname,'modules/user.js'),
        'tag': path.join(__dirname,'modules/tag.js'),
        'design': path.join(__dirname,'modules/design.js'),
        'product': path.join(__dirname,'modules/product.js'),
        'canvas': path.join(__dirname, 'modules/canvas.js'),
        'facebook': path.join(__dirname, 'modules/facebook.js')
    },
    output: {
        path: '../../main/themes/public/',
        publicPath: '/public/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            }
        ]
    },
    resolve: {
        root: path.join(__dirname, 'client/working'),
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    plugins: [
        /*new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false },
          comments: false,
          sourceMap: false,
          mangle: true,
          minimize: true
        })*/
    ]
}