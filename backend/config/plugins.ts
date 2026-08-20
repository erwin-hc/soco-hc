import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
    email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env.int('SMTP_PORT', 465),
        secure: true,
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },        
      },
      settings: {
        defaultFrom: env('SMTP_FROM', 'no-reply@socohc.com'),
        defaultReplyTo: env('SMTP_REPLY_TO', 'no-reply@socohc.com'),
      },
    },
  },
});

export default config;
