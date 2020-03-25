const express = require('express');

const e3Controller = require('./controller/e3Controller');
const gamesController = require('./controller/gamesController');
const profileController = require('./controller/profileController');
const sessionController = require('./controller/sessionController');

const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/e3', e3Controller.index);
routes.post('/e3', e3Controller.create);    

routes.get('/profile', profileController.index);

routes.get('/games', gamesController.index);
routes.post('/games', gamesController.create);
routes.delete('/games/:id', gamesController.delete);

module.exports = routes;