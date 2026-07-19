import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MailService } from "./mail.service";
import { SmtpService } from "./smtp.service";

@Controller("mail")
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly smtpService: SmtpService,
  ) {}

  @Get("folders")
  async getFolders() {
    return this.mailService.getFolders();
  }

  @Get("inbox")
  async getInbox() {
    return this.mailService.getInbox();
  }

  @Get("message/:uid")
  async getMessage(@Param("uid") uid: string) {
    return this.mailService.getMessage(Number(uid));
  }

  @Post("send")
  async sendMail(
    @Body()
    body: {
      to: string;
      cc?: string;
      bcc?: string;
      subject: string;
      text: string;
      html?: string;
    },
  ) {
    return this.smtpService.sendMail(body);
  }
}