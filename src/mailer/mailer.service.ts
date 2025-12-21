import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sgMail from '@sendgrid/mail';
import Handlebars from 'handlebars';
import fs from 'node:fs/promises';
import nodemailer from 'nodemailer';
import { AllConfigType } from '../config/config.type';
import { MailDriver } from '../mail/config/mail-config.type';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private readonly transporter: nodemailer.Transporter | null = null;
  private readonly mailDriver: MailDriver;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.mailDriver =
      configService.get('mail.driver', { infer: true }) || 'smtp';

    this.logger.log(
      `Initializing MailerService with driver: ${this.mailDriver}`,
    );

    if (this.mailDriver === 'sendgrid') {
      const apiKey = configService.get('mail.sendgridApiKey', { infer: true });
      if (!apiKey) {
        throw new Error(
          'SENDGRID_API_KEY is required when using sendgrid driver',
        );
      }
      sgMail.setApiKey(apiKey);
      this.logger.log('SendGrid configured successfully');
    } else {
      // SMTP transport
      this.logger.log('Mail Config:', {
        host: configService.get('mail.host', { infer: true }),
        port: configService.get('mail.port', { infer: true }),
        secure: configService.get('mail.secure', { infer: true }),
        user: configService.get('mail.user', { infer: true }),
      });
      this.transporter = nodemailer.createTransport({
        host: configService.get('mail.host', { infer: true }),
        port: configService.get('mail.port', { infer: true }),
        ignoreTLS: configService.get('mail.ignoreTLS', { infer: true }),
        secure: configService.get('mail.secure', { infer: true }),
        requireTLS: configService.get('mail.requireTLS', { infer: true }),
        auth: {
          user: configService.get('mail.user', { infer: true }),
          pass: configService.get('mail.password', { infer: true }),
        },
      });
    }
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: nodemailer.SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = Handlebars.compile(template, {
        strict: true,
      })(context);
    }

    const from = mailOptions.from
      ? mailOptions.from
      : `"${this.configService.get('mail.defaultName', {
          infer: true,
        })}" <${this.configService.get('mail.defaultEmail', {
          infer: true,
        })}>`;

    const finalHtml = mailOptions.html ? String(mailOptions.html) : html;

    if (this.mailDriver === 'sendgrid') {
      await this.sendWithSendGrid({
        to: mailOptions.to as string,
        from: from as string,
        subject: mailOptions.subject as string,
        text: mailOptions.text as string,
        html: finalHtml,
      });
    } else {
      await this.transporter!.sendMail({
        ...mailOptions,
        from,
        html: finalHtml,
      });
    }
  }

  private async sendWithSendGrid(options: {
    to: string;
    from: string;
    subject: string;
    text?: string;
    html?: string;
  }): Promise<void> {
    try {
      await sgMail.send({
        to: options.to,
        from: options.from,
        subject: options.subject,
        text: options.text || '',
        html: options.html || options.text || '',
      });
      this.logger.log(`Email sent successfully via SendGrid to ${options.to}`);
    } catch (error) {
      this.logger.error('SendGrid error:', error);
      throw error;
    }
  }
}
