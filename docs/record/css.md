---
title: css
description : 这里会记录一些常用css
---
## 几个按钮
<pan-btn />
::: details 点击查看代码
<<< @/docs/.vuepress/components/pan-btn.vue
:::

<neon-btn />
::: details 点击查看代码
<<< @/docs/.vuepress/components/neon-btn.vue
:::

<circle-btn />
::: details 点击查看代码
<<< @/docs/.vuepress/components/circle-btn.vue
:::

<frozen-btn />
::: details 点击查看代码
<<< @/docs/.vuepress/components/frozen-btn.vue
:::

## css文字省略
::: details 点击查看代码
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
/* 最多显示三行的文字 */
.multi-ellipsis-3{
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
```
:::
## 加载动画
<bouncing-loader/>
::: details 点击查看代码
<<< @/docs/.vuepress/components/bouncing-loader.vue
:::

<spin-loader />
::: details 点击查看代码
<<< @/docs/.vuepress/components/spin-loader.vue
:::

## 悬停时在文本周围创建一个阴影框
<hover-shadow/>

::: details 点击查看代码
<<< @/docs/.vuepress/components/hover-shadow.vue
:::

## 顶部三角形的边框
<arrow/>

::: details 点击查看代码
<<< @/docs/.vuepress/components/arrow.vue
:::
[cssarrowplease](http://www.cssarrowplease.com/) 帮你做对话框三角

## table-cell垂直居中
<table-cell-middle/>

::: details 点击查看代码
<<< @/docs/.vuepress/components/table-cell-middle.vue
:::

## Animate.css
<Animate-demo/>