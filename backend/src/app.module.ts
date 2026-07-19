import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import appConfig from "./config/env/app.config";
import jwtConfig from "./config/env/jwt.config";
import mailConfig from "./config/env/mail.config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        jwtConfig,
        mailConfig,
      ],
    }),
    AuthModule,
    MailModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}