const artistController = require('../controllers/artist.controller');
const bodyValidation = require('../middlewares/body-validation.middleware');
const pagination = require('../middlewares/pagination.middleware');
const { artistSchema } = require('../validators/artist.schema');


const artistRouter = require('express').Router();

artistRouter.route('/')
    .get(pagination(), artistController.getAll)
    .post(bodyValidation(artistSchema), artistController.add)
    .all((req, res) => res.sendStatus(405));

artistRouter.route('/:id([0-9]+)')
    .get(artistController.getById)
    .put(bodyValidation(artistSchema), artistController.update)
    .delete(artistController.delete)
    .all((req, res) => res.sendStatus(405));

module.exports = artistRouter;