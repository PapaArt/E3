const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const e3Controller = require('./controller/e3Controller');
const gamesController = require('./controller/gamesController');
const profileController = require('./controller/profileController');
const sessionController = require('./controller/sessionController');

const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/e3', e3Controller.index);
routes.post('/e3', celebrate({
    [Segments.BODY]: Joi.object().keys({
       name: Joi.string().required(),      
       email: Joi.string().required().email(),      
       whatsapp: Joi.string().required().min(11).max(13),      
       city: Joi.string().required(),      
       uf: Joi.string().required().length(2),      
    })

}), e3Controller.create);    

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),         
     }).unknown(),
}),profileController.index);

routes.get('/games', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),gamesController.index);
routes.post('/games', gamesController.create);
routes.delete('/games/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),gamesController.delete);

module.exports = routes;