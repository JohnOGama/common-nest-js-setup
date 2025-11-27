import { getConnectionString } from '@/db/drizzle.config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class PostgreListenerService implements OnModuleInit {
  private client: Client;
  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.client = new Client({
      connectionString: getConnectionString(this.configService),
    });

    await this.client.connect();
    await this.client.query('LISTEN product_changes');

    this.client.on('notification', (msg) => {
      if (!msg.payload) return;
      const payload = JSON.parse(msg.payload);
      console.log('raw msg', msg);
      console.log('payload', payload);
    });

    console.log('✔ PostgreSQL Listener is running...');
  }
}
