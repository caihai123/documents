<template>
  <div class="container">这是一段内容,这是一段内容,这是一段内容,这是一段内容。</div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  position: relative;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #dddddd;
  margin-top: 20px;
}

.container:before,
.container:after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 19px;
  border: 11px solid transparent;
  border-bottom-color: #dddddd;
}

.container:after {
  left: 20px;
  border: 10px solid transparent;
  border-bottom-color: #ffffff;
}
</style>
