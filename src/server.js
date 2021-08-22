const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const swaggerFile = require("./swagger.json");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index')(app);

app.listen(3333, () => {
    console.log('Servidor Rodando!');
})