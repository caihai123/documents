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

## 让 model 值传递多次
::: details 点击查看代码
<<< @/docs/.vuepress/components/multiple-model.vue
:::

## 饿了么上传组件修改为上传base64
> 只处理了转成base64的功能
::: details 点击查看代码
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
:::

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

## 瀑布流组件

::: details 点击查看代码
``` vue
<template>
  <div>
    <div class="container" :style="{ height: containerHeight + 'px' }">
      <div
        v-for="i in item"
        class="item"
        :key="i[itemkey]"
        :style="{
          width: colsWidth + 'px',
          height: i.imgHeight + 'px',
          left: i.left + 'px',
          top: i.top + 'px',
        }"
      >
        <img :src="i[srcKey]" />
      </div>
    </div>
    <myLoading :show="loading" :height="loadingHeight" />
  </div>
</template>

<script>
let elementResizeDetectorMaker = require("element-resize-detector");
let erdUltraFast = elementResizeDetectorMaker({
  strategy: "scroll", //<- For ultra performance.
});
import myLoading from "@/components/my-loading";

export default {
  components: { myLoading },
  props: {
    // 图片路径
    srcKey: {
      type: String,
      default: "imgSrc",
    },
    // 列宽度
    colsWidth: {
      type: Number,
      default: 240,
    },
    // 图片加载失败时的默认图片地址
    errSrc: {
      type: String,
      default: ``,
    },
    // 列表渲染的 key ，默认为 srcKey
    idKey: {
      type: String,
      default: "",
    },
    /**
     * 默认是等所有img预加载完之后再渲染，但是这给用户的体验会很慢，所有我还加了个loading
     * 如果你的数据的顺序不重要，可以设置此参数为true，他会让用户更快看到图片，但是会打乱数据的顺序，同时去掉loading功能
     * 更好的方式是传入的数据中就包含有 imgHeight（图片高度），这样会跳过预加载环节
     *  */
    fastWay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      item: [], // 实际渲染的瀑布流数据
      itemkey: this.idKey || this.srcKey, // 渲染时的key值
      loading: false, // 控制loading状态
      containerHeight: 0, // 父容器的高度
      column: 0, // 总列数
    };
  },
  computed: {
    // loading模块高度
    loadingHeight() {
      return this.item.length ? "100px" : "500px";
    },
  },
  mounted() {
    this.calcColumn();
    // 容器宽度改变时重新布局
    erdUltraFast.listenTo(this.$el, this.calcElement);
  },
  methods: {
    // 用来向item中添加数据
    addItemData(items) {
      let index = 0; // 用来记录已经预加载完成的个数
      // 出口
      let exit = (i, index) => {
        if (this.fastWay) {
          this.vnodeItem(i, index);
        } else {
          if (index >= items.length) {
            this.loading = false;
            items.forEach((item, index) => {
              this.vnodeItem(item, index + 1);
            });
          }
        }
      };

      items.forEach((item) => {
        if (!this.fastWay) {
          this.loading = true;
        }
        // 如果高度已知，就不需要预加载
        if (item.imgHeight) {
          index++;
          exit(item, index);
        } else {
          let oImg = new Image();
          oImg.src = item[this.srcKey];
          // 预加载完成时
          oImg.onload = () => {
            index++;
            item.imgHeight = (oImg.height / oImg.width) * this.colsWidth;
            exit(item, index);
          };
          // 加载期间发生错误时
          oImg.onerror = () => {
            index++;
            item[this.srcKey] = this.errSrc;
            item.imgHeight = this.colsWidth;
            exit(item, index);
          };
        }
      });
    },

    // 计算单个的位置
    vnodeItem(item, index) {
      if (this.item.length < this.column) {
        item.top = 0;
        item.left = ((index - 1) % this.column) * this.colsWidth;
        item.cols = index; // 所在的列
      } else {
        for (let i = 1; i <= this.column; i++) {
          let colsHeight = this.calcColsHeight(i);
          if (!item.top || colsHeight < item.top) {
            item.top = colsHeight;
            item.left = (i - 1) * this.colsWidth;
            item.cols = i;
          }
        }
      }

      this.item.push(item);
      // 在这里重新计算父容器的高度
      this.calcContainerHeight();
    },

    // 容器宽度改变时重新布局
    calcElement() {
      this.calcColumn();
      let list = Array.from(this.item);
      this.item = [];
      list.forEach((item, index) => {
        item.cols = undefined;
        item.top = undefined;
        item.left = undefined;
        this.vnodeItem(item, index + 1);
      });
    },

    // 计算 container 的高度
    calcContainerHeight() {
      this.containerHeight = 0; // 初始化父容器高度
      for (let i = 1; i <= this.column; i++) {
        let colsHeight = this.calcColsHeight(i);
        if (!this.containerHeight || this.containerHeight < colsHeight) {
          this.containerHeight = colsHeight;
        }
      }
    },

    // 计算某一列的高度
    calcColsHeight(cols) {
      let colsHeight = 0;
      this.item
        .filter((item) => item.cols === cols)
        .forEach((item) => {
          colsHeight += item.imgHeight;
        });
      return colsHeight;
    },
    
    // 计算当前宽度下能排的列数
    calcColumn() {
      let elWidth = this.$el.offsetWidth; // 获取容器的宽度
      this.column = Math.floor(elWidth / this.colsWidth); // 当前容器最多能放几列
    },

    // 清空item
    delItem() {
      this.item = [];
      this.containerHeight = 0;
    },
  },
  beforeDestroy() {
    erdUltraFast.removeListener(this.$el, this.calcElement);
  },
};
</script>

<style scoped>
.container {
  position: relative;
}
.item {
  position: absolute;
  box-sizing: border-box;
  padding: 10px;
  animation: show-card-data 0.4s;
  transition: left 0.6s, top 0.6s;
  transition-delay: 0.1s;
}
.item > img {
  width: 100%;
}
@keyframes show-card-data {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
```
:::

