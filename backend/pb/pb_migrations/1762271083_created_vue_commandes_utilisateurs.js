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
        "id": "json3848597695",
        "maxSize": 1,
        "name": "statut",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json3257917790",
        "maxSize": 1,
        "name": "total",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json2998603397",
        "maxSize": 1,
        "name": "mode_paiement",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json3277785110",
        "maxSize": 1,
        "name": "adresse",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_mv1I",
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
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_jd2q",
        "max": 0,
        "min": 0,
        "name": "utilisateur_prenom",
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
        "id": "_clone_ec5I",
        "name": "utilisateur_email",
        "onlyDomains": null,
        "presentable": false,
        "required": true,
        "system": true,
        "type": "email"
      }
    ],
    "id": "pbc_2414651593",
    "indexes": [],
    "listRule": null,
    "name": "vue_commandes_utilisateurs",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  cmd.id AS id,\n  cmd.created,\n  cmd.statut,\n  cmd.total,\n  cmd.mode_paiement,\n  cmd.adresse,\n  u.nom AS utilisateur_nom,\n  u.prenom AS utilisateur_prenom,\n  u.email AS utilisateur_email\nFROM commande cmd\nJOIN users u ON cmd.id = u.id;",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2414651593");

  return app.delete(collection);
})
