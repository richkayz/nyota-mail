import { Injectable } from "@nestjs/common";
import {
  MailConnectionService,
  MailCredentials,
} from "./mail-connection.service";

@Injectable()
export class SmtpService {
  constructor(
    private readonly connectionService: MailConnectionService,
  ) {}

  async sendMail(
    credentials: MailCredentials,
    data: {
      to: string;
      cc?: string;
      bcc?: string;
      subject: string;
      text: string;
      html?: string;
    },
  ) {
    const transporter =
      this.connectionService.createSmtpTransport(credentials);

    const info = await transporter.sendMail({
      from: `"Nyota Mail" <${credentials.email}>`,
      to: data.to,
      cc: data.cc,
      bcc: data.bcc,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  }
}