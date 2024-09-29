const mongoose = require("mongoose");
const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Pulse.find({ userId: req.session.userId })
      .sort({ date: -1 })
      .then(dbModel => res.render("pulseList", { pulseData: dbModel }))
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    const pulseData = {
      pulse: req.body.pulse,
      userId: req.session.userId
    };

    db.Pulse.create(pulseData)
      .then(() => res.redirect("/dashboard"))
      .catch(err => res.status(422).json(err));
  }
};
