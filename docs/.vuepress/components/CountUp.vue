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