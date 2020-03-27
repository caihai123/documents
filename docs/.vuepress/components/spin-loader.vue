<template>
  <div class="loader">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loader {
  position: relative;
  height: 112px;
}
.loading {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
  left: 50%;
  margin-top: -25px;
  border-width: 3px;
  border-radius: 50%;
  border-style: solid;
  border-color: #1f2d3d transparent transparent;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>
