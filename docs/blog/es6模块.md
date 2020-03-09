---
title:  "export与import(ES6 module模快)"
date:   "2019-08-18"
categories: javascript ES6
keywords: "这个是篇关键字"
---

在前端开发中，相信很多人都听过模块化，组件化等名词，我的理解：一个前端项目，可以拆分成很多小文件，每个文件都是一个独立的部分可以单独维护，然后再将这些文件拼装起来，vue的单文件组件就是一个活生生的例子。

先看一段代码，
``` html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="lodash.js"></script>
    <script>
        //util.js
        function a(){
            console.log('执行了a函数')
        }
        function b(){
            console.log('执行了b函数')
        }
    </script>
</head>
<body>
    <div id="web">
        {{value}}
    </div>
    <script>
        new Vue({
            el:"#web",
            data:function(){
                return {
                    value:"一个案例"
                }
            },
            created:function(){
                axios.get("https://caihai123.github.io/applet/jsons/capitalize.json").then(function(value){
                    console.log(value.data)
                })
                a();
            }
        })
    </script>
</body>
</html>
```
这应该是我们最熟悉的结构了，它所有js文件都处于一个平行的状态，每个js文件可以都可以互相使用对方定义的全局变量（函数也是变量 吧），其实这也还好，平时我们使用的工具库一般都只会定义一个全局变量，如jquery的‘$（对象）’,vue的‘Vue（构造函数）’，lodash的‘_’，只要我们平时注意点就行了。我觉得最大的问题就是当我们在一个页面同时引入很多js文件的时候，我们就会很懵逼，很难找出来哪个文件的js使用了别的文件js的变量，这就给后期的维护带来很大的压力。所以才出现了模块的概念，使得js文件可以轻易引用另外一个js文件的变量，而且不会污染全局变量。

## 基本语法
模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。举几个栗子:
### 示例一：
``` js
    // uitl.js
    function a(){
        console.log('执行了函数a')
    }
    function b(){
        console.log('执行了函数b')
    }
    var c = '蔡海';
    console.log(this);//undefined
    export {a,b,c}
```
    
``` js
    // main.js
    import {a} from './uitl.js'
    a();//执行了函数a
```
这是最基本的语法了，通过export导出，import导入,需要知道的是模块中最顶层的this为undefined，重复引入同一个模块，模块只会执行一次。
### 示例二：
``` js
    // uitl.js
     function a(){
        console.log('执行了函数a')
    }
    function b(){
        console.log('执行了函数b')
    }
    var c = '蔡海';
    export default {
        a,b
    }
```
``` js
    // main.js
    import uitl from './uitl.js'
    uitl.a();//执行了函数a
    uitl.b();//执行了函数b
 ```
可通过default定义一个默认导出，引入的时候不必单独指定，一个模块只能有一个默认导出。
### 示例三：
``` js
    // uitl.js
    import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'
    function a(){
        console.log('执行了函数a')
    }
    Vue.filter('capitalize', function (value) {
        
    })
```
``` js
    // main.js
    import './uitl.js'
```
有些模块也许没有进行任何导出，相反只是修改全局作用域的对象。尽管这种模块的顶级变量，函数或类最终并不会自动加入全局作用域，但这并不意味着该模块无法访问全局作用域。示例就是定义一个vue的全局过滤器。而a函数，毫无卵用，等于没写。
## 基本特点
    + 每一个模块只加载一次， 每一个JS只执行一次， 如果下次再去加载同目录下同文件，直接从内存中读取。 一个模块就是一个单例，或者说就是一个对象；
    + 每一个模块内声明的变量都是局部变量， 不会污染全局作用域；
    + 模块内部的变量或者函数可以通过export导出；
    + 一个模块可以导入别的模块

## 使用案例
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="web">
        {{value}}
    </div>
    <script type="module">
        import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'
        //import 'https://unpkg.com/axios/dist/axios.min.js'
        import {a} from './static/js/util.js'
        new Vue({
            el:"#web",
            data:function(){
                return {
                    value:"一个案例"
                }
            },
            created:function(){
                // axios.get("https://caihai123.github.io/applet/jsons/capitalize.json").then(function(value){
                //     console.log(value.data)
                // })
                a()
            }
        })
    </script>
</body>
</html>
```
需要知道的有几个地方
+ 在html引入模块时，必须将type属性设置为module，意思就是告诉浏览器它是一个模块。
+ 这个项目需要启动一个HTTP服务器来访问，以 file:// 协议直接打开是不行的。
+ 不要看见我的示例三就以为所有js文件都能引入进来，我在使用案例中将axios注释掉就是说明这样是不行，原因是这个js是通过this将axios对象定义在全局的，这样引入就等于告诉浏览器它是个模块，模块中最顶层的this为undefined，如果你真要引入，就去它官网看看它有没有提供这种原生module的文件，就像我引入的vue一样，它有给我说这个<img src="/static/img/vuebrowser.png"  height="216" width="884">,如果没有也可以自己手动修改一下，但不建议这么做，怕改出问题。
## 与CommonJS模块的区别
 ES6模块和CommonJS模块虽然很像，但他们不是一个东西，CommonJS是用于node环境也就是服务器端的，而ES6模块是浏览器，服务器通用。顺便分享一下他们的教程，这两个大神写的，应该不会有异议吧。
+ module模块  [http://es6.ruanyifeng.com/#docs/module](http://es6.ruanyifeng.com/#docs/module) 阮一峰
+ CommonJS模块    [https://www.liaoxuefeng.com/wiki/1022910821149312/1023027697415616](https://www.liaoxuefeng.com/wiki/1022910821149312/1023027697415616) 廖雪峰

## 总结
这种原生module的开发看起来很好，但可能是兼容性原因，也可能是技术发展的原因，很多js工具都没有提供这种js模块，大多只是告诉我们使用npm下载，让我们在nodejs的环境下开发。我们也不要纠结太多，他说怎么来我们就怎么来。