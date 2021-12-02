<template>
  <div class="joinRoom">
    <section class="joinRoomSection">
      <h1 class="title">Please Enter a room</h1>
      <form class="joinRoomForm" @submit="onSubmit">
        <div class="inputWrapper">
          <input
            id="user"
            type="text"
            class="input inputUser"
            placeholder="Please enter your username"
            v-model="$data.userName"
          />
          <label htmlFor="user" class="label">
            UserName
          </label>
        </div>
        <div class="inputWrapper">
          <input
            id="room"
            class="input inputRoom"
            type="text"
            placeholder="Please enter a room"
            v-model="$data.roomName"
          />
          <label htmlFor="room" class="label">
            Room
          </label>
        </div>
        <button type="submit" class="submitBtn">
          Enter
        </button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'JoinRoom',
  data() {
    return {
      userName: '',
      roomName: '',
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      if (this.userName && this.roomName) {
        const joinedData = { user: this.userName, room: this.roomName };
        this.$emit('joinroom-handler', joinedData);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../style/variable';

.joinRoom {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 80px);

  .joinRoomSection {
    text-align: center;
    width: 300px;
    margin: 0 auto;
    border-radius: 4px;
    padding: 20px;

    .title {
      font-size: 1.6rem;
    }

    .joinRoomForm {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      margin-top: 20px;
      height: 300px;

      .inputWrapper {
        position: relative;
        width: 100%;
        text-align: left;
        padding-top: 30px;

        .label {
          position: absolute;
          display: inline-block;
          color: #b3b3b3;
          background-color: #ffffff;
          left: 3px;
          top: 8px;
          font-size: 1.4rem;
          padding: 4px 6px;
          transition: $transitionSpeed;
        }

        .input {
          width: 100%;
          border: 0;
          border-bottom: 2px solid $btnBorderColor;
          border-radius: 8px;
          padding: 14px 10px 10px;

          &:focus ~ .label {
            color: $baseColor;
            top: -6px;
            background-color: #ffffff00;
          }
        }
      }

      .submitBtn {
        font-size: 1.6rem;
        color: #ffffff;
        background-color: $btnColor;
        width: 240px;
        border: 0;
        border-bottom: 4px solid $btnBorderColor;
        border-radius: 40px;
        padding: 16px 10px;
        cursor: pointer;
        transition: background-color $transitionSpeed;

        &:hover,
        &:active {
          border: 0;
          margin-top: 4px;
          background-color: $btnHoverColor;
        }
      }
    }
  }
}
</style>
