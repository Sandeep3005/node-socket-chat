/* eslint-disable no-console */

const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

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

  // Grab the event
  socket.on('createMessageEvent', () => {
    // data.createdAt = new Date().getTime();
    // io.emit('newMessageEvent', data);
    
    socket.emit('newMessageEvent', generateMessage('Admin', 'Welcome to chat app'));
    socket.broadcast.emit('newMessageEvent', generateMessage('Admin', 'New user joined chat app'));
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
