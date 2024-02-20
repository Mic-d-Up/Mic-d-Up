const express = require('express');
const userController = require('./controllers/user/index');
const eventController = require('./controllers/event');
const addModelsToRequest = require('./middleware/add-models-to-request');
const checkAuthentication = require('./middleware/check-authentication');
const commentController = require('./controllers/comment/index');
const Router = express.Router();
Router.use(addModelsToRequest);

Router.get('/users', userController.list);
Router.post('/users', userController.create);
Router.get('/users/:id', userController.show);

Router.get('/home', eventController.list);
Router.post('/home', eventController.create);

Router.get('/events', eventController.list);
Router.post('/users/:user_id/events', eventController.create);

Router.post('/login', userController.login);
Router.delete('/logout', userController.logout);
Router.delete('/users/:id', userController.deleteUser);
Router.get('/me', userController.showMe);

Router.patch('/users/:id', checkAuthentication, userController.update);
Router.get('/logged-in-secret', checkAuthentication, (req, res) => {
  res.send({ msg: 'The secret is: there is no secret.' });
});

module.exports = Router;