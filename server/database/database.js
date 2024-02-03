const { Datastore } = require('@google-cloud/datastore');
const credentials = require("./datastore-credentials.json");

const datastore = new Datastore({
  projectId: "devellop-labs",
  credentials: credentials
});

module.exports = { datastore };