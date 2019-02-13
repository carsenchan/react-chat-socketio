const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const socketHandler = require('./socketEngine');

const port = process.env.PORT || 3002;

socketHandler(io);

server.listen(port, ()=>{
  console.log(`Server side had been start on PORT: ${port}`);
});