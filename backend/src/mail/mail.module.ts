import { Module } from "@nestjs/common";
import { MailController } from "./mail.controller";
import { MailService } from "./mail.service";
import { SmtpService } from "./smtp.service";
import { MailConnectionService } from "./mail-connection.service";

@Module({
  controllers: [MailController],
  providers: [
    MailService,
    SmtpService,
    MailConnectionService,
  ],
  exports: [
    MailService,
    SmtpService,
    MailConnectionService,
  ],
})
export class MailModule {}