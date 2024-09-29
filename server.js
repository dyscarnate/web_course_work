const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const routes = require("./routes/api");

// Новые маршруты для головной боли и пульса
const headacheRoutes = require("./routes/api/headache");
const pulseRoutes = require("./routes/api/pulse");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Подключение к базе данных MongoDB
mongoose.connect("mongodb://localhost:27017/appDB");

// Модели
const User = require("./models/user");
const Glucose = require("./models/bloodSugar");
const Headache = require("./models/headache"); // Модель для головной боли
const Pulse = require("./models/pulse");       // Модель для пульса

db = { User, Glucose, Headache, Pulse }; // Добавляем новые модели

// Настройка сессий
app.use(
  session({
    secret: "123456",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Основные маршруты
app.use("/", routes); 
app.use("/headache", headacheRoutes); // Маршруты для головной боли
app.use("/pulse", pulseRoutes);       // Маршруты для пульса

// Страницы входа
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.User.findOne({ email: email })
    .then((user) => {
      if (!user || user.password !== password) {
        return res.status(401).send("Invalid email or password");
      }
      req.session.userId = user._id;
      res.redirect("/dashboard");
    })
    .catch((err) => res.status(500).send(err));
});

// Регистрация
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  db.User.create(req.body)
    .then((user) => {
      req.session.userId = user._id;
      res.redirect("/dashboard");
    })
    .catch((err) => res.status(500).send(err));
});

// Дашборд
app.get("/dashboard", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  db.User.findById(req.session.userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }
      res.render("dashboard", { username: user.email });
    })
    .catch((err) => res.status(500).send(err));
});

// Запуск сервера
app.listen(PORT, function () {
  console.log(`API server now on port ${PORT}!`);
});
