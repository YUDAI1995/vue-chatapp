<template>
  <transition-group tag="ul" class="chatList" name="flip">
    <li
      v-for="item in $props.chatList"
      :key="item.id"
      :class="{ isAuthor: user === item.author, chat: true }"
    >
      <div class="contentWrapper">
        <p class="user">{{ item.author }}</p>
        <div class="content">
          <p class="message">{{ item.message }}</p>
          <p class="time">{{ item.time }}</p>
        </div>
      </div>
    </li>
  </transition-group>
</template>

<script>
export default {
  name: 'ChatArea',
  props: {
    user: String,
    chatList: {
      id: Number,
      author: String,
      message: String,
      room: String,
      time: String,
    },
  },
};
</script>

<style lang="scss" scoped>
$chatSideSize: 80px;
$authorColor: #ffdd7e;
$otherColor: #e1eaff;

.chatList {
  padding-top: 40px;
  margin-bottom: 20px;
  padding: 0 20px;
  .chat {
    .contentWrapper {
      position: relative;
      display: flex;
      padding: 0 $chatSideSize;

      .user {
        position: absolute;
        left: 0;
        bottom: 0;
        width: $chatSideSize;
        padding: 2px 4px;
      }
      .content {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: flex-end;
        max-width: 600px;

        &::after {
          position: absolute;
          content: '';
          display: inline-block;
          top: 50%;
          left: -19px;
          border: 8px solid transparent;
          border-right: 18px solid $otherColor;
          transform: rotate(-15deg);
        }

        .message {
          min-width: 200px;
          max-width: 600px;
          background-color: $otherColor;
          border-radius: 6px;
          padding: 10px 8px;
        }

        .time {
          font-size: 1.2rem;
          color: #777777;

          margin: 2px 0 0 4px;
        }
      }
    }

    &.isAuthor {
      .contentWrapper {
        justify-content: flex-end;
        .user {
          left: auto;
          right: 0;
          text-align: right;
        }

        .content {
          flex-direction: row-reverse;

          &::after {
            left: auto;
            right: -19px;
            border-right: 18px solid $authorColor;
            transform: rotate(-165deg);
          }

          .message {
            background-color: $authorColor;
          }
          .time {
            margin: 2px 4px 0 0;
          }
        }
      }
    }

    & + .chat {
      margin-top: 30px;
    }
  }
}
</style>