::: tip
通过`refs`使用`addItemData`方法添加数据，通过`delItem`清空数据
:::

## 基于element-ui的图片预览组件

::: details 点击查看代码
``` vue
<!-- main.vue -->
<template>
  <transition name="viewer-fade">
    <ImageViewer
      v-if="visible"
      :url-list="urlList"
      :z-index="zIndex"
      :initial-index="initialIndex"
      :append-to-body="appendToBody"
      :mask-closable="maskClosable"
      :on-close="closeViewer"
    />
  </transition>
</template>

<script>
import ImageViewer from "element-ui/packages/image/src/image-viewer";

export default {
  components: { ImageViewer },
  props: {
    urlList: {
      type: Array,
      default: () => [],
    },
    zIndex: {
      type: Number,
      default: 2000,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    closeViewer() {
      this.visible = false;
    },
  },
};
</script>
```

``` js
import Vue from "vue";
import Main from "./main.vue";

let instance;
const MainConstructor = Vue.extend(Main);

const ImageViewer = function(options = {}) {
  //   if (Vue.prototype.$isServer) return; // 是否运行在服务器

  instance = new MainConstructor({
    propsData: options,
  });

  instance.$mount();
  document.body.appendChild(instance.$el);

  instance.visible = true;

  return instance;
};

export default ImageViewer;
```

``` js
// main.js
import ImageViewer from "@/components/ImageViewer/index"; // 图片预览组件
Vue.prototype.$imageViewer = ImageViewer;
```

