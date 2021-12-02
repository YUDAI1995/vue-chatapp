const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../dist/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//Socket.io
io.on('connection', (socket) => {
  socket.on('event', (data) => {
    console.log(data);
  });
});

io.on('connection', (socket) => {
  console.log('connected:', socket.id);

  socket.on('joinRoom', (data) => {
    socket.join(data.room);
    console.log(`user with ID${socket.id} joined room ${data.room}`);
  });

  // 切断時
  socket.on('disconnect', () => {
    console.log('disconnected:', socket.id);
  });

  // message送信
  socket.on('sendMessage', (messageData) => {
    io.to(messageData.room).emit('receveMessage', messageData);
  });
});

server.listen(port, () => {
  console.log(`listening on *: ${port}`);
});
