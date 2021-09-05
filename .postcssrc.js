module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75;
            },
            propList: ['*'],

            // 排除不加载的文件
            exclude: 'markdown'
        }
    }
}