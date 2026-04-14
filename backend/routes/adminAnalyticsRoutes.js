const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const { getAnalytics } = require("../controllers/adminAnalyticsController");

router.get("/analytics", protect, admin, getAnalytics);

module.exports = router;