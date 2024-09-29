const router = require("express").Router();
const glucoseController = require("../../controllers/glucoseController");

// Route to add glucose data
router.get("/add", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  res.render("addGlucose");
});

router.post("/add", glucoseController.create); 
router.get("/all", glucoseController.findAll);

router
  .route("/")
  .get(glucoseController.findAll)
  .post(glucoseController.create);

router.get("/all", glucoseController.findAll);

router
  .route("/:id")
  .get(glucoseController.findById)
  .put(glucoseController.update)
  .delete(glucoseController.remove);

module.exports = router;
