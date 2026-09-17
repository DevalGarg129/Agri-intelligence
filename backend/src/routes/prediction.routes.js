const express = require("express")
const upload = require('../middleware/upload.middlware.js');
const { createPrediction } = require("../controllers/prediction.controller.js");

const router = express.Router();

router.post("/", upload.single("file"), createPrediction);

module.exports = router;