const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const db = require("./config/db");
dotenv.config();

const app = express();

const corsOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, cb) {
      if (!origin) return cb(null, true);
      if (corsOrigins.length === 0) return cb(null, true);
      if (corsOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.options("*", cors());

app.use(bodyParser.json());

// Lire toutes les routes depuis le dossier 'routes'
const fs = require("fs");
const routesDir = path.join(__dirname, "routes");
fs.readdirSync(routesDir).forEach((file) => {
  const routePath = path.join(routesDir, file);
  const route = require(routePath);
  app.use("/api", route); // Toutes les routes seront précédées de /api
});

module.exports = app;
