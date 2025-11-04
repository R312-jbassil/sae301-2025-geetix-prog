/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "json2990389176",
        "maxSize": 1,
        "name": "created",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json1659857976",
        "maxSize": 1,
        "name": "prompt",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json1605820103",
        "maxSize": 1,
        "name": "reponse",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json54863248",
        "maxSize": 1,
        "name": "svg",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_y5Vs",
        "max": 255,
        "min": 0,
        "name": "utilisateur_nom",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "exceptDomains": null,
        "hidden": false,
        "id": "_clone_8WLk",
        "name": "utilisateur_email",
        "onlyDomains": null,
        "presentable": false,
        "required": true,
        "system": true,
        "type": "email"
      }
    ],
    "id": "pbc_3642548487",
    "indexes": [],
    "listRule": null,
    "name": "vue_ia_utilisateur",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  c.id AS id,\n  c.created,\n  c.prompt,\n  c.reponse,\n  c.svg,\n  u.nom AS utilisateur_nom,\n  u.email AS utilisateur_email\nFROM config_ia c\nJOIN users u ON c.id = u.id;",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3642548487");

  return app.delete(collection);
})
