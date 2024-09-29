const router = require("express").Router();
const glucoseRoutes = require("./glucose");
const userRoutes = require("./user");
const headacheRoutes = require("./headache")
const pulseRoutes = require("./pulse")

router.use("/glucose", glucoseRoutes);
router.use("/user", userRoutes);
router.use("/headache", headacheRoutes);
router.use("/pulse", pulseRoutes);
module.exports = router;
