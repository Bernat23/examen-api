const estocService = require("../services/estocService");


const getAllEstocs = (req, res) => {
    const { venda, disponible } = req.query;
    try {
      const allEstoc = estocService.getAllEstocs({ venda, disponible });
      res.send({ status: "OK", data: allEstoc });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };
  
  const getOneEstoc = (req, res) => {
    const {
      params: { estocId },
    } = req;
  
    if (!estocId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':estocId' can not be empty" },
      });
      return;
    }
  
    try {
      const estoc = estocService.getOneEstoc(estocId);
      res.send({ status: "OK", data: estoc });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const getEstocForProducte = (req, res) => {
    const {
      query: { disponible },
    } = req.query
    const {
      params: { producteId },
    } = req;
  
    if (!producteId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':producteId' can not be empty" },
      });
      return;
    }
  
    try {
      const producte = estocService.getEstocForProducte(producteId, {disponible});
      res.send({ status: "OK", data: producte });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const getEstocForMaquina = (req, res) => {
    const {
      query: { disponible },
    } = req.query
    const {
      params: { maquinaId },
    } = req;
  
    if (!maquinaId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':maquinaId' can not be empty" },
      });
      return;
    }
  
    try {
      const maquina = estocService.getEstocForMaquina(maquinaId, {disponible});
      res.send({ status: "OK", data: maquina });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };
  
  const createNewEstoc = (req, res) => {
    const { body } = req;
  
    if (
      !body.producte ||
      !body.caducitat ||
      !body.data_venda ||
      !body.ubicacio ||
      !body.categoria
    ) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'producte', 'caducitat', 'data_venda', 'ubicacio'",
        },
      });
    }
  
    const nouEstoc = {
      producte: body.producte,
      caducitat: body.caducitat,
      data_venda: body.data_venda,
      categoria: body.categoria,
      ubicacio: body.ubicacio,
    };
  
    try {
      const createdEstoc = estocService.createNewEstoc(nouEstoc);
      res.status(201).send({ status: "OK", data: createdEstoc });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };
  
  const updateOneEstoc = (req, res) => {
    const {
      body,
      params: { estocId },
    } = req;
  
    if (!estocId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':estocId' can not be empty" },
      });
    }
  
    try {
      const updatedEstoc = estocService.updateOneEstoc(estocId, body);
      res.send({ status: "OK", data: updatedEstoc });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };
  
  const deleteOneEstoc = (req, res) => {
    const {
      params: { estocId },
    } = req;
  
    if (!estocId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':estocId' can not be empty" },
      });
    }
  
    try {
      estocService.deleteOneEstoc(estocId);
      res.status(204).send({ status: "OK" });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };


module.exports = {
    getAllEstocs,
    getOneEstoc,
    createNewEstoc,
    updateOneEstoc,
    deleteOneEstoc,
    getEstocForProducte,
    getEstocForMaquina,
};