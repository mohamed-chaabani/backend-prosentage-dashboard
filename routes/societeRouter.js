const express = require("express");
const router = express.Router();
const societeController = require("../controllers/societeController");

router.post("/societes", societeController.createSociete);
router.get("/societes", societeController.listSocietes);
router.get("/societes/:id", societeController.getSocieteById);
router.put("/societes/:id", societeController.updateSociete);
router.patch("/societes/:id/active", societeController.setSocieteActive);
router.delete("/societes/:id", societeController.deleteSociete);

module.exports = router;
