const mongoose = require("mongoose");
const Doctor = mongoose.model("Doctor");

const self = (module.exports = {
  async listAll(req, res) {
    const { page = 1 } = req.query; // using destructuring in the parameters
    const doctors = await Doctor.paginate({}, { page, limit: 10 });
    return res.json(doctors);
  },

  async store(req, res) {
    const doctor = await Doctor.create(req.body);
    return res.json(doctor);
  },

  async show(req, res) {
    const doctor = await Doctor.findById(req.params.id);
    return res.json(doctor);
  },

  async delete(req, res) {
    await Doctor.findByIdAndDelete(req.params.id);
    return res.send();
  },

  async update(req, res) {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(doctor);
  },

  async filter(req, res) {
    if (req.query.city && !req.query.specialization) {
      return self.filterByCity(req, res);
    } else if (req.query.specialization && !req.query.city) {
      return self.filterBySpecialization(req, res);
    } else {
      return self.filterByBoth(req, res);
    }
  },

  async filterByCity(req, res) {
    const { page = 1, city } = req.query; // using destructuring in the parameters
    const doctorsByCity = await Doctor.paginate(
      { city: { $regex: ".*" + city + ".*" } },
      { page, limit: 10 }
    );
    return res.json(doctorsByCity);
  },

  async filterBySpecialization(req, res) {
    const { page = 1, specialization } = req.query; // using destructuring in the parameters
    const doctorsBySpecialization = await Doctor.paginate(
      { specialization: { $regex: ".*" + specialization + ".*" } },
      { page, limit: 10 }
    );
    return res.json(doctorsBySpecialization);
  },

  async filterByBoth(req, res) {
    const { page = 1 } = req.query; // using destructuring in the parameters
    const { city, specialization } = req.query;
    const filteredDoctors = await Doctor.paginate(
      {
        city: { $regex: ".*" + city + ".*" },
        specialization: { $regex: ".*" + specialization + ".*" }
      },
      { page, limit: 10 }
    );
    return res.json(filteredDoctors);
  },

  async getByCrm() {
    // TODO
    return null;
  }
});
