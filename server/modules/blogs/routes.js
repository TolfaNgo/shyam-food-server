const express = require("express");
const controller = require("./controller");
const { postFile } = require("../../utils/mutler.service");

const router = express.Router();

/* GET */
router.get("/", controller.getBlogs);

/* CREATE */
router.post("/create", postFile, controller.createBlog);

/* UPDATE */
router.post("/update/:id", postFile, controller.updateBlogById);

/* DELETE */
router.post("/delete/:id", controller.removeBlogById);

module.exports = router;
