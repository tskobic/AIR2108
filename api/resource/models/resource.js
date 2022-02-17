"use strict";
const qr = require("qr-image");
const test = require("qrcode");

const fs = require("fs");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      let qr_svg = qr.image("test", { type: "svg" });
      qr_svg.pipe(fs.createWriteStream("./qr.svg"));
      // let entries = await strapi.query('resource').find({ _sort: 'id:desc' });
      // let image = test.toFile("qr.png", `invapp://resources?id=${entries[0].id+1}`);
      // console.log("test");
    },

    async afterCreate(result) {
      // let image = test.toFile("qr.png", "test");
      let qr_svg = qr.image(`invapp://app/resources?id=${result.id}`, { type: "svg" });
      qr_svg.pipe(fs.createWriteStream("./qr.svg"));

      const fileStat = fs.statSync("qr.svg");

      const record = await strapi.plugins.upload.services.upload.upload({
        data: {
          refId: result.id,
          ref: "resource",
          field: "qr",
        },
        files: {
          path: "./qr.svg",
          name: `qr${result.id}.svg`,
          type: "image/svg+xml", // mime type
          size: fileStat.size,
        },
      });
    },
  },
};
