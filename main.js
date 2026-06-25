const WebSocket = require('ws');
require('dotenv').config();


const port = process.env.PORT || 3100;
const wss = new WebSocket.Server({ port });

wss.on('listening', () => {
  console.log(`WebSocket aberto na porta ${port}`);
});

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('error', (error) => {
    console.error('Erro na conexão WebSocket:', error);
  });

  ws.on('message', (message) => {
    console.log(message.toString());
    ws.send(`Mensagem recebida!`);
    if (message.toString().trim() === 'encerrar') {
      ws.close();
    }
    
    if (message.toString().trim() === 'encerrar servidor') {
        ws.send('Desconectando o seu cliente e encerrando o servidor WebSocket...');
        wss.clients.forEach((cliente) => {
            if (cliente.readyState === WebSocket.OPEN) {
                cliente.send('Servidor WebSocket encerrado. Desconectando...');
                cliente.close();
            }
        });
        wss.close(() => {
            console.log(1001, 'Servidor WebSocket encerrado');
            process.exit(0); 
        });
        return;
    }
  });
});
