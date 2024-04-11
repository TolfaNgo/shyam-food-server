const express = require("express");
const v1Routes = require("../v1");
const router = express.Router();
const products = require("../modules/products");
const currency = require("../modules/currency");
const social = require("../modules/social");
const blogs = require("../modules/blogs");

router.use("/product", products);
router.use("/currency", currency);
router.use("/social", social);
router.use("/blogs", blogs);

module.exports = router;
