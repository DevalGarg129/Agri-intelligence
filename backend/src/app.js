const express = require("express")
const cors = require("cors")

const app = express();

const predictionRoutes = require("./routes/prediction.routes.js");

app.use(cors())
app.use(express.json())

app.use("/api/predictions", predictionRoutes);
module.exports = app;