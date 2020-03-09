---
title: lodash的debounce仿抖动函数
date: "2019-07-29"
category: javascript
keywords: "这个是篇关键字"
---

今天做一个展开收起的一个组件，为了适应用户不停的改变窗口宽度的情况，用到了resize函数，也就是在窗口尺寸改变时不停的执行某个函数，
理论上虽然可以，但是这种高频率的触发事件，不仅会损耗页面性能，出现导致页面卡顿，页面抖动，如果你的函数中有一些异步操作时，
还可能导致结果的顺序不一致，为了防止这种情况，我找到了这个。

[https://www.lodashjs.com/](https://www.lodashjs.com/)，他说它是一个一致性、模块化、高性能的 JavaScript 实用工具库，应该很有用的，
有时间研究下，但是今天我只看了他的debounce（仿抖动）函数，点击[这里](https://www.lodashjs.com/docs/latest#_debouncefunc-wait0-options)
查看文档。


其实就一个函数：_.debounce(func, wait, options)
## 参数
+ func (Function): 要防抖动的函数。
+ [wait=0] (number): 需要延迟的毫秒数。
+ [options={}] (Object): 选项对象。
+ [options.leading=false] (boolean): 指定在延迟开始前调用。
+ [options.maxWait] (number): 设置 func 允许被延迟的最大值。
+ [options.trailing=true] (boolean): 指定在延迟结束后调用。

## 返回
(Function): 返回新的 debounced（防抖动）函数。（就是说它执行完之后会返回一个新的debounced函数）

## 例子
``` js
    var i = 0;
    //没有添加debounced
    window.addEventListener('resize',function(){
        console.log(i++)
    }, false);

    //添加了debounced仿抖动函数
    window.addEventListener('resize',_.debounce(function(){
        console.log(i++)
    },200,{
        leading:false,
        maxWait:1000,
        trailing:true
    }), false);
```
## 总结
它好像还有个函数throttle，下次再补~