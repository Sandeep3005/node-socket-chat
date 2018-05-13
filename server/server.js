/* eslint-disable no-console */

const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);

const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('CONNECTED TO CLIENT');

  socket.on('disconnect', () => {
    console.log('DISCONNECTED FROM CLIENT');
  });

  // Emit new event
  // const data = { subject: 'HI', time: new Date().toString() };
  // socket.emit('newEmail', data);

  // Grab the event
  socket.on('createMessageEvent', (data) => {
    data.createdAt = new Date().getTime();
    io.emit('newMessageEvent', data);
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
