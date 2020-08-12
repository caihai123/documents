---
title: vue
description : 这里会记录一些vue的常用语法
---
# 相关链接
+ [vue](https://cn.vuejs.org/) vue官网
+ [vue-cli](https://cli.vuejs.org/zh/) Vue.js 开发的标准脚手架
+ [Vue Router](https://router.vuejs.org/zh/) vue路由
+ [Vuex](https://vuex.vuejs.org/zh/) 全局状态管理

## vue常用模板
::: details 点击查看代码
``` vue
<template>

</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
    watch: {},
};
</script>

<style scoped>

</style>
```
:::
或者在你的vscode中添加下面的代码片段：
::: details 点击查看代码
``` json
{
	"Print to console": {
		"prefix": "vue",
		"body": [
			"<template>\n",
			"</template>\n",
			"<script>",
			"export default {",
			"    components: {},",
			"    props: {},",
			"    data() {",
			"        return {};",
			"    },",
			"    computed: {},",
			"    created() {},",
			"    mounted() {},",
			"    methods: {},",
			"    watch: {},",
			"};",
			"</script>\n",
			"<style scoped>\n",
			"</style>\n",
		],
		"description": "vue模板"
	}
}
```
:::
## 水波纹指令
可能你还想看看这个:
[https://www.30secondsofcode.org/react/s/ripple-button/](https://www.30secondsofcode.org/react/s/ripple-button/)
::: details 点击查看代码
``` js
/* @/directive/waves/index.js */
import './waves.css'

const context = '@@wavesContext'

function handleClick(el, binding) {
  function handle(e) {
    const customOpts = Object.assign({}, binding.value)
    const opts = Object.assign({
      ele: el, // 波纹作用元素
      type: 'hit', // hit 点击位置扩散 center中心点扩展
      color: 'rgba(0, 0, 0, 0.15)' // 波纹颜色
    },
    customOpts
    )
    const target = opts.ele
    if (target) {
      target.style.position = 'relative'
      target.style.overflow = 'hidden'
      const rect = target.getBoundingClientRect()
      let ripple = target.querySelector('.waves-ripple')
      if (!ripple) {
        ripple = document.createElement('span')
        ripple.className = 'waves-ripple'
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
        target.appendChild(ripple)
      } else {
        ripple.className = 'waves-ripple'
      }
      switch (opts.type) {
        case 'center':
          ripple.style.top = rect.height / 2 - ripple.offsetHeight / 2 + 'px'
          ripple.style.left = rect.width / 2 - ripple.offsetWidth / 2 + 'px'
          break
        default:
          ripple.style.top =
            (e.pageY - rect.top - ripple.offsetHeight / 2 - document.documentElement.scrollTop ||
              document.body.scrollTop) + 'px'
          ripple.style.left =
            (e.pageX - rect.left - ripple.offsetWidth / 2 - document.documentElement.scrollLeft ||
              document.body.scrollLeft) + 'px'
      }
      ripple.style.backgroundColor = opts.color
      ripple.className = 'waves-ripple z-active'
      return false
    }
  }

  if (!el[context]) {
    el[context] = {
      removeHandle: handle
    }
  } else {
    el[context].removeHandle = handle
  }

  return handle
}

export default {
  bind(el, binding) {
    el.addEventListener('click', handleClick(el, binding), false)
  },
  update(el, binding) {
    el.removeEventListener('click', el[context].removeHandle, false)
    el.addEventListener('click', handleClick(el, binding), false)
  },
  unbind(el) {
    el.removeEventListener('click', el[context].removeHandle, false)
    el[context] = null
    delete el[context]
  }
}
```
:::
::: details 点击查看代码
``` css
/* @/directive/waves/waves.css */
.waves-ripple {
    position: absolute;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    background-clip: padding-box;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
    opacity: 1;
}

.waves-ripple.z-active {
    opacity: 0;
    -webkit-transform: scale(2);
    -ms-transform: scale(2);
    transform: scale(2);
    -webkit-transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;
    transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;
    transition: opacity 1.2s ease-out, transform 0.6s ease-out;
    transition: opacity 1.2s ease-out, transform 0.6s ease-out, -webkit-transform 0.6s ease-out;
}
```
:::
全局注册
``` js
import Vue from "vue"

import waves from '@/directive/waves/index.js'
Vue.directive('waves', waves)
```
在组件中局部注册
``` js
import waves from "@/directive/waves/index.js";

directives: {
  waves:waves
}
```
## 让数字动起来
<CountUpDemo />
::: details 点击查看代码
<<< @/docs/.vuepress/components/CountUp.vue
:::
## Sticky 滚动吸顶
> 代码来自[这里](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/components/Sticky/index.vue)
::: details 点击查看代码
<<< @/docs/.vuepress/components/Sticky.vue
:::
## Backtop 回到顶部
> 复制的饿了么 [Backtop](https://element.eleme.cn/#/zh-CN/component/backtop) 组件，用的时候自己写样式和动画
::: details 点击查看代码
<<< @/docs/.vuepress/components/Backtop.vue
:::

## 饿了么上传组件修改为上传base64
> 只处理了转成base64的功能
``` vue
<template>
  <el-upload
    class="avatar-uploader"
    action="#"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="onChange"
  >
    <img v-if="value" :src="value" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    onChange() {
      var _this = this;
      var event = event || window.event;
      var _file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function(e){
        _this.$emit("input", e.target.result);
      };
      reader.readAsDataURL(_file);
    }
  }
};
</script>

<style scoped>
.avatar-uploader >>> .el-upload {
  position: relative;
  overflow: hidden;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  width: 88px;
  height: 88px;
  line-height: 88px;
  text-align: center;
  font-size: 28px;
  color: #8c939d;
}
.avatar {
  display: block;
  width: 88px;
  height: 88px;
}
</style>
```
## 防止异步按钮被疯狂点击

::: tip
类似这个功能的实现方式应该有很多种，目前想到的有，后端对接口做限制，前端可以使用防抖函数，或者自己写个定时器控制loading状态。
但我认为最合理的应该还是在异步回调中再恢复loading的状态。
:::

::: details 点击查看代码
``` vue
<template>
  <el-button
    v-bind="$attrs"
    v-on="$listeners"
    :loading="loading"
    @click="event"
  >
    <slot></slot>
  </el-button>
</template>

<script>
import "zone.js"; // npm i zone.js

export default {
  props: {
    click: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    event() {
      let self = this;
      /**
       * loading 改变时会触发dom的更新
       * 将它放在 ZoneDom 下修改而不监听它
       * 否则会出现死循环
       * */
      let ZoneDom = window.Zone.current.fork({});
      window.Zone.current
        .fork({
          // 当有异步操作时触发
          onScheduleTask(delegate, currentZone, targetZone, task) {
            ZoneDom.run(() => {
              self.loading = true;
            });
            return delegate.scheduleTask(targetZone, task);
          },
          onHasTask(delegate, current, target, hasTaskState) {
            if (!hasTaskState.macroTask && !hasTaskState.microTask) {
              ZoneDom.run(() => {
                self.loading = false;
              });
            }
          },
        })
        .run(() => {
          if (!self.loading) {
            self.click();
          }
        });
    },
  },
};
</script>

```
:::