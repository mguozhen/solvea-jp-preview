module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 16, //1rem=16px, 设计稿中html元素字体大小/rootValue=转换后rem值
      unitPrecision: 5, //转换后保留的小数点位数
      propList: [
        '*',
        'margin-left',
        'margin-right',
        'margin',
        'gap',
        '!max-width',
        'row-gap',
        'column-gap',
      ], //需要转换的属性 加!是不需要转换的属性
      mediaQuery: false, // 是否转换 @media 条件中的px
      minPixelValue: 2, // 小于2px不转换，大于等于2px的转换
      exclude: /node_modules/i,
    },
  },
};
