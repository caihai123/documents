<template>
  <div>
    <input v-model="code"/>
  </div>
</template>

<script>
export default {
    props: {
      value: {
        type: String,
        required: true
      }
    },
    computed: {
      code: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit("input", val);
        }
      }
    },
};
</script>