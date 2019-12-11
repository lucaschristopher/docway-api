const express = require("express");
const routes = express.Router();

const DoctorController = require("./../controllers/DoctorController");
const HospitalController = require("./../controllers/HospitalController");
const TTSController = require("./../controllers/TTSController");

routes.get("/doctors", DoctorController.listAll);
routes.get("/doctors/:id", DoctorController.show);
routes.post("/doctors", DoctorController.store);
routes.put("/doctors/:id", DoctorController.update);
routes.delete("/doctors/:id", DoctorController.delete);

routes.get("/hospitals", HospitalController.listAll);
routes.get("/hospitals/:id", HospitalController.show);
routes.post("/hospitals", HospitalController.store);
routes.put("/hospitals/:id", HospitalController.update);
routes.delete("/hospitals/:id", HospitalController.delete);

routes.post("/doctors/:id", TTSController.call);

module.exports = routes;