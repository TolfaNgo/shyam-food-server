const express = require("express");
const controller = require("./controller");
const { postFile } = require("../../utils/mutler.service");

const router = express.Router();

/* GET */
router.get("/", controller.getProducts);

/* CREATE */
router.post("/create", postFile, controller.createProduct);

/* UPDATE */
router.post("/update/:id", postFile, controller.updateProductById);

/* DELETE */
router.post("/delete-unit/:id", controller.removeUnit);

module.exports = router;
