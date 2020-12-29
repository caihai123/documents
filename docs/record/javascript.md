---
title: javascript
description : 这里会记录一些js的常用代码块
---

## 获取地址栏参数
::: details 点击查看代码
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
:::
## js复制
::: details 点击查看代码
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
:::
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
## 数组相关函数
|方法|描述|
|:-|:-|
|`concat()`|连接两个或更多的数组，并返回结果。|
|`join()`|把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。|
|`pop()`|删除并返回数组的最后一个元素|
|`push()`|向数组的末尾添加一个或更多元素，并返回新的长度。|
|`reverse()`|颠倒数组中元素的顺序。|
|`shift()`|删除并返回数组的第一个元素|
|`slice()`|选取数组中某部分，不改变原数组|
|`sort()`|对数组的元素进行排序|
|`splice()`|删除或替换数组中某部分，会改变原数组，返回被删除或替换的部分|
|`unshift()`|向数组的开头添加一个或更多元素，并返回新的长度。|
|`split()`|将字符串分割为数组|

### Array.from()
> 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
``` js
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
```
### Array.isArray()<Badge text="常用"/>
> 用于确定传递的值是否是一个 Array。
```js
Array.isArray([1, 2, 3]);  
// true
Array.isArray({foo: 123}); 
// false
Array.isArray("foobar");   
// false
Array.isArray(undefined);  
// false
```
### Array.of() 
> 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
```js
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```
### copyWithin()
> 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。
```js
const array1 = ['a', 'b', 'c', 'd', 'e'];

// copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// expected output: Array ["d", "b", "c", "d", "e"]

// copy to index 1 all elements from index 3 to the end
console.log(array1.copyWithin(1, 3));
// expected output: Array ["d", "d", "e", "d", "e"]
```
::: details 点击查看参数
+ `target`<br/>
0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。<br/>
如果 target 大于等于 `arr.length`，将会不发生拷贝。如果 `target` 在 `start` 之后，复制的序列将被修改以符合 `arr.length`。<br/>
+ `start`<br/>
0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。<br/>
如果 start 被忽略，copyWithin 将会从0开始复制。<br/>
+ `end`<br/>
0 为基底的索引，开始复制元素的结束位置。`copyWithin` 将会拷贝到该位置，但不包括 `end` 这个位置的元素。如果是负数， `end` 将从末尾开始计算。<br/>
如果 `end` 被忽略，`copyWithin` 方法将会一直复制至数组结尾（默认为 `arr.length`）。<br/>
:::
参考链接：[Array.prototype.copyWithin() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)

