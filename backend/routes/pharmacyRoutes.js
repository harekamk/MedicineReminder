const express = require("express");
const router = express.Router();
const { getNearbyPharmacies } = require("../controllers/pharmacyController");

router.get("/nearby", getNearbyPharmacies);

module.exports = router;