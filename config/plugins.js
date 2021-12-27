'use strict';

module.exports = ({ env }) => ({
    upload: {
      provider: 'azure-storage',
      providerOptions: {
        account: env('STORAGE_ACCOUNT'),
        accountKey: env('STORAGE_ACCOUNT_KEY'),
        containerName: env('STORAGE_CONTAINER_NAME'),
        defaultPath: 'assets',
        maxConcurrent: 10
      }
    },

    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'smtp.ethereal.email'),
          port: env('SMTP_PORT', 587),
          auth: {
            user: env('judge.doyle49@ethereal.email'),
            pass: env('8vJqWzzVYCRTGqUvub'),
          },
          // ... any custom nodemailer options
        },
        settings: {
          defaultFrom: 'judge.doyle49@ethereal.email',
          defaultReplyTo: 'judge.doyle49@ethereal.email',
        },
      },
    },
  });



  /*
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('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'),
        //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
        //
      },
      settings: {
        defaultFrom: 'strapitesting@gmail.com',
        defaultReplyTo: 'strapitesting@gmail.com',
      },
    },
  },
*/
