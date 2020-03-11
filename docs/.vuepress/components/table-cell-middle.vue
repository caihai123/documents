<template>
  <div class="container">
    <div class="center">
      <span>居中的文本</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  border: 1px solid #333;
  height: 250px;
  width: 250px;
}

.center {
  display: table;
  height: 100%;
  width: 100%;
}

.center > span {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
</style>
