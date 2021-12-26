'use strict';

module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('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'),
        //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
        //
      },
      settings: {
        defaultFrom: 'invappstrapi@gmail.com',
        defaultReplyTo: 'invappstrapi@gmail.com',
      },
    },
  },
  // ...
});