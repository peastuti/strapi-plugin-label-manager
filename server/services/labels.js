"use strict";

module.exports = ({ strapi }) => ({
  async locales(query) {
    var out_arr = [];
    const response = await strapi.entityService.findMany(
      "plugin::i18n.locale",
      query
    );

    for (const locale of response) {
      out_arr.push(locale["code"]);
    }
    return out_arr;
  },

  async find(query) {
    const response = await strapi.entityService.findMany("api::label.label", {
      populate: { localizations: true },
    });
    const locales = await strapi.entityService.findMany(
      "plugin::i18n.locale",
      query
    );

    var output = [];

    for (const element of response) {
      var out_el = {};
      out_el["key"] = element["key"];
      out_el["values"] = [];

      out_el["values"].push({
        value: element["value"],
        id: element["id"],
        locale: "en",
      });

      for (const locale of locales) {
        let found = false;

        for (const localization of element["localizations"]) {
          if (locale["code"] == localization["locale"]) {
            out_el["values"].push({
              value: localization["value"],
              id: localization["id"],
              locale: localization["locale"],
            });
            found = true;
          }
        }
        if (!found && locale["code"] != "en")
          out_el["values"].push({ locale: locale["code"] });
      }
      output.push(out_el);
    }
    return output;
  },

  async delete(key) {
    console.log("delete " + key);

    const entries = await strapi.entityService.findMany("api::label.label", {
      filters: { key: key },
      populate: { localizations: true },
    });

    for (const element of entries) {
      for (const localization of element.localizations)
        await strapi.entityService.delete("api::label.label", localization.id);
      await strapi.entityService.delete("api::label.label", element.id);
    }

    return {};
  },

  async create(data) {
    console.log("create");
    console.log(data);

    return await strapi.entityService.create("api::label.label", {
      data: {
        key: data.key,
        value: data.value,
      },
    });
  },

  async update(id, data) {
    console.log(id);
    console.log(data);

    if (data.id) {
      // case update coz it already exists
      return await strapi.entityService.update("api::label.label", data.id, {
        data: {
          value: data.newValue,
          locale: data.locale,
        },
      });
    } else {
      // use the main id (en-locale) to create the localization
      console.log("use the main id (en-locale) to create the localization");

      const entry = await strapi.entityService.findOne("api::label.label", id, {
        populate: { localizations: true },
      });

      // all ids -> en + localizations
      let allIds = [parseInt(id)];
      for (const localization of entry.localizations)
        allIds.push(localization.id);

      const newEntry = await strapi.entityService.create("api::label.label", {
        data: {
          key: entry.key,
          value: data.newValue,
          locale: data.locale,
          localizations: allIds,
        },
      });
      allIds.push(newEntry.id);

      for (const id of allIds) {
        await strapi.query("api::label.label").update({
          where: { id: id },
          data: { localizations: allIds.filter((tid) => tid != id) },
        });
      }
    }

    console.log("update");
    return {};
  },
});
