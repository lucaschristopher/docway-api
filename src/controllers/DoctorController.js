const mongoose = require("mongoose");
const Doctor = mongoose.model("Doctor");

module.exports = {
  // List all doctors
  async listAll(req, res) {
    const { page = 1 } = req.query; // using destructuring in the parameters
    const doctors = await Doctor.paginate({}, { page, limit: 10 });
    return res.json(doctors);
  },

  // Creates a product
  async store(req, res) {
    const doctor = await Doctor.create(req.body);
    return res.json(doctor);
  },

  // Show single doctor details
  async show(req, res) {
    const doctor = await Doctor.findById(req.params.id);
    return res.json(doctor);
  },

  // Destroy a element by id
  async delete(req, res) {
    await Doctor.findByIdAndDelete(req.params.id);
    return res.send();
  },

  // Update a element
  async update(req, res) {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(doctor);
  }
};
