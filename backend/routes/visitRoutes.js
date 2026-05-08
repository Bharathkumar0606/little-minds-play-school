const express = require("express");
const router = express.Router();
const { addVisit, getVisits } = require("../controllers/visitController");

router.post("/", addVisit);
router.get("/", getVisits);

module.exports = router;
