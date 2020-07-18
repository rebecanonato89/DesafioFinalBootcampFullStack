const express = require('express');
const TransactionController = require('./controllers/TransactionController');
const SearchController = require('./controllers/SearchController');


const routes = new express.Router();

routes.get('/', TransactionController.index);
routes.post('/', TransactionController.store );

routes.get('/search', SearchController.index);

module.exports = routes;