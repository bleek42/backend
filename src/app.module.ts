import { Module } from '@nestjs/common';

import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { PostsController } from './posts/posts.controller';

import { HttpErrorFilter } from './error/http-error.filter';
import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController, UserController, PostsController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    AppService,
  ],
  exports: [],
})
export class AppModule {}
