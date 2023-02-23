const express = require("express");

const estocController = require("../../controllers/estocController");

const router = express.Router();

router
  .get("/", estocController.getAllEstocs)
  .get("/:estocId", estocController.getOneEstoc)  
  .post("/", estocController.createNewEstoc)
  .patch("/:estocId", estocController.updateOneEstoc)
  .delete("/:estocId", estocController.deleteOneEstoc);

module.exports = router;
