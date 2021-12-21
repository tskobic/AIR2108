"use strict";
var qrCode = require("qrcode");
var qr = require("qr-image");
var FormData = require('form-data');
var form = new FormData();
var fs = require("fs");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {

    // Ovaj dio generira qr kod, ovdje koristim drugi qr npm package
    //   data.name = "Some fixed name";

    //   var qr_svg = qr.image(JSON.stringify(data), { type: "svg" });

    //   const files = qr_svg.pipe(
    //     fs.createWriteStream("qr.svg")
    //   );


    //Tu sam pokušavao sa pozivanjem kontrolera za upload
    //   const body = { name: "qr", tag: "1", path: "i_love_qr.svg" };

    //   const uploadedFiles = await strapi.plugins.upload.controllers.upload({
    //     data: body,
    //     files: files,
    //   });


    //Ovdje sam pokušavao sa formdata poslat zahtjev za upload
    //   form.append("files", fs.createReadStream("i_love_qr.svg"));
    //   form.append(
    //     "data",
    //     JSON.stringify({
    //       alternativeText: "example",
    //     })
    //   );
    //   form.submit("http://localhost:1337/upload", (err, res) => {
    //   });
    },
  },
};
