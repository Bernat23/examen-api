const express = require("express");
const v1ProducteRouter = require("./v1/routes/productesRoutes");
const v1EstocRouter = require("./v1/routes/estocsRoutes");

const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('../swagger_output.json');
const cors = require("cors")


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
//app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/productes", v1ProducteRouter);
app.use("/api/v1/estocs", v1EstocRouter);


app.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`);
});
