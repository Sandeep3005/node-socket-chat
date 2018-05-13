/* eslint-disable no-console */
const socket = io();
let data;
socket.on('connect', () => {
  console.log('connected to server');

  data = { from: 'SandeepC', text: 'Can we watch Avengers tonight ?'}
  socket.emit('createMessageEvent', data);
});

socket.on('newMessageEvent', (data) => {
  console.log('new message read at ', data.createdAt);
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

// socket.on('newEmail', (data) => {
//   console.log('new Email Arrived', data);
// });

// socket.emit('emailRead', data);
