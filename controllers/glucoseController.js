const mongoose = require("mongoose");
const db = require("../models");

// Defining methods for the glucoseController
module.exports = {
  find: function(req, res) {
    db.Glucose.find({
      date: {
        $gte: new Date(req.params.date).setHours(00, 00, 00),
        $lt: new Date(req.params.date).setHours(23, 59, 59)
      }
    })
    .where({ "userId": req.session.userId })
    .sort({ date: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  findAll: function(req, res) {
    db.Glucose.find({ userId: req.session.userId })
      .sort({ date: -1 })
      .then(dbModel => {
        res.render("glucoseList", { glucoseData: dbModel }); 
      })
      .catch(err => res.status(422).json(err));
  },
  

  findById: function(req, res) {
    const id = req.params.id;
  
    // Проверка на валидность ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Invalid ID format");
    }
  
    db.Glucose.findById(id)
      .then(dbModel => {
        if (!dbModel) {
          return res.status(404).send("Record not found");
        }
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  }
  ,

  create: function(req, res) {
    const glucoseData = {
      glucose: req.body.glucose,
      date: new Date(),
      userId: req.session.userId
    };
  
    db.Glucose.create(glucoseData)
      .then(dbModel => {
        // После успешного добавления данных, перенаправляем на главную страницу
        res.redirect("/dashboard");
      })
      .catch(err => {
        console.error("Ошибка при добавлении данных о глюкозе:", err);
        res.status(422).json(err);
      });
  },
  

  update: function(req, res) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    db.Glucose.findOneAndUpdate({ _id: id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function(req, res) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    db.Glucose.findById(id)
      .then(dbModel => {
        if (!dbModel) {
          return res.status(404).send("Record not found");
        }
        return dbModel.remove();
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
