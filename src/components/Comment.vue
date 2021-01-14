<template>
<transition-group tag="ul" class="commentList" name="flip">
    <li
        v-for="item in $props.commentList"
        :key="item.id"
        class="item"
        @click="$emit('check', item.id)"
    >
        <span class="item__text">{{ item.text }}</span>
        <button @click="onDeleteTodo($event, item.id)">削除</button>
    </li>
</transition-group>
</template>

<script>
export default {
    name: Comment,
    props: {
      commentList: {
      id: Number,
      text: String
    }
    },
  methods: {
    /**
     * 削除ボタンをクリックした時
     * @param {event} event - DOMのイベント
     * @param {number} todoId - TODOのID
     */
    onDeleteTodo(event, todoId) {
      event.stopPropagation();
      this.$emit('delete', todoId);
    }
}
}
</script>

<style scoped>
.commentList {
    margin: 40px 0 0;
    padding: 0;
    text-align: left;
}
 .commentList > li {
     position: relative;
     display: flex;
     align-items: center;
     padding: 0;
 }
 .commentList > li + li {
     margin-top: 16px;
 }
 .commentList > li > input {
     margin-right: 10px;
     border: 0;
 }
 .commentList > li > button {
     position: absolute;
     color: #333333;
     background-color: #ffebeb;
     border: 1px solid #ffbaba;
     border-radius: 20px;
     top: 50%;
     right: 0;
     width: 120px;
     margin-top: -12px;
     padding: 2px 10px;
 }
 .commentList > li > button:hover,
 .commentList > li > button:active {
     background-color: #ffebeb;
     border: 2px solid #ffb4b4;
 }
</style>