### entries()
> 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
```js
const array1 = ['a', 'b', 'c'];

const iterator1 = array1.entries();

console.log(iterator1.next().value);
// expected output: Array [0, "a"]

console.log(iterator1.next().value);
// expected output: Array [1, "b"]
```
参考链接：[Array.prototype.entries() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

### every()<Badge text="常用"/>
> 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
::: warning
若收到一个空数组，此方法在一切情况下都会返回`true`。
:::
```js
const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(item => item < 40));
// expected output: true
```
::: details 点击查看参数
+ `callback`<br/>
用来测试每个元素的函数，它可以接收三个参数：<br/>
`element`<br/>
用于测试的当前值。<br/>
`index`可选<br/>
用于测试的当前值的索引。<br/>
`array`可选<br/>
调用 every 的当前数组。<br/>
+ `thisArg`<br/>
执行`callback`时使用的`this`值。
:::
### some() 
> 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
```js
const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// expected output: true
```
### fill()
> 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
```js
const array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]
```
::: details 点击查看参数
+ `value`<br/>
用来填充数组元素的值。<br/>
+ `start` 可选<br/>
起始索引，默认值为0。<br/>
+ `end` 可选<br/>
终止索引，默认值为 `this.length`。<br/>
:::
### filter() <Badge text="常用"/>
> 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
```js
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```
::: details 点击查看参数
+ `callback`<br/>
用来测试数组的每个元素的函数。返回 true 表示该元素通过测试，保留该元素，false 则不保留。它接受以下三个参数：<br/>
`element`<br/>
数组中当前正在处理的元素。<br/>
`index`可选<br/>
正在处理的元素在数组中的索引。<br/>
`array`可选<br/>
调用了 `filter` 的数组本身。<br/>
+ `thisArg`可选<br/>
执行 `callback` 时，用于 `this` 的值。
:::
### find() <Badge text="常用"/>
> 返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
```js
const array1 = [5, 12, 8, 130, 44];

const found = array1.find(element => element > 10);

console.log(found);
// expected output: 12
```
::: tip
另请参见`findIndex()`方法，它返回数组中找到的元素的索引，而不是其值。

如果你需要找到一个元素的位置或者一个元素是否存在于数组中，使用`indexOf()`或 `includes()`。
:::
::: details 点击查看参数
+ `callback`<br/>
在数组每一项上执行的函数，接收 3 个参数：<br/>
`element`<br/>
当前遍历到的元素。<br/>
`index`可选<br/>
当前遍历到的索引。<br/>
`array`可选<br/>
数组本身。<br/>
+ `thisArg`可选<br/>
执行回调时用作this 的对象。
:::
### findIndex()<Badge text="常用"/>
> 返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。
```js
const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// expected output: 3
```
### flat() 
> 会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
```js
var arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
::: details 点击查看参数
`depth` 可选<br/>
指定要提取嵌套数组的结构深度，默认值为 1。
:::
### map() <Badge text="常用"/>
> 创建一个新数组，其结果是该数组中的每个元素都调用一次提供的函数后的返回值。
```js
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```
::: tip
因为`map`生成一个新数组，当你不打算使用返回的新数组却使用`map`是违背设计初衷的，请用`forEach`或者`for-of`替代。你不该使用map: A)你不打算使用返回的新数组，或/且 B) 你没有从回调函数中返回值。
:::
### forEach() <Badge text="常用"/>
> 对数组的每个元素执行一次给定的函数。
```js
const array1 = ['a', 'b', 'c'];

array1.forEach(element => console.log(element));

// expected output: "a"
// expected output: "b"
// expected output: "c"
```
### includes() <Badge text="常用"/>
> 用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
``` js
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// expected output: true

console.log(pets.includes('at'));
// expected output: false
```
### indexOf()
> 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
```js
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// expected output: 1

// start from index 2
console.log(beasts.indexOf('bison', 2));
// expected output: 4

console.log(beasts.indexOf('giraffe'));
// expected output: -1
```
### lastIndexOf() 
> 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。
```js
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.lastIndexOf('Dodo'));
// expected output: 3

console.log(animals.lastIndexOf('Tiger'));
// expected output: 1
```
###  keys() 
> 方法返回一个包含数组中每个索引键的Array Iterator对象。
```js
const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();

for (const key of iterator) {
  console.log(key);
}

// expected output: 0
// expected output: 1
// expected output: 2
```
### values() 
> 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值
```js
const array1 = ['a', 'b', 'c'];
const iterator = array1.values();

for (const value of iterator) {
  console.log(value);
}

// expected output: "a"
// expected output: "b"
// expected output: "c"
```
### reduce() 
> 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
```js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```
### toLocaleString() 
> 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。
```js
const array1 = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
const localeString = array1.toLocaleString('en', { timeZone: 'UTC' });

console.log(localeString);
// expected output: "1,a,12/21/1997, 2:12:00 PM",
// This assumes "en" locale and UTC timezone - your results may vary
```
## 数字格式功能
::: details 点击查看代码
``` js
const formatNumber = function (num, options) {
  var defaults = {
    decimalPlaces: 0,//小数点后数量
    decimal: '.',
    separator: ',',//分组分隔符
    prefix: '',//前缀
    suffix: '',//后缀
    numerals: []
  }
  /**
   * 如果项目中有lodashjs,建议换成_assign()函数
   * https://www.lodashjs.com/docs/lodash.assign
   * */
  var _options = Object.assign(Object.assign({}, defaults), options);
  var neg = (num < 0) ? '-' : '';
  var result, x, x1, x2, x3 = '';
  result = Math.abs(num).toFixed(_options.decimalPlaces);
  result += '';
  x = result.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? _options.decimal + x[1] : '';
  for (var i = 0, len = x1.length; i < len; ++i) {
    if (i !== 0 && (i % 3) === 0) {
      x3 = _options.separator + x3;
    }
    x3 = x1[len - i - 1] + x3;
  }
  x1 = x3;
  // 可选数字替换
  if (_options.numerals && _options.numerals.length) {
    x1 = x1.replace(/[0-9]/g, function (w) { return _options.numerals[+w]; });
    x2 = x2.replace(/[0-9]/g, function (w) { return _options.numerals[+w]; });
  }
  return neg + _options.prefix + x1 + x2 + _options.suffix;
};
```
:::
或者
``` js
const formatNumber = (num) => parseFloat(num).toLocaleString('en-US');
```

## 无接口模拟登录
::: details 点击查看代码
``` js
/*
* 仅仅是在前端做一个模拟登录的功能
* 它是不安全的
*/

