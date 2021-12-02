<template>
  <div class="chatWrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Layout',
};
</script>

<style lang="scss" scoped>
.chatWrapper {
  margin: 20px 20px 0;
  border: 1px solid #dfdfdf;
  padding-bottom: 20px;
  min-height: calc(100vh - 100px);
}
</style>
