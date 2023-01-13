const { ErrorResponse } = require('../api-responses/error-response');
const { SuccesResponse, SuccessCollectionResponse } = require('../api-responses/success-response');
const db = require('../models');
const genreService = require('../services/genre.service');
const { genreSchema } = require('../validators/genre.schema');

const genreController = {
    getAll: async (req, res) => {

        const { offset, limit } = req.pagination;

        const data = await genreService.getAll(offset, limit);

        res.status(200).json(new SuccessCollectionResponse(data.genres, data.count));
    },

    getById: async (req, res) => {
        const id = req.params.id;

        const data = await genreService.getById(id);

        if (!data) {
            res.sendStatus(404);
            return;
        }

        res.status(200).json(new SuccesResponse(data));

    },

    add: async (req, res) => {

        const data = req.validateData;

        if (await genreService.checkIfExists(data.name)) {
            res.status(400).json(new ErrorResponse(`Genre '${data.name}' already exists`));
            return;
        }

        const newGenre = await genreService.add(data);

        res.location('/api/genre/' + newGenre.id);
        res.status(201).json(new SuccesResponse(newGenre, 201));

    },

    searchByName: async (req, res) => {

        const query = req.params.name;
        const { offset, limit } = req.pagination;
        console.log(query);
        const data = await genreService.searchByName(query, offset, limit);

        res.status(200).json(new SuccessCollectionResponse(data.genres, data.count));
    }
};

module.exports = genreController;