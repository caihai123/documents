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
  