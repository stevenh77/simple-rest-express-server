var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var films = require('./film-data.json');
 
var app = express();
app.use(bodyParser.json());

// logs incoming requests
app.use(morgan('combined'));

var router = express.Router();
 
router.get('/films', function(req, res) {
  res.json(films);
});
 
router.get('/films/:id', function(req, res) {
  if(films.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No film found');
  }
  
  var film = films[req.params.id];
  res.json(film);
});
 
router.post('/films', function(req, res) {
  if(!req.body.hasOwnProperty('title')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }
 
  var newFilm = {
    id: films.length,
    title: req.body.title
  };
 
  films.push(newFilm);
  res.json(true);
});
 
router.delete('/films/:id', function(req, res) {
  if(films.length <= req.params.id) {
    res.statusCode = 404;
    return res.send('Error 404: No film found');
  }
 
  films.splice(req.params.id, 1);
  res.json(true);
});
 
app.use('/api', router);
 
console.log('Open a browser: http://localhost:3412/api/films');
app.listen(process.env.PORT || 3412);