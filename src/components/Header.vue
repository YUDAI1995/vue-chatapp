<template>
  <header class="header">
    <h1 class="headTitle">
      {{ room ? room : 'Gest Room' }}
    </h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    room: String,
  },
};
</script>

<style lang="scss" scoped>
@import '../style/_variable.scss';

.header {
  background-color: #b4d5ff;

  h1.headTitle {
    display: flex;
    align-items: center;
    height: 80px;
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
    padding: 0 20px;
  }
}

@include mq(md) {
  .header {
    margin-bottom: 20px;
    h1.headTitle {
      margin-left: 10px;
    }
  }
}
</style>
