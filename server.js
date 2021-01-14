// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
var port = process.env.PORT || 3030;
// どこにアクセスさせるかの設定
// distフォルダ：コンパイルされたファイルが入る場所
app.use(express.static(__dirname + "/dist/"));

// SPAの時、ルーティングがうまくいかない時があるので以下の設定
// これをしていないと、https://~~~/aboutとかに行った時にリロードするとエラーがでる
// SPAだとaboutファイルを直で読み込んでいないから
// これでルート以外でリロードしてもindex.htmlを読み込んでちゃんとルーティングをしてくれる
// /.*/で全てのルートを指定。req(request), res(response)
app.get(/.*/, function(req, res) {
    res.sendfile(__dirname + "/dist/index.html");
});
const server = app.listen(port, function(){
  console.log('server started '+ port);
});

//以下Socket.io部分
const io = require('socket.io').listen(server)

// socketイベントの設定
io.on('connection', (socket) => {
  console.log('connected:', socket.id);

  // 切断時
  socket.on('disconnect', () => {
    console.log('disconnected:', socket.id);
  });

  // ユーザの参加
  socket.on('setUserName', (userName) => {
    if(!userName) userName = 'unknown';
    userName = "[入室] " + userName;
    socket.userName = userName;
    io.emit('showuserName', userName);
  });

  // タスクの追加
  socket.on('add', (text) => {
    console.log('added');
    io.emit('addtext', text);
  });

});