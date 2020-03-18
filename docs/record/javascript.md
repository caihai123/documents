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

## 防抖动函数
``` js
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
// 示例：
window.addEventListener(
  'resize',
  debounce(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
);
```

获取：[https://www.lodashjs.com/docs/latest#_debouncefunc-wait0-options](https://www.lodashjs.com/docs/latest#_debouncefunc-wait0-options)

## 节流函数
``` js
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function() {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};
// 示例：
window.addEventListener(
  'resize',
  throttle(function(evt) {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
);
```
或者：[throttle-debounce](https://github.com/niksy/throttle-debounce) element-ui的Backtop组件有用到

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