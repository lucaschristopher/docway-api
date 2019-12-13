const mongoose = require("mongoose");
const totalvoice = require("totalvoice-node");

const client = new totalvoice("69467e94ebfd79f724a547882eeae91d");

const Doctor = mongoose.model("Doctor");

module.exports = {

  // Message TTS sending
  async call(req, res) {
    const doctor = await Doctor.findById(req.body._id);

    const { name, phone } = doctor;
    const message = `${name}, você deseja trabalhar conosco?`;

    const options = {
      velocidade: 0,
      tipo_voz: "br-Vitoria",
      resposta_usuario: true,
      // Número de telefone que aparecerá no identificador de quem receber a chamada
      // formado: DDD9XXXXYYYY
      // bina: "83986303123",
      // Grava a chamada
      grava_audio: true,
      // Desconecta automaticamente em até 3s caso caia em caixa postal (vivo, claro, tim, oi)
      detecta_caixa: true
    };

    client.tts
      .enviar(phone, message, options)
      .then(data => {
        console.log(`O médico ${name} foi avisado!`);
        res.send(data);
      })
      .catch(function(error) {
        console.log("Error: ", error);
      });
  },

  // Returns the data of a TTS message
  async getInfoTts(req, res) {
    client.tts
      .buscar(req.params.id)
      .then(data => {
        console.log(
          `Sucesso ao pesquisar informações do TTS de id ${req.params.id}!`
        );
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        res.status(400).json(err);
      });
  }
};
