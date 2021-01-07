import * as dotenv from 'dotenv';
dotenv.config();

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import EnvConfig from './config.interface';

class ConfigService {
  constructor(readonly envConfig: EnvConfig) {
    this.envConfig = envConfig;
  }

  private getValue(key: string): string {
    const value = this.envConfig[key];

    if (!value) throw new Error(`${value} missing in env file!`);

    return value;
  }

  public setValues(keys: string[]): ConfigService {
    keys.forEach(key => this.getValue(key));
    return this;
  }

  public getPort() {
    return this.getValue('MYSQL_PORT');
  }

  public getNodeEnv() {
    const nodeEnv = this.getValue('NODE_ENV');
    return nodeEnv;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.getValue('MYSQL_HOST'),
      port: Number.parseInt(this.getValue('MYSQL_PORT')),
      username: this.getValue('MYSQL_USERNAME'),
      password: this.getValue('MYSQL_PASSWORD'),
      database: this.getValue('MYSQL_DATABASE'),

      entities: ['**/*.entity{.ts, .js}'],

      migrations: ['src/migrations/*.ts'],
      migrationsTableName: 'migrations',

      cli: {
        migrationsDir: 'src/migrations',
      },
    };
  }
}

export const configService = new ConfigService(process.env).setValues([
  'MYSQL_HOST',
  'MYSQL_PORT',
  'MYSQL_USERNAME',
  'MYSQL_PASSWORD',
  'MYSQL_DATABASE',
]);

console.log(configService);
