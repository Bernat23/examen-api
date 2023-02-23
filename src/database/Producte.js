const DB = require("./db.json");

const { saveToDatabase } = require("./utils");


const getAllProductes = () => {
  try {
    let producte = DB.producte;
    return producte;
  } catch (error) {
    throw { status: 500, message: error };
  }
};


const getOneProducte = (producteId) => {
    try {
      const producte = DB.producte.find((producte) => producte.id === producteId);
  
      if (!producte) {
        throw {
          status: 400,
          message: `Can't find producte with the id '${producteId}'`,
        };
      }
  
      return producte;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };


  const createNewProducte = (nouProducte) => {
    try {
      const isAlreadyAdded =
        DB.producte.findIndex((producte) => producte.nom === nouProducte.nom) > -1;
  
      if (isAlreadyAdded) {
        throw {
          status: 400,
          message: `producte with the name '${nouProducte.nom}' already exists`,
        };
      }
  
      DB.producte.push(nouProducte);
      saveToDatabase(DB);
  
      return nouProducte;
    } catch (error) {
      throw { status: 500, message: error?.message || error };
    }
  };
  
  const updateOneProducte = (producteId, changes) => {
    try {
      const isAlreadyAdded =
        DB.producte.findIndex((producte) => producte.nom === changes.nom) > -1;
  
      if (isAlreadyAdded) {
        throw {
          status: 400,
          message: `producte with the name '${changes.nom}' already exists`,
        };
      }
  
      const indexForUpdate = DB.producte.findIndex(
        (producte) => producte.id === producteId
      );
  
      if (indexForUpdate === -1) {
        throw {
          status: 400,
          message: `Can't find producte with the id '${producteId}'`,
        };
      }
  
      const updatedProducte = {
        ...DB.producte[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      };
  
      DB.producte[indexForUpdate] = updatedProducte;
      saveToDatabase(DB);
  
      return updatedProducte;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };
  
  const deleteOneProducte = (producteId) => {
    try {
      const indexForDeletion = DB.producte.findIndex(
        (producte) => producte.id === producteId
      );
      if (indexForDeletion === -1) {
        throw {
          status: 400,
          message: `Can't find producte with the id '${producteId}'`,
        };
      }
      DB.producte.splice(indexForDeletion, 1);
      saveToDatabase(DB);
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };




module.exports = {
    getAllProductes,
    getOneProducte,
    createNewProducte,
    updateOneProducte,
    deleteOneProducte,
    
};