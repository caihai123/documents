---
title: css
description : 这里会记录一些css的常用语法
---
## css文字省略
``` css
.ellipsis{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
/* 最多显示两行的文字 */
.multi-ellipsis-2{
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
/* 最多显示两三的文字 */
.multi-ellipsis-3{
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
```
## 修改滚动条默认样式