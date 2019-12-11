const mongoose = require("mongoose");
const Hospital = mongoose.model("Hospital");

module.exports = {

  // List all hospitals
  async listAll(req, res) {
    const { page = 1 } = req.query; // using destructuring in the parameters
    const hospitals = await Hospital.paginate({}, { page, limit: 10 });
    return res.json(hospitals);
  },

  // Creates a product
  async store(req, res) {
    const hospital = await Hospital.create(req.body);
    return res.json(hospital);
  },

  // Show single hospital details
  async show(req, res) {
    const hospital = await Hospital.findById(req.params.id);
    return res.json(hospital);
  },

  // Destroy a element by id
  async delete(req, res) {
    await Hospital.findByIdAndRemove(req.params.id);
    return res.send();
  },

  // Update a element
  async update(req, res) {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(hospital);
  }
};
