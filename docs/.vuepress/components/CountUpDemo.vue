<template>
  <div>
    <p class="text">
      <CountUp :endVal="endVal" :options="options" />
    </p>

    <div>
      <input class="group-item input" type="text" v-model="value" />
      <button class="group-item button" @click="upValue">更 新</button>
    </div>
  </div>
</template>

<script>
import CountUp from "./CountUp";
export default {
  components: { CountUp },
  data() {
    return {
      value: 2020,
      endVal: 2020,
      options: {
        decimalPlaces: 2
      }
    };
  },
  methods: {
    upValue() {
      let num = Number(this.value);
      if (!isNaN(num)) {
        this.endVal = num;
      } else {
        this.endVal = 0;
      }
    }
  }
};
</script>

<style scoped>
p {
  margin: 0;
}
.text {
  font-size: 36px;
  color: #4d63bc;
}
.input {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 1;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #3a8ee6;
  border: 1px solid #3a8ee6;
  color: #fff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.button:focus,
.button:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
.button:active {
  color: #fff;
  background: #3a8ee6;
  border-color: #3a8ee6;
  outline: none;
}

.group {
  display: inline-block;
  vertical-align: middle;
}

.group > .group-item {
  float: left;
  position: relative;
}
.group > .group-item:not(:last-child) {
  margin-right: -1px;
}
.group > .group-item:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.group > .group-item:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.group > .group-item:not(:first-child):not(:last-child) {
  border-radius: 0;
}
</style>
