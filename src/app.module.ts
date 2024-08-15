import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './url/url.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),//Path to public folder
    RateLimiterModule.register({ points: 10, duration: 60 }),
    UsersModule,
    CacheModule.register({ ttl: 5, max: 100 }),
    MongooseModule.forRoot(process.env.DB_URI),
    UrlModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RateLimiterGuard }, {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor, //Using global caching for all routes
  }],
})
export class AppModule { }
