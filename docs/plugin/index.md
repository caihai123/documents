---
title: 收藏夹
description : 主要用来记录平时用到或看见的一些插件/模块/组件等。。。
---
## 介绍
这是一大堆介绍。。。。

## 插件
+ [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable) 一个vue拖动组件
+ [primjs](https://github.com/PrismJS/prism) 让页面支持代码高亮
+ [nprogress](https://github.com/rstacruz/nprogress) 很多网站都在用的进度条插件。
+ [pinyin](https://github.com/hotoo/pinyin) 汉字拼音转换工具。
+ [vue-fragment](https://github.com/y-nk/vue-fragment) a very candide fragment component for Vue.js
+ [mockjs](http://mockjs.com/) 生成随机数据，拦截 Ajax 请求
::: details 点击查看代码
```javascript
{
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    "list|1-10": [
        {
            "id|+1": 1,// 属性 id 是一个自增数，起始值为 1，每次增 1
            "name1|3": '字',//生成由‘字’循环3次的字符串
            "name2|2-3": '字',//生成由‘字’循环的字符串，循环次数大于等于2，小于等于3
            'code|100000-999999': 1,//生成一个大于等于100000，小于等于999999的整数
            'value1|10-99.3-5': 1,//生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。
            'value2|10.3': 1,//生成一个浮点数，整数部分是10，小数部分保留到3位。
            'boolean1|1': true,//生成一个boolean值，ture 与 false 的概率都是1/2,
            'boolean2|1-2': false,//随机生成一个布尔值，值为 false 的概率是 1 / (1 + 2)，值为 true 的概率是 2 / (1 + 2)。
            'obj1|1': { '1': 1, '2': 2 },//生成一个对象，对象的key/value是从后面的对象中选出的一个
            'obj2|1-3': { '1': 1, '2': 2, '3': 3, '4': 4 },//生成一个对象，对象的key/value是从后面的对象中选出的1到3个
            'string|1': ['1', '2', , '3', '4'],//从数组中随机选取 1 个元素，作为最终值。
            'string1|+1': ['1', '2', '3', '4'],//从数组中顺序选取 1 个元素，作为最终值。
            'string2|2': ['1', '2', '3', '4'],//通过重复属性值数组生成一个新数组，重复次数为2。
            'string3|1-2': ['1', '2', '3', '4'],//通过重复属性值数组生成一个新数组，重复次数大于等于1，小于等于2。
            'text': function () {//执行函数 function，取其返回值作为最终的属性值，函数的上下文为属性 'name' 所在的对象。
                return `${this.id}${this.name1}`
            },
            'text1': '@id@name1',//占位符 会优先引用 数据模板 中的属性。
        }
    ],
    //以下的是插件默认的占位符
    'boolean': '@boolean',//随机boolean类型
    'natural': "@natural",//返回一个随机的自然数（大于等于 0 的整数）。参数 min：可选。指示随机自然数的最小值。默认值为 0。 参数 max：可选。指示随机自然数的最小值。默认值为 9007199254740992。
    'integer': "@integer",//返回一个随机的整数。参数 min：可选。指示随机整数的最小值。默认值为 -9007199254740992。参数 max：可选。指示随机整数的最大值。默认值为 9007199254740992。
    'float': "@float",//返回一个随机的浮点数。参数 min：可选。整数部分的最小值。默认值为 -9007199254740992。参数 max：可选。整数部分的最大值。默认值为 9007199254740992。参数 dmin：可选。小数部分位数的最小值。默认值为 0。参数 dmin：可选。小数部分位数的最大值。默认值为 17。
    'character': "@character",//返回一个随机字符。参数 pool：可选。字符串。表示字符池，将从中选择一个字符返回。
    'string': "@string",//返回一个随机字符串。参数 pool：可选。字符串。表示字符池，将从中选择一个字符返回。参数 min：可选。随机字符串的最小长度。默认值为 3。 参数 max：可选。随机字符串的最大长度。默认值为 7。
    'range': "@range(10)",//返回一个整型数组。参数 start：必选。数组中整数的起始值。 参数 stop：可选。数组中整数的结束值（不包含在返回值中）。 参数 step：可选。数组中整数之间的步长。默认值为 1。
    'date': "@date",//返回一个随机的日期字符串。
    'time': "@time",//返回一个随机的时间字符串。
    'datetime': "@datetime",//返回一个随机的日期和时间字符串。
    'now': "@now",//返回当前的日期和时间字符串。
    'Image': "@Image",//图片地址
    'dataImage': "@dataImage",//图片base64
    'Color': "@Color",//十六进制颜色码
    'paragraph': '@paragraph',//随机生成一段文本。参数 len：可选。指示文本中句子的个数。默认值为 3 到 7 之间的随机数。参数 min：可选。指示文本中句子的最小个数。默认值为 3。参数 max：可选。指示文本中句子的最大个数。默认值为 7。
    'cparagraph': '@cparagraph',//一段中文段落
    'sentence': '@sentence',//随机生成一个句子，第一个的单词的首字母大写。参数 len：可选。指示句子中单词的个数。默认值为 12 到 18 之间的随机数。参数 min：可选。指示句子中单词的最小个数。默认值为 12。参数 max：可选。指示句子中单词的最大个数。默认值为 18。
    'csentence': '@csentence',//中文的一句话
    'word': '@word',//
    'title': '@title',//英文标题
    'ctitle': '@ctitle',//中文标题
    'cword': '@cword',//中文的一个字

    'first': '@first',//英文名字的 名
    'last': '@last',//英文名字的 姓
    'name': '@name',//英文名字
    'cfirst': '@cfirst',//中文名字的 姓
    'clast': '@clast',//中文名字的 名
    'cname': '@cname',//随机生成一个常见的中文姓名。参数 count：可选。数字。指示姓名的字数，默认为 2 个或 3 个字的随机姓名。

    'url': '@url',//随机生成一个 URL。
    'domain': '@domain',//随机生成一个域名。
    'email': '@email',//随机生成一个邮件地址。
    'ip': '@ip',//随机生成一个 IP 地址。
    'tld': '@tld',//随机生成一个顶级域名。
    'county': '@county',//随机生成的地理位置一般为县或者区（带参数 true 的话生成省市区）
    'region': '@region',//随机生成一个（中国）大区。
    'capitalize': '@capitalize(caihai)',//把字符串的第一个字母转换为大写。
    'upper': '@upper(caihai)',//把字符串转换为大写。
    'lower': '@lower(CAIHAI)',//把字符串转换为小写。
    'pick': "@pick(['a', 'e', 'i', 'o', 'u'])",//从数组中随机选取一个元素，并返回。
    'shuffle': "@shuffle(['a', 'e', 'i', 'o', 'u'])",//打乱数组中元素的顺序，并返回。
    'guid': '@guid',//唯一标识
    'id': '@id',//随机生成一个 18 位身份证。
}
```
:::
+ [fullPage](https://alvarotrigo.com/fullPage/zh/) 一个简单易用的库，用于创建全屏滚动网站（也称为单页网站或一页网站）。
::: details 点击查看代码
```js
new fullpage("#fullpage", {
      controlArrows: true, //（默认为 true）确定是否将 slide 的控制箭头向右或向左移动。
      verticalCentered: true, //（默认为true）在 section 内部垂直居中。
      scrollingSpeed: 700, //（默认 700 ）滚动转换的速度（以毫秒为单位）。
      sectionsColor: ["#ff5f45", "#0798ec", "#fc6c7c", "grey", "#0798ec"], //为每个 section 定义 CSS background-color 属性。
      keyboardScrolling: true, //（默认为 true ）定义是否可以使用键盘进行内容滑动。
      anchors: [], //（默认[]）定义要在每个 section 的 URL 上显示的锚链接（#example）。
      loopTop: false, //设置为true之后在第一屏向上滚动会去到最后一页
      loopBottom: false, //设置为true之后在最后一屏向下滚动会回到首页
      scrollBar: true, //（默认 false ）确定是否使用站点的滚动条。 在使用滚动条的情况下，autoScrolling 功能仍将按预期工作。 用户也可以使用滚动条自由滚动网站，当滚动完成时，fullPage.js 将适配屏幕上的部分。
      fitToSectionDelay: 300, //（默认 1000 ）。 如果 fitToSection 设置为 true ，则延迟 以毫秒为单位进行拟合。
      paddingTop: 0, //定义每个 section 的内边距( top )。
      paddingBottom: 0, //（默认为 0 ）定义每个 section 的内边距( bottom )。 有利于有固定页脚的情况。
      navigation: true, //（默认 false ）如果设置为 true ，则会显示一个由小圆圈组成的导航栏。
      navigationPosition: "right", //可以设置为 left 或 right ，并定义导航栏显示的位置（如果使用的话）。
      slidesNavigation: true, //是否显示横向滚动的小圆点
      slidesNavPosition: "bottom", //（默认bottom）定义滑块的横向导航栏的位置。 值为 top 和 bottom 。 您可能需要修改 CSS 样式以确定从顶部或底部距离以及任何其他样式（如颜色）。
      continuousVertical: false, //开启后上下滚动可无限循环
      loopHorizontal: true, //定义水平滑块是否在到达上一张或下一张后循环。
      normalScrollElements: ".scrollable-content" //在这个dom上滚动鼠标不会导致切屏
    });
```
:::
+ [clipboard.js](http://www.clipboardjs.cn/) 复制文本
+ [throttle-debounce](https://www.npmjs.com/package/throttle-debounce) 防抖动与节流
+ [screenfull.js](https://github.com/sindresorhus/screenfull.js) 浏览器全屏插件
+ [animate.css](https://daneden.github.io/animate.css/) 最有名的css动画效果库
+ [wow.js](https://www.npmjs.com/package/wow.js) 向下滚动页面时显示CSS动画。默认情况下，您可以使用它来触发animate.css动画。
+ [aos](https://www.npmjs.com/package/aos) 在滚动时为页面上的元素设置动画。
+ [scroll-out](https://github.com/scroll-out/scroll-out) 滚动效果（滚动视差）的框架，框架大小不到 1KB,使用回调的方式将相关动画元素的属性进行实时分配
+ [ESLint](https://eslint.bootcss.com/) ESLint中文文档
+ [prettier](https://prettier.io/) 代码格式化工具
+ [CountUp.js](https://inorganik.github.io/countUp.js/) CountUp.js是一个无依赖项的轻量级JavaScript类，可用于快速创建以更有趣的方式显示数字数据的动画。
+ [Swiper](https://www.swiper.com.cn/) 开源、免费、强大的触摸滑动插件
+ [lodashjs](https://www.lodashjs.com/) 前端工具函数集合
+ [element-resize-detector](https://www.npmjs.com/package/element-resize-detector) 可以检测dom元素大小改变，不仅仅是浏览器宽度改变
+ [vue-fragment](https://github.com/Thunberg087/vue-fragment#readme) 虚拟根节点
+ [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock) 解决滚动穿透问题

### VS Code
+ [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) 自动重命名 html 标签，如修改\<a>为\<b>，将自动修改结尾标签\</a>为\</b>
+ [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) VS Code的Vue工具
+ [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) 查看git历史记录
## 框架
+ [vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/) 大神提供一个后台前端解决方案，它基于 vue 和 element-ui实现。
+ [nuxt](https://www.nuxtjs.cn/) 一个基于 Vue.js 的服务端渲染应用框架
+ [vant](https://youzan.github.io/vant/#/zh-CN/) 轻量、可靠的移动端 Vue 组件库
+ [vuetify](https://vuetifyjs.com/) 一款尤大推荐的 Vue 组件库
+ [element-ui](https://element.eleme.cn/#/zh-CN) 饿了么前端推出的基于 Vue.js 2.0 的后台组件库
+ [iView](http://v1.iviewui.com/) iView 是一套基于 Vue.js 的开源 UI 组件库，主要服务于 PC 界面的中后台产品。
+ [uni-app](https://uniapp.dcloud.io/) 一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、H5、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉）等多个平台。
+ [WeUI](https://github.com/Tencent/weui) 一套同微信原生视觉体验一致的基础样式库
+ [Ant Design Vue](https://www.antdv.com/docs/vue/introduce-cn/)  [Ant Design](https://ant.design/index-cn) 的 Vue 实现，开发和服务于企业级后台产品。

## 网站
+ [Travis CI](https://travis-ci.org/) 免费开源项目构建服务器
+ [awesome-bookmarks](https://panjiachen.github.io/awesome-bookmarks/) 大神的收藏夹
+ [www.templatesy.com](http://www.templatesy.com/) 网页模板
+ [www.mituo.cn](https://www.mituo.cn/) 米拓建站
+ [https://zhuanlan.zhihu.com/p/75531199](https://zhuanlan.zhihu.com/p/75531199) 深入理解 ESLint
+ [https://juejin.im/post/5b27a326e51d45588a7dac57](https://juejin.im/post/5b27a326e51d45588a7dac57) 使用ESLint+Prettier来统一前端代码风格
+ [https://juejin.im/post/5e7c08bde51d455c4c66ddad](https://juejin.im/post/5e7c08bde51d455c4c66ddad) 写给初中级前端的高级进阶指南
+ [https://docsmall.com/](https://docsmall.com/) 免费在线图片压缩、GIF压缩工具、PDF压缩工具、PDF合并工具、PDF分割工具
+ [http://idea.medeming.com/jets/](http://idea.medeming.com/jets/) idea激活码