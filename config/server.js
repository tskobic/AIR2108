module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'f3702256b1405ceb791f10e8503d77f6'),
    },
    watchIgnoreFiles: [
      '**/invApp-strapi/qr.svg**',
      '**/AIR2108/qr.svg**',
      '**/invApp-strapi/qr.png**',
      '**/AIR2108/qr.png**',
      '**/invApp-strapi/qr-code.svg**',
      '**/AIR2108/qr-code.svg**',
    ]
  },
});
