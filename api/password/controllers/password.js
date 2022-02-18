'use strict';

/**
 * api/password/controllers/password.js
 */

const { sanitizeEntity } = require('strapi-utils');
const formatError = error => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

module.exports = {
  index: async ctx => {
    // const params = JSON.parse(ctx.request.body);
    const params = ctx.request.body;

    // The identifier is required.
    if (!params.identifier) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.email.provide',
          message: 'Please provide your username or your e-mail.',
        })
      );
    }

    // The password is required.
    if (!params.password) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.password.provide',
          message: 'Please provide your password.',
        })
      );
    }

    // The new password is required.
    if (!params.newPassword) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.password.provide',
          message: 'Please provide your new password.',
        })
      );
    }

    // The new password confirmation is required.
    if (!params.confirmPassword) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.password.provide',
          message: 'Please provide your new password confirmation.',
        })
      );
    }

    if (
      params.newPassword &&
      params.confirmPassword &&
      params.newPassword !== params.confirmPassword
    ) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.password.matching',
          message: 'New Passwords do not match.',
        })
      );
    } else if (
      params.newPassword &&
      params.confirmPassword &&
      params.newPassword === params.confirmPassword
    ) {

      // Get User based on identifier
      const user = await strapi.query('user', 'users-permissions').findOne({username: params.identifier});

      // Validate given password against user query result password
      const validPassword = await strapi.plugins[
        'users-permissions'
      ].services.user.validatePassword(params.password, user.password);

      if (!validPassword) {
        return ctx.badRequest(
          null,
          formatError({
            id: 'Auth.form.error.invalid',
            message: 'Identifier or password invalid.',
          })
        );
      } else {

        // Generate new hash password
        const password = await strapi.plugins['users-permissions'].services.user.hashPassword({
          password: params.newPassword,
        });

        // Update user password
        await strapi
          .query('user', 'users-permissions')
          .update({ id: user.id }, { resetPasswordToken: null, password });

        // Return new jwt token
        ctx.send({
          jwt: strapi.plugins['users-permissions'].services.jwt.issue({
            id: user.id,
          }),
          user: sanitizeEntity(user.toJSON ? user.toJSON() : user, {
            model: strapi.query('user', 'users-permissions').model,
          }),
        });
      }
    }
  }
};