<template>
  <form @submit="onSubmit" class="chatForm">
    <input v-model="text" type="text" placeholder="message" class="input" />
    <button type="submit" :disabled="text === ''" class="submitBtn">add</button>
  </form>
</template>

<script>
import { getCurrentTime, getRandomID } from '../models';

export default {
  name: 'TextForm',
  props: ['user', 'room', 'socket'],
  data() {
    return {
      text: '',
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      if (this.$data.text) {
        const sendMessage = {
          id: getRandomID(),
          room: this.room,
          author: this.user,
          message: this.$data.text,
          time: getCurrentTime(),
        };
        this.socket.emit('sendMessage', sendMessage);
        this.text = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../style/variable';

.chatForm {
  display: flex;
  max-width: 540px;
  margin: 0 auto;

  .input {
    width: 100%;
    border: 1px solid $grayBorderColor;
    border-radius: 2px;
    padding: 6px 10px;
  }
  .submitBtn {
    color: #ffffff;
    min-width: 120px;
    border: 0;
    border-bottom: 2px solid $btnBorderColor;
    border-radius: 4px;
    padding: 4px;
    background-color: $btnColor;
    transition: $transitionSpeed;

    &:hover,
    &:active {
      background-color: $btnHoverColor;
    }
  }
}
</style>
