<template>
  <div
    v-if="visible"
    @click.stop="handleClick"
    :style="{
      right: styleRight,
      bottom: styleBottom,
    }"
    class="backtop"
  >
    <slot></slot>
  </div>
</template>

<script>
import { throttle } from "throttle-debounce";//npm i throttle-debounce

export default {
  props: {
    visibilityHeight: {
      type: Number,
      default: 200,
    },
    target: [String],
    right: {
      type: Number,
      default: 40,
    },
    bottom: {
      type: Number,
      default: 40,
    },
  },

  data() {
    return {
      el: null,
      container: null,
      visible: false,
    };
  },

  computed: {
    styleBottom() {
      return `${this.bottom}px`;
    },
    styleRight() {
      return `${this.right}px`;
    },
  },

  mounted() {
    this.init();
    this.throttledScrollHandler = throttle(300, this.onScroll);
    this.container.addEventListener("scroll", this.throttledScrollHandler);
  },

  methods: {
    init() {
      this.container = document;
      this.el = document.documentElement;
      if (this.target) {
        this.el = document.querySelector(this.target);
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`);
        }
        this.container = this.el;
      }
    },
    onScroll() {
      const scrollTop = this.el.scrollTop;
      this.visible = scrollTop >= this.visibilityHeight;
    },
    handleClick(e) {
      this.scrollToTop();
      this.$emit("click", e);
    },
    scrollToTop() {
      let el = this.el;
      let step = 0;
      let interval = setInterval(() => {
        if (el.scrollTop <= 0) {
          clearInterval(interval);
          return;
        }
        step += 15;
        el.scrollTop -= step;
      }, 20);
    },
  },

  beforeDestroy() {
    this.container.removeEventListener("scroll", this.throttledScrollHandler);
  },
};
</script>
