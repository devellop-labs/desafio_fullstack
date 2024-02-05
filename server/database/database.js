const { Datastore } = require('@google-cloud/datastore');
const credentials = require("./datastore-credentials.json");
//the credentials must be in the server cloud varaibles.
const datastore = new Datastore({
  projectId: "devellop-labs",
  credentials: credentials
});

module.exports = { datastore };