import AESEncryption from "aes-crypto";// npm i aes-crypto
const _encryption = new AESEncryption();

//前端登录模拟
let _username = "admin";
let _password = "password";
let _keyContent =
  "FB32D61111CBE2D012E7A12209322CF5FB32D671D6CBE2D012E7A12209322CF5";
let _interval = 10 * 60 * 1000;// token过期时间

// 登录
let login = (username, password) => {
  if (username === _username && password === _password) {
    setCookie();
    return true;
  } else {
    return false;
  }
};
// 加密存储token到cookie
let setCookie = () => {
  const encryStr = _encryption.encryption(
    JSON.stringify({
      _username: _username,
      _password: _password,
      date: new Date().getTime(),
    }),
    _keyContent
  );
  document.cookie = `token=${encryStr}`;
};

/*
* 验证登录状态
* 可以用来在页面跳转的时候做验证
* 验证成功时会重置token过期时间
*/
let validation = () => {
  let cookie = document.cookie;

  if (!cookie) {
    //没有cookie
    return false;
  }

  let cookieToken = cookie.split(";").find((item) => {
    let arr = item.split("=");
    if (arr[0] === "token") {
      return true;
    } else {
      return false;
    }
  });

  if (cookieToken) {
    try {
      let TokenData = JSON.parse(
        _encryption.decryption(cookieToken.split("=")[1], _keyContent)
      );
      if (
        TokenData._username === _username &&
        TokenData._password === _password &&
        TokenData.date + _interval > new Date().getTime()
      ) {
        setCookie();
        return true;
      } else {
        return false;
      }
    } catch (e) {
      //如果token被用户手动修改后解密会失败
      uplogin();
      return false;
    }
  } else {
    //cookie中没有token
    return false;
  }
};

// 退出登录
let uplogin = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

export {
  login,
  validation,
  uplogin,
}
```
:::

## get缓存和防止同时发起相同的请求
> 其实我也不太确定这个代码有没有必要做

::: details 点击查看代码
``` js
/**
 * 对get请求进行包装
 * 提供数据缓存和防止同时发起相同的请求
 * 相同的路径 相同的参数就可以理解为相同的请求
 */

import axios from "./interceptors";
import md5 from "md5"; // npm i md5

const promiseRecord = {};

