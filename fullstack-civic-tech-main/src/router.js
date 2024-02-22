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

Router.get('/events', eventController.list);
Router.post('/users/:id/events', eventController.create);

Router.get('/events/:id/comments', commentController.list);
Router.get('/allEvents/:user_id', eventController.callAllJoinedEvents);
Router.post('/events/:id/users/:id/comments', commentController.create);
Router.post('/Event_Users', eventController.joinAnEvent);
Router.delete('/Event_Users', eventController.leaveAnEvent);

Router.post('/login', userController.login);
Router.delete('/logout', userController.logout);
Router.delete('/users/:id', userController.deleteUser);
Router.get('/me', userController.showMe);

Router.patch('/users/:id', checkAuthentication, userController.update);
Router.get('/logged-in-secret', checkAuthentication, (req, res) => {
  res.send({ msg: 'The secret is: there is no secret.' });
});

module.exports = Router;
