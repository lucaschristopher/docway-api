if (process.env.NODE_ENV == "production") {
  module.exports = {
    mongoURI: "mongodb+srv://deploy:deploy12345@cluster-api-node-pndno.mongodb.net/test?retryWrites=true&w=majority"
  };
} else {
  module.exports = {
    mongoURI: "mongodb://localhost:27017/totalvoice-api"
  };
}
