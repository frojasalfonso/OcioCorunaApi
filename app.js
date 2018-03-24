const express = require("express");
const bodyParser = require("body-parser");
const eventController = require("./controllers/EventController");

// db instance connection
require("./config/db");

const app = express();
const server_port = process.env.OPENSHIFT_NODEJS_PORT || 3301
const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API ENDPOINTS

app
  .route("/events")
  .get(eventController.listAllEvents)
  .post(eventController.createNewEvent);

app
  .route("/events/:eventid")
  .get(eventController.readEvent)
  .put(eventController.updateEvent)
  .delete(eventController.deleteEvent);

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});
