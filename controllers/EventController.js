const Event = require("../models/Event");
const request = require('request');

exports.listAllEvents = (req, res) => {
  /*Event.find({}, (err, event) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(event);
  });*/
  var objectRes = {};
  objectRes.code = 200;
  objectRes.errorMsg = "";
  request('https://smart.coruna.es/eventos/rest/obtenerUltimosEventos/es/1/1000000/ANONYMOUS', { json: true }, (err, response, body) => {
    if (err) { 
      console.log(err);
      objectRes.status = body.status; 
      objectRes.errorMsg = body.errorMsg;
      res.status(body.status).send(objectResponse);
    }
    objectRes.content = {};
    objectRes.content.events = [];
    var eventsResponse = body.content.eventos;
    for (var i = 0, len = eventsResponse.length; i < len; i++) {
      var event = {};
      event.id = eventsResponse[i].id;
      event.hour = eventsResponse[i].titulo;
      event.address = eventsResponse[i].direccion;
      event.imageUrl = eventsResponse[i].urlImagen;
      event.startDate = eventsResponse[i].fechaInicio;
      event.endDate = eventsResponse[i].fechaFin;
      event.entity = eventsResponse[i].nombreEntidad;
      event.entrance = eventsResponse[i].entradilla;
      event.body = eventsResponse[i].cuerpo;
      event.latitude = eventsResponse[i].latitud;
      event.longitude = eventsResponse[i].longitud;
      event.price = eventsResponse[i].precio;
      objectRes.content.events.push(event);
    }
    res.status(200).json(objectRes);
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
