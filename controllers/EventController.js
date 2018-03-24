const Event = require("../models/Event");

exports.listAllEvents = (req, res) => {
  Event.find({}, (err, event) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(event);
  });
};

exports.createNewEvent = (req, res) => {
  let newEvent = new Event(req.body);
  newEvent.save((err, event) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(event);
  });
};

exports.readEvent = (req, res) => {
  Event.findById(req.params.eventid, (err, event) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(event);
  });
};

exports.updateEvent = (req, res) => {
  Event.findOneAndUpdate(
    { _id: req.params.eventid },
    req.body,
    { new: true },
    (err, event) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(event);
    }
  );
};

exports.deleteEvent = (req, body) => {
  Event.remove({ _id: req.params.eventid }, (err, event) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Event successfully deleted" });
  });
};
