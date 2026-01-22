const mongoose = require("mongoose");
require("dotenv").config();

let url = process.env.MONGO_URI;

if (!url) {
  const host = process.env.DB_HOST || "localhost";
  const port = process.env.DB_PORT || "27017";
  const dbName = process.env.DB_NAME || "";
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;

  const authPart =
    user && password !== undefined
      ? `${encodeURIComponent(user)}:${encodeURIComponent(password)}@`
      : "";

  url = `mongodb://${authPart}${host}:${port}/${dbName}`;
}

mongoose
  .connect(url)
  .then(() => {
    console.log("Connecté à MongoDB");
  })
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB: ", err);
    process.exit(1);
  });

module.exports = mongoose;
