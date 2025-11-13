import { Server } from 'http'
import app from './app'
import config from './config/index'
import mongoose from 'mongoose';

let server: Server;

async function bootstrap() {
  try {
    server = app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`)
    });

    await mongoose.connect(config.database_url as string);

    console.log(`🛢️ Database is connected successfully`);

  } catch (err) {
    console.error('Failed to connect database', err)
  }

}

bootstrap()