<template>
<header>
  <div class="inner">
    <h1>Chat02</h1>
  </div>
</header>
<main>
<div class="inner">
  <SubmitText @onsubmit='addText_socketio'></SubmitText>
</div>
<div class="inner">
  <Comment :commentList="$data.addedtext" @check="onCheckTodo" @delete="onDeleteTodo" />
</div>
<div class="inner">{{ this.addeduserName }}</div>
</main>
  <footer>
  <div class="inner">
    <p><small class="copy">work</small></p>
  </div>
</footer>
</template>

<script>
import SubmitText from './components/SubmitText.vue'
import Comment from './components/Comment.vue'
import io from 'socket.io-client'
import _ from 'lodash'

export default {
  name: 'App',
  components: {
    SubmitText,
    Comment
  },
  data() {
    const addedtext = [];
    return {
      socket : io.connect('http://localhost:3030'),
      addedtask: '',
      // idを順番につける
      addedtext: addedtext.map((item, index) => ({ ...item, id: index })),
      // 次のTODOに降るID番号
      nextTodoId: addedtext.length,
      addeduserName:''
    }
  },
  methods: {
    addText_socketio(text) {
      this.socket.emit('add', text);
    },
    /**
     * TODOのチェック
     * @param {number} todoId - TODOのID
     */
    onCheckTodo(todoId) {
      const todo = _.find(this.$data.todoList, { id: todoId });
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
    /**
     * TODOの削除ボタンがクリックされた時
     * @param {number} todoId - TODOのID
     */
    onDeleteTodo(todoId) {
      const index = _.findIndex(this.$data.addedtext, { id: todoId });
      if (index !== -1) {
        this.$data.addedtext.splice(index, 1);
      }
    }
  },
  created() {
    this.socket.on('connect', () => {
      this.socket.emit('setUserName', prompt('ユーザー名を入力してください'));
    });

    this.socket.on('addtext', (text) => {
      console.log(text);
      this.$data.addedtext.unshift({
        id: this.$data.nextTodoId,
        isDone: false,
        text: text
      });
      this.$data.nextTodoId += 1;
    });

    this.socket.on('showuserName', (userName) => {
      this.$data.addeduserName = userName;
    });
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  min-width: 720px;
  margin: 0;
}
.inner {
  width: 720px;
  margin: 0 auto;
}
header {
  background-color: #f7fbff;
  box-shadow: 0 0 4px #b9b9b9;
  margin: 0 0 20px;
  padding: 20px 6px;
}
header h1 {
  font-size: 26px;
  padding-left: 12px;
  display: flex;
  align-items: center;
}
main {
  min-height: calc(100vh - 237px);
}
footer {
  background-color: #e7e7e7;
  margin-top: 20px;
  padding: 12px 6px;
}
footer .copy {
  font-size: 18px;
}
</style>