import { request } from "@strapi/helper-plugin";

const labelsRequests = {
  getAllLocales: async () => {
    return await request("/strapi-plugin-label-manager/locales", {
      method: "GET",
    });
  },
  
  getAllLabels: async () => {
    return await request("/strapi-plugin-label-manager/find", {
      method: "GET",
    });
  },

  addLabel: async (data) => {
    return await request(`/strapi-plugin-label-manager/create`, {
      method: "POST",
      body: data,
    });
  },

  editLabel: async (id, value, newValue) => {
    return await request(`/strapi-plugin-label-manager/update/${id}`, {
      method: "PUT",
      body: { locale: value.locale, id: value.id, newValue: newValue },
    });
  },

  deleteLabel: async (id) => {
    return await request(`/strapi-plugin-label-manager/delete/${id}`, {
      method: "DELETE",
    });
  },
};

export default labelsRequests;
