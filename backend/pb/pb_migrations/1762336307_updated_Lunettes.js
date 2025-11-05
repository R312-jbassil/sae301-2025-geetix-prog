/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3758190954")

  // add field
  collection.fields.addAt(9, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2716722970",
    "hidden": false,
    "id": "relation416669013",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "materiau",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3758190954")

  // remove field
  collection.fields.removeById("relation416669013")

  return app.save(collection)
})
