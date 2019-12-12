const mongoose = require("mongoose");
const Hospital = mongoose.model("Hospital");

const self = (module.exports = {
  async listAll(req, res) {
    const { page = 1 } = req.query; // using destructuring in the parameters
    const hospitals = await Hospital.paginate({}, { page, limit: 10 });
    return res.json(hospitals);
  },

  async store(req, res) {
    const hospital = await Hospital.create(req.body);
    return res.json(hospital);
  },

  async show(req, res) {
    const hospital = await Hospital.findById(req.params.id);
    return res.json(hospital);
  },

  async delete(req, res) {
    await Hospital.findByIdAndRemove(req.params.id);
    return res.send();
  },

  async update(req, res) {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(hospital);
  },

  async filter(req, res) {
    if (req.query.city && !req.query.cnpj) {
      return self.filterByCity(req, res);
    } else if (req.query.cnpj && !req.query.city) {
      return self.filterByCnpj(req, res);
    } else {
      return self.filterByBoth(req, res);
    }
  },

  async filterByCity(req, res) {
    const { page = 1, city } = req.query; // using destructuring in the parameters
    const hospitalsByCity = await Doctor.paginate(
      { city: { $regex: ".*" + city + ".*" } },
      { page, limit: 10 }
    );
    return res.json(hospitalsByCity);
  },

  async filterByCnpj(req, res) {
    // TODO
    return null;
  },

  async filterByBoth(req, res) {
    // TODO
    return null;
  }
});
