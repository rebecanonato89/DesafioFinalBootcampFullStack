const express = require('express');
const TransactionController = require('./controllers/TransactionController');
const SearchController = require('./controllers/SearchController');
const SearchDateController = require('./controllers/SearchDateController');


const routes = new express.Router();

routes.get('/', TransactionController.index);
routes.post('/', TransactionController.store );
routes.post('/:id', TransactionController.update);
routes.delete('/:id', TransactionController.delete);

routes.get('/search', SearchController.index);

routes.get('/searchDate', SearchDateController.index);

module.exports = routes;