```vue
<!-- 用法 -->
<template>
  <el-button @click="imgViewer">点击预览</el-button>
</template>

<script>
export default {
  methods: {
    imgViewer() {
      this.$imageViewer({
        urlList: [
          "https://caihai123.com/Dribbble/lists/preview_teaser.png",
          "https://caihai123.com/Dribbble/lists/news_teaser.png",
        ],
      });
    },
  },
};
</script>
:::

## 网页水印
::: tip
  参考组件 [WaterMark](https://procomponents.ant.design/components/water-mark),我只是将它由`react`变成了`vue`。
:::

::: details 点击查看代码
<<< @/docs/.vuepress/components/WaterMark.vue
:::

## el-tree-select

::: tip
  只能在ElEment中使用，也是为了弥补element2中没有此组件的问题
:::

::: details 点击查看代码
``` vue
<template>
    <div
      ref="reference"
      v-clickoutside="() => toggleDropDownVisible(false)"
      :class="[
        realSize && `el-tree-select--${realSize}`,
        { 'is-disabled': isDisabled },
      ]"
      class="el-tree-select"
      @click="() => toggleDropDownVisible()"
      @mouseenter="inputHover = true"
      @mouseleave="inputHover = false"
    >
      <el-input
        ref="input"
        v-model="inputValue"
        :disabled="isDisabled"
        :size="realSize"
        :validate-event="false"
        :clearable="false"
        :readonly="filterable && !config.multiple ? false : true"
        :placeholder="presentTags.length ? '' : presentText || placeholder"
        :class="{ 'is-focus': dropDownVisible }"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="filterHandler"
      >
        <template slot="suffix">
          <i
            v-if="clearBtnVisible"
            key="clear"
            class="el-input__icon el-icon-circle-close el-input__clear"
            @click.stop="handleClear"
          ></i>
          <i
            v-else
            key="arrow-down"
            :class="[
              'el-input__icon',
              'el-icon-arrow-down',
              dropDownVisible && 'is-reverse',
            ]"
            @click.stop="toggleDropDownVisible()"
          ></i>
        </template>
      </el-input>
  
      <div v-if="config.multiple" class="el-tree-select__tags">
        <el-tag
          v-for="tag in presentTags"
          :key="tag.key"
          type="info"
          :size="tagSize"
          :closable="tag.closable"
          disable-transitions
          @close="deleteTag(tag.key)"
        >
          <span class="ellipsis">{{ tag.label }}</span>
        </el-tag>
      </div>
  
      <transition name="el-zoom-in-top" @after-leave="handleDropdownLeave">
        <div
          v-show="dropDownVisible"
          ref="popper"
          :class="['el-popper', 'el-cascader__dropdown', popperClass]"
          :style="{
            minWidth: inputWidth + 'px',
            padding: '8px 4px',
            boxSizing: 'border-box',
          }"
        >
          <el-input
            v-if="config.multiple && filterable"
            v-model="inputMultipleValue"
            size="mini"
            placeholder="输入关键字搜索"
            style="margin-bottom:6px"
            @input="filterHandler"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div
            v-loading="loading"
            element-loading-spinner="el-icon-loading"
            class="tree--select--loading--box"
          >
            <el-scrollbar :wrap-style="[{ maxHeight: listHeight + 'px' }]">
              <MyTree
                ref="tree"
                v-model="treeValue"
                :data="options"
                :row-key="rowKey"
                :props="config"
                :filter-node-method="filterNodeMethod"
                :lazy="lazy"
                :load="load"
                @loaded="treeLoaded"
                @selected="toggleDropDownVisible(false)"
              />
            </el-scrollbar>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import Clickoutside from "element-ui/src/utils/clickoutside";
  import Popper from "element-ui/src/utils/vue-popper";
  import { isDef } from "element-ui/src/utils/shared";
  import {
    addResizeListener,
    removeResizeListener,
  } from "element-ui/src/utils/resize-event";
  import MyTree from "./tree.vue";
  import { debounce } from "throttle-debounce";
  
  const InputSizeMap = {
    medium: 36,
    small: 32,
    mini: 28,
  };
  
  const PopperMixin = {
    name: "TreeSelect",
    props: {
      placement: {
        type: String,
        default: "bottom-start",
      },
      appendToBody: Popper.props.appendToBody,
      visibleArrow: {
        type: Boolean,
        default: true,
      },
      arrowOffset: Popper.props.arrowOffset,
      offset: Popper.props.offset,
      boundariesPadding: Popper.props.boundariesPadding,
      popperOptions: Popper.props.popperOptions,
      transformOrigin: Popper.props.transformOrigin,
    },
    methods: Popper.methods,
    data: Popper.data,
    beforeDestroy: Popper.beforeDestroy,
  };
  
  export default {
    components: { MyTree },
    directives: { Clickoutside },
    mixins: [PopperMixin],
    inject: {
      elForm: {
        default: "",
      },
      elFormItem: {
        default: "",
      },
    },
    props: {
      value: {
        type: [String, Array],
        required: true,
      },
      // 树的数据
      options: {
        type: Array,
        default: () => [],
      },
      props: {
        type: Object,
        default: () => ({}),
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false,
      },
      // 是否显示清空小图标
      clearable: {
        type: Boolean,
        default: false,
      },
      // 是否可搜索选项
      filterable: {
        type: Boolean,
        default: false,
      },
      // 多选模式下是否折叠Tag
      collapseTags: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: "请选择",
      },
      popperClass: {
        type: String,
        default: "",
      },
      // eslint-disable-next-line vue/require-default-prop
      size: String,
      listHeight: {
        type: Number,
        default: 256,
      },
      rowKey: {
        type: String,
        required: true,
      },
      filterNodeMethod: {
        type: Function,
        default: (value, data) => {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
        },
      },
      debounce: {
        type: Number,
        default: 300,
      },
      // 是否是懒加载，需要配合load使用，为true是options将失效
      lazy: {
        type: Boolean,
        default: false,
      },
      // 懒加载函数，需要配合lazy使用，
      load: {
        type: Function,
        default: (node, resolve) => resolve([]),
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        dropDownVisible: false,
        inputHover: false,
        inputWidth: 0,
        presentText: "",
        presentTags: [],
        inputValue: "",
        inputInitialHeight: 0,
        inputMultipleValue: "",
      };
    },
    computed: {
      treeValue: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit("input", val);
        },
      },
      realSize() {
        const _elFormItemSize = (this.elFormItem || {}).elFormItemSize;
        return this.size || _elFormItemSize || (this.$ELEMENT || {}).size;
      },
      tagSize() {
        return ["small", "mini"].indexOf(this.realSize) > -1 ? "mini" : "small";
      },
      isDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      },
      clearBtnVisible() {
        return (
          this.clearable &&
          !this.isDisabled &&
          this.inputHover &&
          isDef(this.value) &&
          this.value &&
          this.value.length > 0
        );
      },
      config() {
        const defaultProps = {
          multiple: false, // 是否多选
          checkStrictly: true, // 是否严格的遵守父子节点不互相关联
        };
        return {
          ...defaultProps,
          ...this.props,
        };
      },
    },
    watch: {
      value() {
        this.computePresentContent();
      },
      presentTags(val, oldVal) {
        if (this.config.multiple && (val.length || oldVal.length)) {
          this.$nextTick(this.updateStyle);
        }
      },
      presentText(val) {
        this.inputValue = val;
      },
    },
    created() {
      // eslint-disable-next-line vue/no-undef-properties
      this.filterHandler = debounce(this.debounce, (value) => {
        if (this.filterable) {
          this.$refs["tree"].filter(value.trim());
          this.toggleDropDownVisible(true);
        }
      });
    },
    mounted() {
      const { input } = this.$refs;
      if (input && input.$el) {
        this.inputInitialHeight =
          input.$el.offsetHeight || InputSizeMap[this.realSize] || 40;
      }
  
      if (isDef(this.value)) {
        setTimeout(() => {
          this.computePresentContent();
        }, 0);
      }
      addResizeListener(this.$el, this.handleResize);
      addResizeListener(this.$el, this.updateStyle);
    },
    beforeDestroy() {
      removeResizeListener(this.$el, this.handleResize);
      removeResizeListener(this.$el, this.updateStyle);
    },
    methods: {
      // 切换popper展开收起状态
      toggleDropDownVisible(visible) {
        if (this.isDisabled) return;
  
        const { dropDownVisible } = this;
        // eslint-disable-next-line no-param-reassign
        visible = isDef(visible) ? visible : !dropDownVisible;
        if (visible !== dropDownVisible) {
          this.dropDownVisible = visible;
          if (visible) {
            this.$nextTick(() => {
              this.updatePopper();
            });
          } else {
            if (this.filterable && !this.config.multiple) {
              setTimeout(() => {
                // 延时筛选的重置，不然可能会打扰用户选择
                this.$refs["tree"].filter();
              }, 500);
            }
          }
        }
      },
  
      updatePopper() {
        // eslint-disable-next-line vue/no-undef-properties
        const popperJS = this.popperJS;
        if (popperJS) {
          popperJS.update();
          if (popperJS._popper) {
            popperJS._popper.style.zIndex = 4000; // 大部分dialog都是3001
          }
        } else {
          // eslint-disable-next-line vue/no-undef-properties
          this.createPopper();
        }
      },
  
      // 计算当前显示的内容
      computePresentContent() {
        this.$nextTick(() => {
          const { tree } = this.$refs;
          if (this.config.multiple) {
            this.computePresentTags();
          } else {
            this.presentText = tree.getCurrentLables() || this.value;
          }
        });
      },
  
      // 计算多选的tags
      computePresentTags() {
        const { collapseTags } = this;
        const { tree } = this.$refs;
        const labelList =
          tree.getCurrentLables() ||
          this.value.map((key) => ({ key, label: key }));
  
        const tags = [];
  
        const genTag = (tag) => ({
          key: tag.value,
          label: tag.label,
          closable: true,
        });
  
        if (labelList.length) {
          const [first, ...rest] = labelList;
          const restCount = rest.length;
          tags.push(genTag(first));
  
          if (restCount) {
            if (collapseTags) {
              tags.push({
                key: -1,
                label: `+ ${restCount}`,
                closable: false,
              });
            } else {
              rest.forEach((node) => tags.push(genTag(node)));
            }
          }
        }
  
        this.presentTags = tags;
      },
  
      // 懒加载之后重新计算显示的内容
      treeLoaded() {
        this.$nextTick(() => {
          this.computePresentContent();
        });
      },
  
      handleDropdownLeave() {
        // eslint-disable-next-line vue/no-undef-properties
        this.doDestroy();
      },
  
      handleResize() {
        this.inputWidth = this.$refs["reference"].getBoundingClientRect().width;
      },
  
      // 删除单个tag
      deleteTag(key) {
        let { value } = this;
        if (typeof value === "string") value = [value];
        this.$emit(
          "input",
          value.filter((id) => id !== key)
        );
      },
  
      updateStyle() {
        const { $el, inputInitialHeight } = this;
        if (this.$isServer || !$el) return;
  
        const inputInner = $el.querySelector(".el-input__inner");
  
        if (!inputInner) return;
  
        const tags = $el.querySelector(".el-tree-select__tags");
  
        if (tags) {
          const offsetHeight = Math.round(tags.getBoundingClientRect().height);
          const height = `${Math.max(offsetHeight + 6, inputInitialHeight)}px`;
          inputInner.style.height = height;
          if (this.dropDownVisible) {
            this.updatePopper();
          }
        }
      },
      // input 获得焦点时
      handleFocus(e) {
        if (this.filterable && !this.config.multiple) this.inputValue = "";
        this.$emit("focus", e);
      },
      // input失去焦点时
      handleBlur(e) {
        this.inputValue = this.presentText;
        this.$emit("blur", e);
      },
      // 点击清除图标
      handleClear() {
        this.presentText = "";
        this.inputValue = "";
        this.$emit("input", this.config.multiple ? [] : "");
      },
    },
  };
  </script>
  
  <style>
  .el-tree-select {
    display: inline-block;
    position: relative;
    font-size: 14px;
    line-height: 40px;
  }
  .el-tree-select--medium {
    font-size: 14px;
    line-height: 36px;
  }
  .el-tree-select .el-input {
    cursor: pointer;
  }
  .el-tree-select:not(.is-disabled):hover .el-input__inner {
    cursor: pointer;
    border-color: #c0c4cc;
  }
  .el-tree-select .el-input .el-input__inner {
    text-overflow: ellipsis;
  }
  .el-tree-select .el-input .el-icon-arrow-down {
    transition: transform 0.3s;
    font-size: 14px;
  }
  .el-tree-select .el-input .el-icon-arrow-down.is-reverse {
    transform: rotateZ(180deg);
  }
  .el-tree-select .el-input.is-focus .el-input__inner {
    border-color: #2b7bfb;
  }
  .el-tree-select-item.selected {
    color: #2b7bfb;
    font-weight: bold;
  }
  
  .el-tree-select__tags {
    position: absolute;
    left: 0;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-wrap: wrap;
    line-height: normal;
    text-align: left;
    box-sizing: border-box;
    cursor: pointer;
  }
  .el-tree-select__tags .el-tag {
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    margin: 2px 0 2px 6px !important;
    text-overflow: ellipsis;
    background: #f0f2f5;
  }
  .el-tree-select__tags .el-tag:not(.is-hit) {
    border-color: transparent;
  }
  
  .tree--select--loading--box .el-loading-spinner {
    margin-top: -8px;
  }
  </style>
  
```

<<< @/docs/.vuepress/components/tree-select/tree.vue

<<< @/docs/.vuepress/components/tree-select/TreeItem.vue
:::

## tree-table-line
::: tip
  某些情况下，可能需要给el-table中的树添加层级指示线
:::

<img :src="$withBase('/static/img/tree-table-line.png')" alt="foo">

::: details 点击查看代码
<<< @/docs/.vuepress/components/tree-table-line.vue
:::