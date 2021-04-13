const path = require('path');
module.exports = {
  module : {
    rules : [
      {
        test : /\.vue$/,
        use : 'vue-loader',
        exclude : /node_modules/
      },
      {
        test : /\.js$/,
        use : 'babel-loader',
        exclude : /node_modules/
      },
      {
        test : /\.(sa|sc|c)ss$/,
        use : ['style-loader' , 'css-loader' , 'postcss-loader' , 'sass-loader'],
        exclude : /node_modules/
      },
      {
        test : /\.less$/,
        use : ['style-loader' , 'css-loader' , 'postcss-loader' , 'less-loader'],
        exclude : /node_modules/
      },
      {
        test : /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use : 'file-loader',
        exclude : /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader : 'file-loader',
        exclude : /node_modules/,
        options: {
            esModule: false,
        }
      },
    ]
  }
}