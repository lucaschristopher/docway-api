const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const DoctorSchema = new mongoose.Schema({
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
  crm: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

DoctorSchema.plugin(mongoosePaginate);
mongoose.model("Doctor", DoctorSchema);
