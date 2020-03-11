---
title: css
description : 这里会记录一些常用css
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
## 弹跳加载动画
``` html
<div class="bouncing-loader">
  <div></div>
  <div></div>
  <div></div>
</div>
```
``` css
@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
}

.bouncing-loader {
  display: flex;
  justify-content: center;
}

.bouncing-loader > div {
  width: 1rem;
  height: 1rem;
  margin: 3rem 0.2rem;
  background: #8385aa;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}

.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}

.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
```
## 悬停时在文本周围创建一个阴影框
``` html
<p class="hover-shadow-box-animation">Box it!</p>
```
``` css
.hover-shadow-box-animation {
  display: inline-block;
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  margin: 10px;
  transition-duration: 0.3s;
  transition-property: box-shadow, transform;
}

.hover-shadow-box-animation:hover,
.hover-shadow-box-animation:focus,
.hover-shadow-box-animation:active {
  box-shadow: 1px 10px 10px -10px rgba(0, 0, 24, 0.5);
  transform: scale(1.2);
}
```
## 顶部三角形的边框
``` html
<div class="container">
 上面会三角形
</div>
```
``` css
.container {
  position: relative;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #dddddd;
  margin-top: 20px;
}

.container:before, .container:after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 19px;
  border: 11px solid transparent;
  border-bottom-color: #dddddd;
}

.container:after {
  left: 20px;
  border: 10px solid transparent;
  border-bottom-color: #ffffff;
}
```