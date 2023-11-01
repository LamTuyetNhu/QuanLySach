import express from "express";
import initWebRoute from "./configs/viewEngine";
import configViewEngine from "./route/web";
import initAPIRoute from "./route/api";
const session = require("express-session");
const cors = require('cors');

// const initializePassport = require('./passport-config')

const path = require("path");
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// app.use(express.urlencoded({ extended: false}));


app.use(session({
  secret: 'webslesson',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}))


app.use(express.json());

configViewEngine(app);
require("dotenv").config();

const port = process.env.PORT || 8080;

initWebRoute(app);

initAPIRoute(app);

app.listen(port, () => console.log(`Examples at http://localhost:${port}`));
