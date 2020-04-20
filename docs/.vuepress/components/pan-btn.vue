<template>
  <div style="padding:20px 0">
    <div class="pan-btn pan-blue">默认按钮</div>
    <div class="pan-btn pan-primary">主要按钮</div>
    <div class="pan-btn pan-success">成功按钮</div>
    <div class="pan-btn pan-info">信息按钮</div>
    <div class="pan-btn pan-warning">警告按钮</div>
    <div class="pan-btn pan-danger">危险按钮</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.pan-btn {
  display: inline-block;
  position: relative;
  font-size: 14px;
  color: #fff;
  padding: 14px 36px;
  border-radius: 8px;
  border: none;
  background: #324157;
  transition: all 0.6s ease;
  cursor: pointer;
}

.pan-btn:hover {
  color: #324157;
  background: #fff;
}

.pan-btn:after,
.pan-btn:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0%;
  transition: all 0.4s ease;
  background: #324157;
}

.pan-btn:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}
.pan-btn:hover:after,
.pan-btn:hover:before {
  width: 100%;
  transition: all 0.6s ease;
}

/* 默认按钮 */
.pan-blue {
  background: #324157;
}
.pan-blue:hover {
  color: #324157;
}
.pan-blue:after,
.pan-blue:before {
  background: #324157;
}

/* 成功按钮 */
.pan-primary {
  background: #3a71a8;
}
.pan-primary:hover {
  color: #3a71a8;
}
.pan-primary:after,
.pan-primary:before {
  background: #3a71a8;
}

/* primary */
.pan-success {
  background: #30b08f;
}
.pan-success:hover {
  color: #30b08f;
}
.pan-success:after,
.pan-success:before {
  background: #30b08f;
}

/* 信息按钮 */
.pan-info {
  background: #4ab7bd;
}
.pan-info:hover {
  color: #4ab7bd;
}
.pan-info:after,
.pan-info:before {
  background: #4ab7bd;
}
/* 警告按钮 */
.pan-warning {
  background: #fec171;
}
.pan-warning:hover {
  color: #fec171;
}
.pan-warning:after,
.pan-warning:before {
  background: #fec171;
}
/* 危险按钮 */
.pan-danger {
  background: #e65d6e;
}
.pan-danger:hover {
  color: #e65d6e;
}
.pan-danger:after,
.pan-danger:before {
  background: #e65d6e;
}
</style>
