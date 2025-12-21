export type MailDriver = 'smtp' | 'sendgrid';

export type MailConfig = {
  driver: MailDriver;
  port: number;
  host?: string;
  user?: string;
  password?: string;
  defaultEmail?: string;
  defaultName?: string;
  ignoreTLS: boolean;
  secure: boolean;
  requireTLS: boolean;
  // SendGrid specific
  sendgridApiKey?: string;
};
