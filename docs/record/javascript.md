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
