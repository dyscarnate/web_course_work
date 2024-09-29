const router = require("express").Router();
const headacheController = require("../../controllers/headacheController");

router.get("/add", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  res.render("addHeadache");
});

router.post("/add", headacheController.create);
router.get("/all", headacheController.findAll);

module.exports = router;
