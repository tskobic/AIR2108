module.exports = {

    index: async ctx =>{
        await strapi.plugins['email'].services.email.send({
            to:"invappstrapi@gmail.com",
            from:"invappstrapi@gmail.com",
            replyTo:"invappstrapi@gmail.com",
            subject: 'Use strapi email provider successfully',
            text: 'Hello world!',
          });
        
        var crypto = require("crypto");
        var pass = crypto.randomBytes(10).toString('hex');

        ctx.body= {
            "newPassword":pass,
        };
    }
}