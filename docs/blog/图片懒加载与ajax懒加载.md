---
title:  "图片懒加载和ajax懒加载"
date:    "2019-08-03"
description: "这个是篇关键字"
---

上周遇到一个功能，在一片可滚动区域，需要实现dom里面内容的懒加载，也就是当滚动到某个（或多个）div的时候，执行异步请求，获取这个div需要的数据，再将这个div的完整样式渲染出来，在此之前这个div只有一些基本数据。因为以前也做过图片的懒加载，所以当时还觉得应该不是很复杂，可是后面仔细想想却发现要考虑的东西完全比做图片的多，百度一下也大多只有图片的懒加载，只能趁着周末自己研究了一下，总算是找到了一种方案，在此记录一下。

## 图片的懒加载
在之前先记录一下图片的懒加载，网上代码也是一大推，但是基本思路都差不多，就是我们在写html的时候，将需要懒加载的img的src属性留为空或用一张默认图片地址，然后在img上添加一个属性，如：‘data-src’保存img真正的图片地址，最后在可滚动的容器上添加onscroll事件，当容器滚动的时候执行onscroll上的函数，通过一些计算找到当前能被用户观测到的img，然后将这些img的data-src属性值加到src上，这样就能实现图片的懒加载了，完整示例代码如下：

``` html
<!DOCTYPE html>
<head>
    <head>
        <title>图片懒加载</title>
        <style>
            #container{width: 1200px;height:650px;margin: 0 auto;overflow: auto;background-color: #4183c4;}
            img{width: 200px;height: 150px;}
        </style>
    </head>
    <html>
       <div id="container">
           <ul>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/news_teaser.png"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/preview_teaser.png"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/car_teaser.gif"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/artboard_38_teaser.png"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/messi-video_teaser.png"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/stock_app_ui_design_light_tubik_teaser.png"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/learning.png"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/swtich.gif"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/goa_teaser.jpg"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/block-tube.png"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/148.2.pre.png"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/ro_2x_teaser.png"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/portals_10-09.png"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/screen-shot.jpg"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/race_animation.png"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/dz_xn3lw0aiyrt6.jpg"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/news_teaser.png"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/preview_teaser.png"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/car_teaser.gif"/></li>
               <li><img src="" data-src="https://caihai123.github.io/Dribbble/lists/portals_10-09.png"/></li>
           </ul>
       </div>
       <script>
            var img = document.getElementsByTagName("img");//我这里是获取的所有img，因为我所有img都需要懒加载
            var len = img.length;
            var container = document.getElementById("container");
            var lazyLoad = function(){
                var seeHeight = 800;//获取容器的高度，在本例中我的容器高度已固定为800px
                var scrollTop = container.scrollTop;//获取滚动条距离顶部的距离
                for (var i = 0; i < len; i ++) {
                    if (img[i].offsetTop < seeHeight + scrollTop) {
                        //这里的逻辑判断得注意，写的比较简单是因为本例中滚动条只能上下滚动而且初始化的时候就在最顶部（一般都是这样），也没有限制lazyLoad执行频率，当滚动条从上面滚动到下面的时候，所有img都会加载，所以才只使用了offsetTop做判断
                        var src = img[i].getAttribute("src");
                        var dataSrc = img[i].getAttribute("data-src");
                        if (src != dataSrc) {
                            img[i].src = dataSrc;
                        }
                    }
                }
            }
            lazyLoad();
            container.addEventListener('scroll', lazyLoad, false);
       </script>
    </html>
</head>
```
## ajax的懒加载
现在来说今天的主角，因为我们项目是用vue做的，所以我的示例也是。原理呢和上面图片的懒加载一样，只是多了点需要考虑的东西；上面的代码中，因为它是图片，当它的src属性里的地址改变后，他会自动发起请求去获取这张图片，然后在自己身上渲染出来；但是在我的项目中，所有div都是通过一个lists数据渲染出来的，每个div会渲染成什么样取决于它在lists中的数据是否完整，所以我要想实现懒加载的功能，不仅需要找到当前dom元素，还要找到dom元素在lists中对应的元素，判断他是否完整，如果不完整，通过ajax去请求数据，然后再添加到该元素的数据中。

