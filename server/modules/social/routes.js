const express = require("express");
const controller = require("./controller");

const router = express.Router();

/* CREATE */
router.post("/create", controller.createSocialInfo);

/* UPDATE */
router.post("/update/:id", controller.updateSocialInfoById);

module.exports = router;
