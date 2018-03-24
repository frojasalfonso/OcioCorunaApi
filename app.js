const express = require("express");
const bodyParser = require("body-parser");
const eventController = require("./controllers/EventController");

// db instance connection
require("./config/db");

const app = express();

const port = process.env.PORT || 3301;
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
