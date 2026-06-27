const express =
  require("express");

const router =
  express.Router();

const Alert =
  require("../models/Alert");

const auth =
  require("../middleware/authMiddleware");

router.get(
  "/",
  auth,
  async (req, res) => {

    try {

      const alerts =
        await Alert.find({
          user: req.user,
        })
          .sort({
            createdAt: -1,
          });

      res.json(alerts);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);

module.exports =
  router;