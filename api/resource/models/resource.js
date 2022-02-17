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
      let qr_svg = qr.image(JSON.stringify(result), { type: "svg" });
      qr_svg.pipe(fs.createWriteStream("qr-code.svg"));

      const fileStat = await fs.statSync("qr-code.svg");
      const record = await strapi.plugins.upload.services.upload.upload({
        data: {
          refId: result.id,
          ref: "resource",
          field: "qr",
        },
        files: {
          path: "qr-code.svg",
          name: `qr${result.id}-code.svg`,
          type: "image/svg+xml", // mime type
          size: fileStat.size,
        },
      });
    },
  },
};
