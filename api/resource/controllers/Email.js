module.exports = {

    index: async ctx =>{

        var crypto = require("crypto");
        var pass = crypto.randomBytes(10).toString('hex');
        
        var params = ctx.request.body;

        const user = await strapi.query('user', 'users-permissions').findOne({email: params.identifier});
        const password = await strapi.plugins['users-permissions'].services.user.hashPassword({password: pass});
        
        if (!user) {
            return ctx.badRequest('Email does not exist')
          }

        await strapi
            .query('user', 'users-permissions')
            .update({ id: user.id }, { resetPasswordToken: null, password });

        console.log(pass);
        ctx.send("Password changed")
        
        await strapi.plugins['email'].services.email.send({
            to:"judge.doyle49@ethereal.email",
            from:"judge.doyle49@ethereal.email",
            replyTo:"judge.doyle49@ethereal.email",
            subject: 'Password reset - STRAPI',
            text: `This is your new password ${pass}`,
            
          });
          
    }
}