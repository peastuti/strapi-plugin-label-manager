"use strict";

module.exports = {
  async locales(ctx) {
    try {
      return await strapi
        .plugin("label-manager")
        .service("labels")
        .locales(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async find(ctx) {
    try {
      return await strapi
        .plugin("label-manager")
        .service("labels")
        .find(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async delete(ctx) {
    try {
      ctx.body = await strapi
        .plugin("label-manager")
        .service("labels")
        .delete(ctx.params.key);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async create(ctx) {
    try {
      ctx.body = await strapi
        .plugin("label-manager")
        .service("labels")
        .create(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async update(ctx) {
    try {
      ctx.body = await strapi
        .plugin("label-manager")
        .service("labels")
        .update(ctx.params.id, ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
