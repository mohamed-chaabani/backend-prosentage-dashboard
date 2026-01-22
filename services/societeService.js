const Societe = require("../models/societe");

const societeService = {
  create: async (data) => {
    const societe = new Societe({
      name: data.name,
      link: data.link,
      pourcentage: data.pourcentage,
      active: data.active,
    });
    await societe.save();
    return societe;
  },

  list: async (filters = {}) => {
    const query = {};
    if (filters.active !== undefined) {
      query.active = filters.active;
    }
    return await Societe.find(query).sort({ createdAt: -1 });
  },

  getById: async (id) => {
    const societe = await Societe.findById(id);
    if (!societe) {
      throw new Error("Societe not found");
    }
    return societe;
  },

  update: async (id, data) => {
    const updateData = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.link !== undefined) updateData.link = data.link;
    if (data.pourcentage !== undefined)
      updateData.pourcentage = data.pourcentage;
    if (data.active !== undefined) updateData.active = data.active;

    const societe = await Societe.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!societe) {
      throw new Error("Societe not found");
    }

    return societe;
  },

  setActive: async (id, active) => {
    const societe = await Societe.findByIdAndUpdate(
      id,
      { active },
      { new: true, runValidators: true },
    );
    if (!societe) {
      throw new Error("Societe not found");
    }
    return societe;
  },

  remove: async (id) => {
    const societe = await Societe.findByIdAndDelete(id);
    if (!societe) {
      throw new Error("Societe not found");
    }
    return societe;
  },
};

module.exports = societeService;
