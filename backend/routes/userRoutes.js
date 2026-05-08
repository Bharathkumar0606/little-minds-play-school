const express = require("express");
const router = express.Router();
const { saveUser, getUsers } = require("../controllers/userController");

router.post("/", saveUser);
router.get("/", getUsers);

module.exports = router;
