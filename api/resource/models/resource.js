"use strict";
const qr = require("qr-image");
const fs = require("fs");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(result) {
      var qr_svg = qr.image("invapp://app/resources?id=27", { type: 'png', ec_level: 'H', size: 10, margin: 0 });
      qr_svg.pipe(fs.createWriteStream("qr.png"));

      const fileStat = await fs.statSync("qr.png");
      const record = await strapi.plugins.upload.services.upload.upload({
        data: {
          refId: result.id,
          ref: "resource",
          field: "qr",
        },
        files: {
          path: "qr.png",
          name: `qr${result.id}.png`,
          type: "image/png", // mime type
          size: fileStat.size,
        },
      });
    },
  },
};
