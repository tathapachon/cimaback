const router = require("express").Router();
const userAuth = require("../controllers/authController.js");
const user = require("../controllers/userController.js");
const services= require("../controllers/serviceController.js");
const articles= require("../controllers/articleController.js");
const blog = require("../controllers/blogController.js");

router.use("/", userAuth);
router.use("/user", user);
router.use("/blog", blog);
router.use("/service", services);
router.use("/article", articles);

module.exports = router;