const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");


const {

  addMedicine,
  getMedicines,
  deleteMedicine,
  updateMedicine,
  toggleCompleteMedicine,

} = require("../controllers/medicineController");


// ADD MEDICINE
router.post(
  "/",
  protect,
  addMedicine
);


// GET ALL MEDICINES
router.get(
  "/",
  protect,
  getMedicines
);
router.put(
  "/:id",
  protect,
  updateMedicine
);

// DELETE MEDICINE
router.delete(
  "/:id",
  protect,
  deleteMedicine
);


// TOGGLE COMPLETE
router.put(
  "/:id/complete",
  protect,
  toggleCompleteMedicine
);


module.exports = router;
