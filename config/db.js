
const mongoose = require('mongoose');
require('dotenv').config();
const url = "mongodb://localhost:27017/" + process.env.DB_NAME
mongoose.connect(url)
.then(() => {
    console.log('Connecté à MongoDB');
})
.catch(err => {
    console.error('Erreur de connexion à MongoDB: ', err);
    process.exit(1);
});

module.exports = mongoose;
