const express = require("express");

const producteController = require("../../controllers/producteController");
const estocController = require("../../controllers/estocController");

const router = express.Router();

router
  .get("/", producteController.getAllProductes)
  .get("/:producteId", producteController.getOneProducte)
  .get("/:producteId/estocs", estocController.getEstocForProducte)
  .post("/", producteController.createNewProducte)
  .patch("/:producteId", producteController.updateOneProducte)
  .delete("/:producteId", producteController.deleteOneProducte);
  

module.exports = router;
