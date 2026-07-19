import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MailService } from "./mail.service";
import { SmtpService } from "./smtp.service";
import { MailCredentials } from "./mail-connection.service";

@Controller("mail")
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly smtpService: SmtpService,
  ) {}

  @Post("folders")
  async getFolders(@Body() credentials: MailCredentials) {
    return this.mailService.getFolders(credentials);
  }

  @Post("inbox")
  async getInbox(@Body() credentials: MailCredentials) {
    return this.mailService.getInbox(credentials);
  }

  @Post("message/:uid")
  async getMessage(
    @Param("uid") uid: string,
    @Body() credentials: MailCredentials,
  ) {
    return this.mailService.getMessage(Number(uid), credentials);
  }

  @Post("send")
  async sendMail(
    @Body()
    body: MailCredentials & {
      to: string;
      cc?: string;
      bcc?: string;
      subject: string;
      text: string;
      html?: string;
    },
  ) {
    const { email, password, ...data } = body;

    return this.smtpService.sendMail(
      { email, password },
      data,
    );
  }
}