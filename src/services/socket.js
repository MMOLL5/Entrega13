import socketIo from 'socket.io';
import { formatMessages } from '../utils/messages';
import fs from 'fs';

const data = {
  username: undefined,
  text: undefined,
};

export const initWsServer = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Nueva Conexion establecida!');

    //Listen for chat messages
    socket.on('chatMessage', (msg, userName) => {
      data.username = userName;
      data.text = msg;
      fs.appendFileSync('historico.txt', JSON.stringify(formatMessages(data))+'\n', error =>{
          if(error)
            console.log('Error al guardar el mensaje');
      });
      io.emit('message', formatMessages(data));
    });
  });

  return io;
};