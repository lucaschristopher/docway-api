require("dotenv").load();

const axios = require("axios");
const totalvoice = require("totalvoice-node");

const apiKey = process.env.API_KEY;

const client = new totalvoice(apiKey);

module.exports = {
  async call(req, res) {
    const doctor = Doctor.findById(req.params.id);
    const { name, phone } = doctor;
    const message = `${name}, você aceitaria trabalhar conosco?`;
    const options = {
      velocidade: 2,
      tipo_voz: "br_Vitoria"
    };

    client.tts
      .enviar(phone, message, options)
      .then(() => {
        console.log("O médico foi avisado!");
        // return res.send(data);
      })
      .catch(function(error) {
        console.log("Error: ", error);
      });
  }
};
