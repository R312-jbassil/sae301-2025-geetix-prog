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
        "id": "json2429360655",
        "maxSize": 1,
        "name": "nom_modele",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json3949269562",
        "maxSize": 1,
        "name": "code_svg",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json345886070",
        "maxSize": 1,
        "name": "couleur_monture",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json3264248446",
        "maxSize": 1,
        "name": "couleur_branches",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
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
        "id": "_clone_rQc0",
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
        "id": "_clone_TKMb",
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
        "id": "_clone_sImR",
        "name": "utilisateur_email",
        "onlyDomains": null,
        "presentable": false,
        "required": true,
        "system": true,
        "type": "email"
      }
    ],
    "id": "pbc_1349257155",
    "indexes": [],
    "listRule": null,
    "name": "vue_lunettes_commandes",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  l.id AS id,\n  l.nom_modele,\n  l.code_svg,\n  l.couleur_monture,\n  l.couleur_branches,\n  cmd.created,\n  cmd.statut,\n  cmd.total,\n  cmd.mode_paiement,\n  cmd.adresse,\n  u.nom AS utilisateur_nom,\n  u.prenom AS utilisateur_prenom,\n  u.email AS utilisateur_email\nFROM commande cmd\nJOIN lunettes l ON cmd.id = l.id\nJOIN users u ON cmd.id = u.id;",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1349257155");

  return app.delete(collection);
})
