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
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_SAOo",
        "max": 0,
        "min": 0,
        "name": "nom_modele",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "_clone_pZEc",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_iWbV",
        "max": 0,
        "min": 0,
        "name": "code_svg",
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
        "id": "_clone_67iG",
        "max": 0,
        "min": 0,
        "name": "largeur_pont",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "_clone_xswL",
        "max": null,
        "min": null,
        "name": "taille_verres",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_bF4C",
        "max": 0,
        "min": 0,
        "name": "couleur_monture",
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
        "id": "_clone_3chG",
        "max": 0,
        "min": 0,
        "name": "couleur_branches",
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
        "id": "_clone_ct4T",
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
        "id": "_clone_pozz",
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
        "id": "_clone_blDP",
        "name": "utilisateur_email",
        "onlyDomains": null,
        "presentable": false,
        "required": true,
        "system": true,
        "type": "email"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_XpnW",
        "max": 0,
        "min": 0,
        "name": "prompt_ia",
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
        "id": "_clone_99bk",
        "max": 0,
        "min": 0,
        "name": "svg_ia",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      }
    ],
    "id": "pbc_1013163381",
    "indexes": [],
    "listRule": null,
    "name": "vue_lunettes_utilisateurs",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  l.id AS id,\n  l.nom_modele,\n  l.created,\n  l.code_svg,\n  l.largeur_pont,\n  l.taille_verres,\n  l.couleur_monture,\n  l.couleur_branches,\n  u.nom AS utilisateur_nom,\n  u.prenom AS utilisateur_prenom,\n  u.email AS utilisateur_email,\n  c.prompt AS prompt_ia,\n  c.svg AS svg_ia\nFROM Lunettes l\nJOIN users u ON l.id = u.id\nLEFT JOIN Config_IA c ON l.id = c.id;",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1013163381");

  return app.delete(collection);
})
