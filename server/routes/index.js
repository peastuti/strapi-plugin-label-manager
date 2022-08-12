module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },

  {
    method: "GET",
    path: "/locales",
    handler: "labels.locales",
    config: {
      policies: [],
      auth: false,
    },
  },

  {
    method: "GET",
    path: "/find",
    handler: "labels.find",
    config: {
      policies: [],
      auth: false,
    },
  },

  {
    method: "POST",
    path: "/create",
    handler: "labels.create",
    config: {
      policies: [],
    },
  },

  {
    method: "DELETE",
    path: "/delete/:key",
    handler: "labels.delete",
    config: {
      policies: [],
    },
  },

  {
    method: "PUT",
    path: "/update/:id",
    handler: "labels.update",
    config: {
      policies: [],
    },
  },

];
