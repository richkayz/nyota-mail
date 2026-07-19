import { Injectable } from "@nestjs/common";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import {
  MailConnectionService,
  MailCredentials,
} from "./mail-connection.service";

export interface MailSummary {
  uid: number;
  from: string;
  subject: string;
  date: Date | undefined;
}

@Injectable()
export class MailService {
  constructor(
    private readonly connectionService: MailConnectionService,
  ) {}

  private createClient(credentials: MailCredentials): ImapFlow {
    return this.connectionService.createImapClient(credentials);
  }

  async getFolders(credentials: MailCredentials) {
    const client = this.createClient(credentials);

    await client.connect();

    const folders = await client.list();

    await client.logout();

    return folders.map((folder) => folder.path);
  }

  async getInbox(credentials: MailCredentials) {
    const client = this.createClient(credentials);

    await client.connect();

    await client.mailboxOpen("INBOX");

    const messages: MailSummary[] = [];

    for await (const message of client.fetch("1:*", {
      uid: true,
      envelope: true,
    })) {
      messages.push({
        uid: message.uid,
        from: message.envelope?.from?.[0]?.address ?? "",
        subject: message.envelope?.subject ?? "(No Subject)",
        date: message.envelope?.date,
      });
    }

    await client.logout();

    return messages.reverse();
  }

  async getMessage(uid: number, credentials: MailCredentials) {
    const client = this.createClient(credentials);

    await client.connect();

    await client.mailboxOpen("INBOX");

    const message = await client.fetchOne(uid, {
      uid: true,
      envelope: true,
      source: true,
    });

    await client.logout();

    if (!message || !message.source) {
      return null;
    }

    const parsed = await simpleParser(message.source);

    return {
      uid: message.uid,
      from: parsed.from?.text ?? "",
      to: parsed.to?.text ?? "",
      cc: parsed.cc?.text ?? "",
      subject: parsed.subject ?? "(No Subject)",
      date: parsed.date,
      text: parsed.text ?? "",
      html: parsed.html ? parsed.html.toString() : "",
      attachments: parsed.attachments.map((a) => ({
        filename: a.filename,
        contentType: a.contentType,
        size: a.size,
      })),
    };
  }
}