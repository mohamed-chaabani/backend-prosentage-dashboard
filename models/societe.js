const mongoose = require("mongoose");
const validator = require("validator");

const societeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isURL(value, { require_protocol: true });
      },
      message: (props) => props.value + " n'est pas un lien valide!",
    },
  },
  pourcentage: {
    type: Number,
    required: true,
    min: [0, "Le pourcentage doit être supérieur ou égal à 0"],
    max: [100, "Le pourcentage doit être inférieur ou égal à 100"],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Societe = mongoose.model("Societe", societeSchema);

module.exports = Societe;
