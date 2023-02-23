const DB = require("./db.json");

const { saveToDatabase } = require("./utils");


const getAllEstocs = (filterParams) => {
  try {
    let estoc = DB.estoc;
    if (filterParams.venda) {
      /*return DB.estoc.filter((estoc) =>
        estoc.data_venda.toLowerCase().includes(filterParams.data_venda)
      );*/
      const filteredEstoc = DB.estoc.filter((estoc) => {
        const estocDate = new Date(estoc.data_venda);
        const filterDate = new Date(filterParams.venda);
        return estocDate.getTime() === filterDate.getTime();
      });
      return filteredEstoc;
    }
    if (filterParams.disponible) {
      const filteredEstoc = DB.estoc.filter((estoc) => {
        if(!estoc.data_venda) {
          return true;
        }
        const caducitatDate = new Date(estoc.caducitat);
        const filterDate = new Date();
        caducitatDate.setHours(0, 0, 0, 0);
        filterDate.setHours(0, 0, 0, 0); 
        return caducitatDate.getTime() < filterDate.getTime();
      });
      return filteredEstoc;
    }
    return estoc;
  } catch (error) {
    throw { status: 500, message: error };
  }
};


const getOneEstoc = (estocId) => {
    try {
      const estoc = DB.estoc.find((estoc) => estoc.id === estocId);
  
      if (!estoc) {
        throw {
          status: 400,
          message: `Can't find estoc with the id '${estocId}'`,
        };
      }
  
      return estoc;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };


  const getEstocForProducte = (producteId, filterParams) => {
    try {
      const estoc = DB.estoc.filter((estoc) => estoc.producte === producteId);
      if (!estoc) {
        throw {
          status: 400,
          message: `Can't find estoc with the id '${producteId}'`,
        };
      }
      if (filterParams.disponible) {
        const filteredEstoc = DB.estoc.filter((estoc) => {
          if(!estoc.data_venda) {
            return true;
          }
          const caducitatDate = new Date(estoc.caducitat);
          const filterDate = new Date();
          caducitatDate.setHours(0, 0, 0, 0);
          filterDate.setHours(0, 0, 0, 0); 
          return caducitatDate.getTime() < filterDate.getTime() && estoc.producte == producteId;
        });
        return filteredEstoc;
      }
  
      return estoc;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  /*const getEstocForMaquina = (maquinaId, filterParams) => {
    try {
      const estoc = DB.estoc.filter((estoc) => estoc.maquina === producteId);
      if (!estoc) {
        throw {
          status: 400,
          message: `Can't find estoc with the id '${producteId}'`,
        };
      }
      if (filterParams.disponible) {
        const filteredEstoc = DB.estoc.filter((estoc) => {
          if(!estoc.data_venda) {
            return true;
          }
          const caducitatDate = new Date(estoc.caducitat);
          const filterDate = new Date();
          caducitatDate.setHours(0, 0, 0, 0);
          filterDate.setHours(0, 0, 0, 0); 
          return caducitatDate.getTime() < filterDate.getTime() && estoc.producte == producteId;
        });
        return filteredEstoc;
      }
  
      return estoc;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };*/
  

  const createNewEstoc = (nouEstoc) => {
    try {
      const isNotAlreadyAdded =
        DB.producte.findIndex((producte) => producte.nom === nouEstoc.producte) == -1;
      console.log(isNotAlreadyAdded);
      if (isNotAlreadyAdded) {
        throw {
          status: 400,
          message: `Producte with the name '${nouEstoc.producte}' already not exists`,
        };
      }
  
      DB.estoc.push(nouEstoc);
      saveToDatabase(DB);
  
      return nouEstoc;
    } catch (error) {
      throw { status: 500, message: error?.message || error };
    }
  };
  
  const updateOneEstoc = (estocId, changes) => {
    try {
      const isAlreadyAdded =
        DB.estoc.findIndex((estoc) => estoc.nom === changes.nom) > -1;
  
      if (isAlreadyAdded) {
        throw {
          status: 400,
          message: `estoc with the name '${changes.nom}' already exists`,
        };
      }
  
      const indexForUpdate = DB.estoc.findIndex(
        (estoc) => estoc.id === estocId
      );
  
      if (indexForUpdate === -1) {
        throw {
          status: 400,
          message: `Can't find estoc with the id '${estocId}'`,
        };
      }
  
      const updatedEstoc = {
        ...DB.estoc[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      };
  
      DB.estoc[indexForUpdate] = updatedEstoc;
      saveToDatabase(DB);
  
      return updatedEstoc;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };
  
  const deleteOneEstoc = (estocId) => {
    try {
      const indexForDeletion = DB.estoc.findIndex(
        (estoc) => estoc.id === estocId
      );
      if (indexForDeletion === -1) {
        throw {
          status: 400,
          message: `Can't find estoc with the id '${estocId}'`,
        };
      }
      DB.estoc.splice(indexForDeletion, 1);
      saveToDatabase(DB);
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };




module.exports = {
    getAllEstocs,
    getOneEstoc,
    createNewEstoc,
    updateOneEstoc,
    deleteOneEstoc,
    getEstocForProducte,
};