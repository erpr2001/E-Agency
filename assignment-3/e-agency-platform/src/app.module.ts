import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { AdminModule } from './admin/admin.module';
import { GalleryModule } from './gallery/gallery.module';

import dotenv from 'dotenv';
dotenv.config(); // This loads the environment variables from your .env file


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_STRING'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    BookingsModule,
    AdminModule,
    GalleryModule,
  ],
})
export class AppModule {}