const WebSocket = require('ws');
require('dotenv').config();


const port = process.env.PORT || 3100;
const wss = new WebSocket.Server({ port });

wss.on('listening', () => {
  console.log(`WebSocket aberto na porta ${port}`);
});

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (message) => {
    console.log('Mensagem recebida:', message.toString());
  });
});

wss.on('listening')