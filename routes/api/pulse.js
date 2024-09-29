const router = require("express").Router();
const pulseController = require("../../controllers/pulseController");

router.get("/add", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  res.render("addPulse");
});

router.post("/add", pulseController.create);
router.get("/all", pulseController.findAll);

module.exports = router;
