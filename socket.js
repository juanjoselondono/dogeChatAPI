const socketIO = require('socket.io');
function connect(server){
    var io = socketIO(server, {
      cors: {origin: "http://localhost:8000",
      methods: ["GET", "POST"],
      credentials: true
      }
  })
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });
    io.on('connection', (socket) => {
      socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });
    });
    io.on('connection', (socket) => {
      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
  });
}
module.exports ={
    connect
}