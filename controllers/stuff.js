import Things from "../models/things.js";
import fs from "fs";

function createThing(req, res, next) {
  const thingObjet = JSON.parse(req.body.thing);
  delete req.body._id;
  delete req.body._userId;
  const thing = new Things({
    ...thingObjet,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet créé" }))
    .catch((error) => res.status(400).json({ error: error }));
}
function getOneThing(req, res, next) {
  Things.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error: error }));
}
function updateThing(req, res, next) {
  const thingObjet = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete thingObjet._userId;
  Things.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId != req.auth.userId) {
        res.status(401).json({ message: "Non autorisé" });
      } else {
        Things.updateOne(
          { _id: req.params.id },
          { ...thingObjet, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié" }))
          .catch((error) => res.status(400).json({ error: error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
}
function getAllThings(req, res, next) {
  Things.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(404).json({ error: error }));
}
function deleteThing(req, res, next) {
  Things.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId != req.auth.userId) {
        res.status(401).json({ message: "Non autorisée" });
      } else {
        const filename = thing.filename.imageUrl.split("/images/")[1];
        Things.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé" }))
          .catch(() => res.status(401).json({ message: "Non autorisée" }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
}

const functions = {
  createThing,
  getOneThing,
  updateThing,
  getAllThings,
  deleteThing,
};

export default functions;
