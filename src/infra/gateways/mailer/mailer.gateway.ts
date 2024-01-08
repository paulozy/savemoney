import { Mailer, MailerInput } from "@core/domain/gateways/mailer.interface";
import { Transporter } from "nodemailer";

export class MailerProvider implements Mailer {
  constructor(
    private readonly transporter: Transporter
  ) { }

  async send({ to, subject, body }: MailerInput): Promise<void> {
    await this.transporter.sendMail({
      from: `"Save Money 💰💰💰" <${process.env.MAILER_MAIL}>`,
      to,
      subject,
      html: body
    })
  }
}