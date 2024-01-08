export type MailerInput = {
  to: string
  subject: string
  body: string
}

export interface Mailer {
  send(input: MailerInput): Promise<void>
}