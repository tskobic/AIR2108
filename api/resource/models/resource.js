"use strict";
const qr = require("qr-image");
const fs = require("fs");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
    },

    async afterCreate(result) {
      let id = result.id != null ? result.id : 2;
      let qr_svg = qr.image(`invapp://app/resources?id=${result.id}`, {
        type: "svg",
      });
      qr_svg.pipe(fs.createWriteStream("qr.svg"));

      const fileStat = fs.statSync("qr.svg");
      const record = await strapi.plugins.upload.services.upload.upload({
        data: {
          refId: result.id,
          ref: "resource",
          field: "qr",
        },
        files: {
          path: "qr.svg",
          name: `qr${result.id}.svg`,
          type: "image/svg+xml", // mime type
          size: fileStat.size,
        },
      });
    },
  },
};
