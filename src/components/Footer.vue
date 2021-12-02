<template>
  <footer>
    <div class="inner">
      <p><small class="copy">&copy; 2020 YUDAI1995</small></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  align-items: center;
  height: 60px;
  background-color: #e7e7e7;
  margin-top: 20px;
  padding: 8px 6px;
}
footer {
  p {
    text-align: center;
    margin: 0;

    .copy {
      color: #5c5c5c;
      font-size: 12px;
    }
  }
}
</style>