然后说一下解决办法：在上面的代码中，我们可以通过添加一个属性data-src来存放我们得图片地址，所以我们也可以用它来存点别的，比如我们每个div请求时需要的参数（id），但是我们请求的结果最终是添加到lists中的哪个元素上呢，所以我们还需要将div在list中的索引也存上去，这样当请求结果返回的时候，我们就知道这些数据该添加到添加到哪里了，只要数据添加对了，vue的特性自然会将数据在div上渲染出来，下面是示例代码：
``` vue
<template>
    <div class='container'>
        <el-card v-for="(list,index) in lists" :key="index" class='card' :data-id='list.id' :data-index='index' :data-sign='list.sign' v-loading="list.loading">
            <div slot="header">
                <span>{list.table}</span>
            </div>
            <div class='card-main'>
                <span>{list.name}</span>
                <span>{list.age}</span>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name:"lazyLoad",
        data:function(){
            return {
                lists:[
                    {
                        table:"第1个",//原始数据
                        id:"1", //原始数据，需要用它去获取完整数据
                        name:"",//完整数据中的name，还没有获取的数据
                        age:"",//完整数据中的age，还没有获取的数据
                        sign:"0",//标记，用来判断是否已经获取到完整数据
                        loading:false//加载数据时显示动效
                    },
                    {table:"第2个",id:"2", name:"",age:"",sign:"0",loading:false},
                    {table:"第3个",id:"3", name:"",age:"",sign:"0",loading:false},
                    {table:"第4个",id:"4", name:"",age:"",sign:"0",loading:false},
                    {table:"第5个",id:"5", name:"",age:"",sign:"0",loading:false},
                    {table:"第6个",id:"6", name:"",age:"",sign:"0",loading:false},
                    {table:"第7个",id:"7", name:"",age:"",sign:"0",loading:false},
                    {table:"第8个",id:"8", name:"",age:"",sign:"0",loading:false},
                    {table:"第9个",id:"9", name:"",age:"",sign:"0",loading:false},
                    {table:"第10个",id:"10", name:"",age:"",sign:"0",loading:false},
                    {table:"第11个",id:"11", name:"",age:"",sign:"0",loading:false},
                    {table:"第12个",id:"12", name:"",age:"",sign:"0",loading:false},
                    {table:"第13个",id:"13", name:"",age:"",sign:"0",loading:false},
                    {table:"第14个",id:"14", name:"",age:"",sign:"0",loading:false},
                    {table:"第15个",id:"15", name:"",age:"",sign:"0",loading:false},
                    {table:"第16个",id:"16", name:"",age:"",sign:"0",loading:false},
                    {table:"第17个",id:"17", name:"",age:"",sign:"0",loading:false},
                    {table:"第18个",id:"18", name:"",age:"",sign:"0",loading:false},
                    {table:"第19个",id:"19", name:"",age:"",sign:"0",loading:false},
                    {table:"第20个",id:"20", name:"",age:"",sign:"0",loading:false},
                    {table:"第21个",id:"21", name:"",age:"",sign:"0",loading:false},
                    {table:"第22个",id:"22", name:"",age:"",sign:"0",loading:false},
                    {table:"第23个",id:"23", name:"",age:"",sign:"0",loading:false},
                    {table:"第24个",id:"24", name:"",age:"",sign:"0",loading:false},
                    ]
            }
        },
        mounted:function(){
            let _ = require('lodash');
            this.lazyLoad();
            document.getElementsByClassName("container")[0].addEventListener('scroll',_.debounce(this.lazyLoad,200), false);
        },
        methods:{
            lazyLoad:function(){
                var container = document.getElementsByClassName("container")[0];
                var cards = document.getElementsByClassName("card");
                var len = cards.length;
                var seeHeight = 650;//获取容器的高度，在本例中我的容器高度已固定为650px
                var scrollTop = container.scrollTop;//获取滚动条距离顶部的距离
                for (var i = 0; i < len; i ++) {
                    if (cards[i].offsetTop < seeHeight + scrollTop && cards[i].offsetTop + 200 > scrollTop) {
                        var sign = cards[i].getAttribute("data-sign");
                        if(sign === '0'){
                            var id = cards[i].getAttribute("data-id");
                            var index = cards[i].getAttribute("data-index");
                            this.simulationAjax(id,index);
                        } 
                    }
                }
            },
            //模拟ajax请求额函数
            simulationAjax:function(id,index){
                var self = this;
                var i = parseInt(index);
                self.lists[i].loading = true;
                setTimeout(function(){
                    //通过id去获取到obj
                    var obj = {
                        name:"蔡海",
                        age:"18"
                    }
                    self.lists[i].name = obj.name;
                    self.lists[i].age = obj.age;
                    self.lists[i].sign = "1";
                    self.lists[i].loading = false;
                },1000) 
            }
        }
    }
</script>
<style scoped>
    .container{
        width: 1200px;
        height: 650px;
        margin: 0 auto;
        overflow: auto;
        display: flex;
        flex-wrap:wrap;
        justify-content:space-around;
    }
    .card{
        width: 350px;
        margin-bottom: 20px;
        background-color: #4183c4;
    }
    .card-main{
        min-height: 100px;
    }
</style>
```
在本例中，有几处模板语法的错误，原因是这个语法和我网站的语法有冲突，所以我少写了一个{}，有时间优化一下，还有就是我给scroll事件添加了debounce函数控制事件执行的频率，不知道这个的可以点击[lodash的debounce仿抖动函数](/blog/lodash的debounce仿抖动函数.html)查看我的另一篇boke。
再见~
