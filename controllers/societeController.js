const societeService = require("../services/societeService");

const createSociete = async (req, res) => {
  try {
    const { name, link, pourcentage, active } = req.body;
    const societe = await societeService.create({
      name,
      link,
      pourcentage,
      active,
    });
    res.status(201).send(societe);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const listSocietes = async (req, res) => {
  try {
    let active;
    if (req.query.active !== undefined) {
      active = String(req.query.active).toLowerCase() === "true";
    }
    const societes = await societeService.list({ active });
    res.status(200).send(societes);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getSocieteById = async (req, res) => {
  try {
    const societe = await societeService.getById(req.params.id);
    res.status(200).send(societe);
  } catch (err) {
    const status = err.message === "Societe not found" ? 404 : 400;
    res.status(status).send({ message: err.message });
  }
};

const updateSociete = async (req, res) => {
  try {
    const societe = await societeService.update(req.params.id, req.body);
    res.status(200).send(societe);
  } catch (err) {
    const status = err.message === "Societe not found" ? 404 : 400;
    res.status(status).send({ message: err.message });
  }
};

const setSocieteActive = async (req, res) => {
  try {
    const { active } = req.body;
    if (active === undefined) {
      return res.status(400).send({ message: "active is required" });
    }
    const societe = await societeService.setActive(req.params.id, active);
    res.status(200).send(societe);
  } catch (err) {
    const status = err.message === "Societe not found" ? 404 : 400;
    res.status(status).send({ message: err.message });
  }
};

const deleteSociete = async (req, res) => {
  try {
    const societe = await societeService.remove(req.params.id);
    res.status(200).send(societe);
  } catch (err) {
    const status = err.message === "Societe not found" ? 404 : 400;
    res.status(status).send({ message: err.message });
  }
};

module.exports = {
  createSociete,
  listSocietes,
  getSocieteById,
  updateSociete,
  setSocieteActive,
  deleteSociete,
};
