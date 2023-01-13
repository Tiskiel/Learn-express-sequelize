const genreController = require('../controllers/genre.controller');
const bodyValidation = require('../middlewares/body-validation.middleware');
const pagination = require('../middlewares/pagination.middleware');
const { genreSchema } = require('../validators/genre.schema');


const genreRouter = require('express').Router();

genreRouter.route('/')
    .get(pagination(), genreController.getAll)
    .post(bodyValidation(genreSchema), genreController.add);

genreRouter.route('/:id([0-9]+)')
    .get(genreController.getById);

genreRouter.route('/search/:name([a-zA-Z]+)')
    .get(pagination(), genreController.searchByName);

module.exports = genreRouter;