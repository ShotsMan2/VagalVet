import 'dotenv/config';
import app from './app.js';
import logger from './utils/logger.js';
import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  logger.info(`Backend server running on http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });
wss.on('connection', (ws) => {
  logger.info('Client connected to WebSocket');
});
app.set('wss', wss);
