export const startServer = server => {
  const io = require('socket.io')(server);

  io.on('connection', socket => {

  });
}