//将对象的属性重新排序
function objKeySort(obj) {
  let newkey = Object.keys(obj).sort(); //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  let newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  let len = newkey.length;
  for (var i = 0; i < len; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; //返回排好序的新对象
}

/**
 * 通过路径和参数生成唯一字符
 * @param {*} apiUrl
 * @param {*} params
 */
const createKey = (apiUrl, params) => {
  return md5(apiUrl + JSON.stringify(objKeySort(params)));
};

// 普通的 get 请求
const get = (apiUrl, params = {}) => {
  return axios.get(apiUrl, { params });
};

/**
 * 用来发起需要缓存的请求
 * @param {String} apiUrl
 * @param {Object} params
 * @param {Boolean} refresh 可能在某些情况下不能使用缓存必须到后台获取
 */
const getCache = (apiUrl, params = {}, refresh = false) => {
  // 用请求路径和参数生成标识，完全相同的请求的标识一样，作为储存的键
  let keyName = createKey(apiUrl, params);

  return new Promise((resolve, reject) => {
    let data = sessionStorage.getItem(keyName);

    let request = () => {
      get(apiUrl, params)
        .then((value) => {
          sessionStorage.setItem(keyName, JSON.stringify(value));
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
    };

    if (data && !refresh) {
      // 如果用户手动修改了 sessionStorage 里的数据可能会出错，应该做下处理
      try {
        let value = JSON.parse(data);
        resolve(value);
      } catch (e) {
        request();
      }
    } else {
      request();
    }
  });
};

/**
 * 防止重复处理
 */
const repeat = (apiUrl, params, request, refresh) => {
  // 用请求路径和参数生成标识，完全相同的请求的标识一样，可以使用同一个请求结果
  let keyName = createKey(apiUrl, params);

  if (!promiseRecord[keyName]) {
    promiseRecord[keyName] = new Promise((resolve, reject) => {
      request(apiUrl, params, refresh)
        .then((value) => {
          promiseRecord[keyName] = null;
          resolve(value);
        })
        .catch((error) => {
          promiseRecord[keyName] = null;
          reject(error);
        });
    });
  }

  return promiseRecord[keyName];
};

/**
 * 返回请求的函数
 * @param {String} apiUrl
 * @param {Object} params
 * @param {Object} options 配置项
 */
const getAxios = (apiUrl, params = {}, options = {}) => {
  // 默认配置
  let defaults = {
    cache: false, // 是否开启缓存
    repeat: false, // 是否开启防止同时发起相同的请求
    refresh: false, // 是否刷新（这里也不能保证会刷新，因为get也有缓存，只能保证它会发出请求）
  };
  let _options = Object.assign(Object.assign({}, defaults), options);

  // 什么都不需要 返回原始的axiso get请求
  if (!_options.cache && !_options.repeat) {
    return get(apiUrl, params);
  }

  // 只需要缓存
  if (_options.cache && !_options.repeat) {
    return getCache(apiUrl, params, _options.refresh);
  }

  // 只需要防止同时发起相同的请求
  if (!_options.cache && _options.repeat) {
    return repeat(apiUrl, params, get);
  }

  // 小孩子才做选择,成年人全都要
  if (_options.cache && _options.repeat) {
    return repeat(apiUrl, params, getCache, _options.refresh);
  }
};

export { getAxios };
```
:::

使用方式
``` js
import { getAxios } from "./get-axios";

export const getMenuList = (params, refresh = false) => {
  return getAxios("/applet/jsons/caihai.json", params, {
    cache: true,
    repeat: true,
    refresh: refresh,
  });
};
```
``` js
import { getMenuList } from "@/api/index";

getMenuList().then((value) => {
  console.log(this.options);
});
```
## ES6,ES7常用语法
+ `let` 和 `const`
+ 模板字符串
+ 箭头函数
+ 函数参数默认值
+ `Object.assing()`
+ `Promise`
``` js
let promise = new Promise(function(resolve, reject) {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(value => {
 // success
}).catch(error => {
 // failure
});
```
> `Promise.all` 方法用于将多个 `Promise` 实例，包装成一个新的 `Promise` 实例。
``` js
let p = Promise.all([p1,p2,p3]);
p.then([v1, v2, v3] =>{
  // 都成功
}).catch(error => {
  // 任意一个失败
})
```
+ `async` 和 `await`
+ 解构赋值
> 解构赋值语法是一种 Javascript 表达式。通过解构赋值, 可以将属性/值从对象/数组中取出,赋值给其他变量。
``` js
let [a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20
//--------------分割线--------------
let { a, b } = { a: 10, b: 20 }
console.log(a); // 10
console.log(b); // 20
```
+ 对象扩展
> 属性简写：允许对象中直接写变量 ，这时属性名为变量名 ，属性值为变量值
``` js
let name = 'ch';
let age = 18;
const user = {
  name,
  age,
}
```
> 对象中方法简写：可以省略function关键字
``` js
const preson = {
  method: function(){}
}
// 写为
const preson = {
  method(){}
}
``` 
+ Proxy 对象代理
> Proxy 对象用于定义基本操作的自定义行为
``` js
const handler = {
    get: function(obj, prop) {
        return prop in obj ? obj[prop] : 37;
    },
    set: function(obj, prop, value){
      console.log(value)
    }
};

const p = new Proxy({}, handler);
console.log(p.name); // 37,
p.name = 'ch';// 这时会打印 'ch'
```

## 时间相关函数

### 将时间戳转为字符串格式
```js
function timeFormat(time, format = 'yyyy-MM-dd') {
  const t = new Date(parseInt(time));
  const tf = function (i) {
    return (i < 10 ? '0' : '') + i;
  };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (a) => {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
      case 'MM':
        return tf(t.getMonth() + 1);
      case 'mm':
        return tf(t.getMinutes());
      case 'dd':
        return tf(t.getDate());
      case 'HH':
        return tf(t.getHours());
      case 'ss':
        return tf(t.getSeconds());
      default:
        break;
    }
  });
}
```

## 数组去重
``` js
const deDupe = (myArray) => [...new Set(myArray)];
```
## RGB 颜色转 16进制颜色
``` js
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
RGBToHex(255, 165, 1); // 'ffa501'
```