const { getHome } = require("../controllers/base.controller");

const router = require("express").Router();

// ? base route
router.get("/", getHome);

module.exports = router;
