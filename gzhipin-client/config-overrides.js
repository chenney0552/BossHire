const {injectBabelPlugin} = require('react-app-rewired');

const fileLoaderMatcher = function (rule) {
  return rule.loader && rule.loader.indexOf(`file-loader`) != -1;
}

module.exports = function override(config, env) {
  // babel-plugin-import
  config = injectBabelPlugin(['import', {
    libraryName: 'antd-mobile',
    //style: 'css'
    style: true, // 使用 less 进行自定义主题
  }], config);

  // 自定义主题
  config.module.rules[1].oneOf.unshift({
    test: /\.less$/,
    use: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
      {
        loader: require.resolve('postcss-loader'),
        options: {
          // 必须设置以使外部 CSS 导入正常工作
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React 不支持 IE8 及以下版本
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
      {
        loader: require.resolve('less-loader'),
        options: {
          // 主题变量，也可以使用 theme.js 代替
          modifyVars: {
            "@brand-primary": "#1cae82", // 正常
            "@brand-primary-tap": "#1DA57A", // 按下
          },
        },
      },
    ]
  });

  return config;
};