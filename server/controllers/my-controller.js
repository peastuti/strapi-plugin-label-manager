'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('label-manager')
      .service('myService')
      .getWelcomeMessage();
  },
});
