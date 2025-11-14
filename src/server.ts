import { Server } from 'http'
import app from './app'
import config from './config/index'
import mongoose from 'mongoose';
import { Server as IOServer, Socket } from 'socket.io';

let server: Server;

async function bootstrap() {
  try {
    server = app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`)
    });

    await mongoose.connect(config.database_url as string);
    console.log(`🛢️ Database is connected successfully`);

    const io = new IOServer(server, {
      cors: { origin: '*', methods: ['GET', 'POST'] },
    });

    io.on('connection', async (socket: Socket) => {
      console.log('Socket connected:', socket.id);

      socket.on("comment:add", async (comment) => {
        io.emit("comment:added", comment);
      });

      socket.on("comment:like", (payload) => {
        io.emit("comment:liked", payload);
      });
    });

  } catch (err) {
    console.error('Failed to connect database', err)
  }

}

bootstrap()