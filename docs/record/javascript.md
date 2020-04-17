---
title: javascript
description : 这里会记录一些js的常用代码块
---

## 获取地址栏参数
``` js
// 将参数封装成对象
function allUrlParam() {
    var url = decodeURI(location.search);
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var strs = url.substr(1).split("&");
        for (var i = 0; i < strs.length; i++) {
            var param = strs[i].split("=")[1];
            if (param) {
                theRequest[strs[i].split("=")[0]] = unescape(param);
            }
        }
    }
    return theRequest;
};
```
## js复制
``` js
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
```
源码链接：
[https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript/](https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript/)

或者可以看看：[clipboard.js](http://www.clipboardjs.cn/)

## 防抖动与节流
+ [throttle-debounce](https://github.com/niksy/throttle-debounce)
``` javascript
import { throttle, debounce } from 'throttle-debounce';
```
+ [lodashjs](https://www.lodashjs.com/)
  - 防抖动 [_.debounce](https://www.lodashjs.com/docs/latest#_debouncefunc-wait0-options)
  - 节流 [_.throttle](https://www.lodashjs.com/docs/latest#_throttlefunc-wait0-options)
## 将字符串的的首字母大写
``` js
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
// 示例：
capitalizeEveryWord('hello world!'); // 'Hello World!'
```
## 检查数组中的所有元素是否相等
``` js
const allEqual = arr => arr.every(val => val === arr[0]);
// 示例：
allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
```
## 判断字符串是否是url
``` js
const isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str);
// 示例：
isAbsoluteURL('https://google.com'); // true
isAbsoluteURL('ftp://www.myserver.net'); // true
isAbsoluteURL('/foo/bar'); // false
```
## 转换驼峰字符串
``` js
const fromCamelCase = (str, separator = '_') =>
  str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase();
// 示例：
fromCamelCase('someDatabaseFieldName', ' '); // 'some database field name'
fromCamelCase('someLabelThatNeedsToBeCamelized', '-'); // 'some-label-that-needs-to-be-camelized'
fromCamelCase('someJavascriptProperty', '_'); // 'some_javascript_property'
```

## 防止网页被嵌入框架
``` js
try{
　　top.location.hostname;
　　if (top.location.hostname != window.location.hostname) {
　　　　top.location.href =window.location.href;
　　}
}
catch(e){
　　top.location.href = window.location.href;
}
```
> 参考链接：[防止网页被嵌入框架的代码-阮一峰](http://www.ruanyifeng.com/blog/2010/08/anti-frameset_javascript_codes_continued.html)

## 网页鼠标点击特效（爱心）
<<< @/docs/.vuepress/public/static/js/clicklove.js

## js异步集合处理
```js
// utility function for sleeping
const sleep = (n) => new Promise((res) => setTimeout(res, n));
```
### 如何在Javascript中将异步函数与Array.reduce一起使用
> 参考链接：[如何在Javascript中将异步函数与Array.reduce一起使用](https://advancedweb.hu/how-to-use-async-functions-with-array-reduce-in-javascript/)
```js
const arr = [1, 2, 3];

const asyncRes = await arr.reduce(async (memo, e) => {
	await sleep(10);
	return (await memo) + e;
}, 0);

console.log(asyncRes);
// 6
```
### 如何在Javascript中对Array.map使用异步函数
> 参考链接：[如何在Javascript中对Array.map使用异步函数](https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/)
```js
const arr = [1, 2, 3];

const asyncRes = await Promise.all(arr.map(async (i) => {
	await sleep(10);
	return i + 1;
}));

console.log(asyncRes);
// 2,3,4
```
### 如何在Javascript中对Array.forEach使用异步函数
> 参考链接：[如何在Javascript中对Array.forEach使用异步函数](https://advancedweb.hu/how-to-use-async-functions-with-array-foreach-in-javascript/)
``` js
const arr = [1, 2, 3];

await Promise.all(arr.map(async (i) => {
	await sleep(10 - i);
	console.log(i);
}));

// 3
// 2
// 1

console.log("Finished async");
// Finished async
```
### 如何在Javascript中将异步函数与Array.filter一起使用
> 参考链接：[如何在Javascript中将异步函数与Array.filter一起使用](https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/)
```js
const arr = [1, 2, 3, 4, 5];

const asyncFilter = async (arr, predicate) => {
	const results = await Promise.all(arr.map(predicate));
	return arr.filter((_v, index) => results[index]);
}

const asyncRes = await asyncFilter(arr, async (i) => {
	await sleep(10);
	return i % 2 === 0;
});

console.log(asyncRes);
```