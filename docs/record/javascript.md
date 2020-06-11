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