import { Injectable } from "@nestjs/common";
import { ImapFlow } from "imapflow";
import * as nodemailer from "nodemailer";

export interface MailCredentials {
  email: string;
  password: string;
}

@Injectable()
export class MailConnectionService {
  createImapClient(credentials: MailCredentials) {
    return new ImapFlow({
      host: process.env.IMAP_HOST!,
      port: Number(process.env.IMAP_PORT),
      secure: process.env.IMAP_SECURE === "true",

      auth: {
        user: credentials.email,
        pass: credentials.password,
      },
    });
  }

  createSmtpTransport(credentials: MailCredentials) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",

      auth: {
        user: credentials.email,
        pass: credentials.password,
      },
    });
  }
}