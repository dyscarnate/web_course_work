const mongoose = require("mongoose");
const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Headache.find({ userId: req.session.userId })
      .sort({ date: -1 })
      .then(dbModel => res.render("headacheList", { headacheData: dbModel }))
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    const headacheData = {
      level: req.body.level,
      comment: req.body.comment,
      userId: req.session.userId
    };

    db.Headache.create(headacheData)
      .then(() => res.redirect("/dashboard"))
      .catch(err => res.status(422).json(err));
  }
};
