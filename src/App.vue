<template>
  <main>
    <template v-if="$data.user">
      <layout>
        <Header :room="$data.room" />
        <chat-area :user="$data.user" :chatList="$data.chatList" />
        <text-form
          @submit-text="onSubmitHandler"
          :socket="$data.socket"
          :user="$data.user"
          :room="$data.room"
        />
      </layout>
    </template>
    <join-room v-else @joinroom-handler="joinRoomHandler" />
  </main>
  <Footer />
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import TextForm from './components/TextForm.vue';
import ChatArea from './components/ChatArea.vue';
import JoinRoom from './components/JoinRoom.vue';
import Layout from './components/Layout.vue';
import io from 'socket.io-client';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    'text-form': TextForm,
    'chat-area': ChatArea,
    'join-room': JoinRoom,
    layout: Layout,
  },
  data() {
    return {
      socket: io.connect(process.env.VUE_APP_PORT),
      sendText: '',
      chatList: [],
      user: '',
      room: '',
    };
  },
  methods: {
    joinRoomHandler(data) {
      this.socket.emit('joinRoom', data);
      this.user = data.user;
      this.room = data.room;
    },
    onSubmitHandler(text) {
      this.socket.emit('sendMessage', text);
    },
  },
  created() {
    this.socket.on('connect', () => {
      //console.log('connected!');
    });

    this.socket.on('receveMessage', (messageData) => {
      this.$data.chatList = [...this.$data.chatList, messageData];
    });
  },
};
</script>

<style lang="scss">
@import './style/_variable.scss';

* {
  box-sizing: border-box;
}
html {
  -webkit-text-size-adjust: 100%;
  font-size: 62.5%;
}
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  line-height: 1.5;
  font-size: 1.8rem;
  color: $defaultTextColor;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}
.inner {
  width: 720px;
  margin: 0 auto;
}
main {
  display: block;
}
a {
  color: $defaultTextColor;
  text-decoration: none;
}
ul,
dl,
li {
  margin: 0;
  padding: 0;
  display: block;
}
input,
button {
  outline: 0;
}
</style>
