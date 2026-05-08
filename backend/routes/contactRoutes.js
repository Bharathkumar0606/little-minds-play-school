const express = require("express");
const router = express.Router();
const { addContact, getContacts } = require("../controllers/contactController");

router.post("/", addContact);
router.get("/", getContacts);

module.exports = router;