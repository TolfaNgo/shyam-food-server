const express = require("express");
const controller = require("./controller");

const router = express.Router();

/* GET */
router.get("/", controller.getCurrencies);

/* CREATE */
router.post("/create", controller.createCurrency);

/* UPDATE */
router.post("/update/:id", controller.updateCurrencyById);

module.exports = router;
