---
title: 后端返回的long型数据丢失
data: 2019-08-11
description : 这个当前页面的描述
---
## 问题描述
其实这是一个经典的问题，在js中,整形的最大的值为 Number.MAX_SAFE_INTEGER = 9007199254740991（2的53次方减一），超过这个数值时就有可能出现精度丢失的问题，继而导致如下诡异的语句：
``` js
var num = 9007199254740993;
console.log(num);//9007199254740992
9007199254740993 == 9007199254740992;//true
```
而在我们的后端，long类型可以达到的最大值为：18446744073709551616（2的64次方）。
本来是不相关的两件事，但是如果后端通过ajax将一个long型的数据传到前端，long型的数据成了number，就可能会出现精度丢失，也就是js得到的数据和后端发送的数据不一样。这时候最好也是最应该的方法就是让后端把该字段改为string类型再传过来，在这里给大家看个让我很欣慰的话![Image text](/static/img/liaoxuefeng.png)
但是，凡事都有例外，有时候后端除了给前端页面提供数据之外，还同时给其他系统提供RESTful接口，如果把所有Long类型都序列化为String，可能会导致其他系统出错，这种情况下就不适合在后端修改Long的序列化方式。只能在前端JS中想办法兼容64位long。

## 解决思路
我们知道，ajax其实只是负责传输数据，并不做数据的转换，以json对象为例，真正能将json转换为js对象的是JSON.parse,平时使用的axios，也只是在transformResponse中执行了JSON.parse，代码为证：
``` js
axios.defaults.transformResponse = [function (data) {
    return data;
}];
axios.get('https://caihai123.github.io/applet/jsons/purchase.json').then(function (response) {
    console.log(response.data);//打印出json对象
}).catch(function (error) {
    console.log(error);
});
```
``` js
//或者不写此段代码，如果传输数据是json的话，默认应该就是这样
axios.defaults.transformResponse = [function (data) {
    return JSON.parse(data);
}];
axios.get('https://caihai123.github.io/applet/jsons/purchase.json').then(function (response) {
    console.log(response.data);//打印出javascript对象
}).catch(function (error) {
    console.log(error);
});
```
也就是说，我们前端获取到数据的第一时间，数据精度还没有丢失，因为他还是json（我觉得也可以理解为String了），真正导致精度丢失的是JSON.parse函数将它转换为js对象之后。所以这就给了我们操作的空间。
## 解决方案
其实这才是让人头疼的地方，怎么操作，刚开始我是想自己写一个parse函数，但试了一下，发现对我这个水平来说完全是异想天开，直到发现了这个JISON（[https://github.com/zaach/jison](https://github.com/zaach/jison)），使用方法也可以很简单，以axios示例：
``` html
<!DOCTYPE html>
<html>
    <head>
        <title>JISON示例</title>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="jsonlint.js"></script>
    </head>
    <body>
       <script>
            axios.defaults.transformResponse = [function (data) {
                return jsonlint.parse(data);
            }];
            axios.get('https://caihai123.github.io/applet/jsons/purchase.json').then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
       </script>
    </body>
</html>
```
从服务器端获取的数据经过jsonlint.parse转换为js对象的时候，会对number进行一个简单的判断：
``` js
JSONNumber
    : NUMBER
        {$$ = yytext == String(Number(yytext))? Number(yytext): yytext;}
    ;
```
如果number数据会丢失精度，则将它转换为字符串。
上面的代码我放在[这里](https://github.com/caihai123/JISON)，jsonlint.js也在这里，如果你想直到它是怎么来的，我建议你点击这个[https://blog.csdn.net/fifteen718/article/details/82783246](https://blog.csdn.net/fifteen718/article/details/82783246)，很感谢这位兄弟的分享，解决了我的问题，晚安~