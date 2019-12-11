const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const HospitalSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

HospitalSchema.plugin(mongoosePaginate);
mongoose.model("Hospital", HospitalSchema);
