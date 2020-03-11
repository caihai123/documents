---
title: vue
description : 这里会记录一些vue的常用语法
---
## vue常用模板
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
或者在你的vscode中添加下面的代码片段：
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
## 水波纹指令
可能你还想看看这个:
[https://www.30secondsofcode.org/react/s/ripple-button/](https://www.30secondsofcode.org/react/s/ripple-button/)
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
``` vue
<template>
  <span></span>
</template>

<script>
import { CountUp } from "countup.js";// npm i countup.js
export default {
  data() {
    return {
      numAnim: null
    };
  },
  props: {
    endVal: {
      type: Number,
      default: 2020
    },
    /**
     * startVal?: number; // number to start at (0)
     * decimalPlaces?: number; // number of decimal places (0)
     * duration?: number; // animation duration in seconds (2)
     * useGrouping?: boolean; // example: 1,000 vs 1000 (true)
     * useEasing?: boolean; // ease animation (true)
     * smartEasingThreshold?: number; // smooth easing for large numbers above this if useEasing (999)
     * smartEasingAmount?: number; // amount to be eased for numbers above threshold (333)
     * separator?: string; // grouping separator (',')
     * decimal?: string; // decimal ('.')
     * easingFn?: (t: number, b: number, c: number, d: number) => number;
     * formattingFn?: (n: number) => string; // this function formats result
     * prefix?: string; // text prepended to result
     * suffix?: string; // text appended to result
     * numerals?: string[]; // numeral glyph substitution
     */
    options: {
      type: Object
    }
  },
  mounted() {
    this.initCountUp();
  },
  methods: {
    initCountUp() {
      this.numAnim = new CountUp(this.$el, this.endVal, this.options);
      this.numAnim.start();
    }
  },
  watch: {
    endVal(value) {
      this.numAnim.update(value);
    }
  }
};
</script>
```