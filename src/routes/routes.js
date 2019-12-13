require("dotenv/config");

const express = require("express");
const routes = express.Router();

const DoctorController = require("./../controllers/DoctorController");
const HospitalController = require("./../controllers/HospitalController");
const TTSController = require("./../controllers/TTSController");

routes.get("/", (req, res) => {
  res.end("Hello, world!");
})

// Doctors
routes.get("/doctors", DoctorController.listAll);
routes.get("/doctors/filter", DoctorController.filter);
routes.get("/doctors/:id", DoctorController.show);
routes.get("doctors/:crm", DoctorController.getByCrm);
routes.post("/doctors", DoctorController.store);
routes.put("/doctors/:id", DoctorController.update);
routes.delete("/doctors/:id", DoctorController.delete);

// Hospitals
routes.get("/hospitals", HospitalController.listAll);
routes.get("/hospitals/filter", HospitalController.filter);
routes.get("/hospitals/:id", HospitalController.show);
routes.post("/hospitals", HospitalController.store);
routes.put("/hospitals/:id", HospitalController.update);
routes.delete("/hospitals/:id", HospitalController.delete);

// TTS to a doctor
routes.post("/tts", TTSController.call);

// Returns the data of a TTS message
routes.get("/tts/:id", TTSController.getInfoTts);

module.exports = routes;
