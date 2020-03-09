module.exports = {
    title: 'caihai123',
    description: '个人在线文档',
    base: '/documents/',
    //nav导航栏
    themeConfig: {
        // logo: '/logo.png',
        lastUpdated: '上次更新：',
        smoothScroll: true,
        nav: [
            { text: '博客列表', link: '/blog/' },
            { text: '记录文档', link: '/record/' },
            { text: '插件收藏', link: '/plugin/' },
        ],
        sidebar: {
            '/blog/': [
                {
                    title: '博客列表',// 必填项
                    collapsable: false,//永远都是展开状态
                    children: [
                        '',
                        '图片懒加载与ajax懒加载',
                        '后端返回的long型数据丢失',
                        '网页背景水印代码记录',
                        'lodash的debounce仿抖动函数',
                        'es6模块',
                        'es6构造函数',
                        'javascript原型'
                    ]
                },
            ],
            '/record/': [
                {
                    title: '记录文档',
                    collapsable: false,
                    children: [
                        '',
                        'javascript',
                        'html',
                        'css',
                        'vue'
                    ]
                },
            ],
            '/plugin/': ['']
        }
    }
}