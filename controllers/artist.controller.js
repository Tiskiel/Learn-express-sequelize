const { ErrorResponse, InvalidBodyErrorResponse } = require('../api-responses/error-response');
const { SuccessCollectionResponse, SuccesResponse } = require('../api-responses/success-response');
const artistService = require('../services/artist.service');

const artistController = {
    getAll: async (req, res) => {

        const { offset, limit } = req.pagination;

        const data = await artistService.getAll(offset, limit);

        res.status(200).json(new SuccessCollectionResponse(data.artists, data.count));
    },

    getById: async (req, res) => {
        const id = req.params.id;

        const data = await artistService.getById(id);

        if (!data) {
            res.sendStatus(404);
            return;
        }
        res.json(new SuccesResponse(data));
    },

    add: async (req, res) => {

        const data = req.validateData;

        if (!data.pseudo && !(data.lastName && data.firstName)) {
            res.json(new InvalidBodyErrorResponse('Pseudo require if lastname and firstname not exist'));
        }

        if (data.pseudo && await artistService.checkIfPseudoExists(data.name)) {
            res.status(400).json(new ErrorResponse(`Genre '${data.pseudo}' already exists`));
            return;
        }

        const artist = await artistService.add(data);

        res.location('/api/artist/' + artist.id);
        res.status(201).json(new SuccesResponse(artist));
    },

    update: async (req, res) => {
        // Recup de l'id
        const id = req.params.id;


        const data = req.validateData;

        if (data.pseudo) {

            if (!data.pseudo && !(data.lastName && data.firstName)) {
                res.json(new InvalidBodyErrorResponse('Pseudo require if lastname and firstname not exist'));
            }

            const originalArtist = await artistService.getById(id);
            const pseudoIsModify = originalArtist?.pseudo?.toLowerCase() === data.pseudo.toLowerCase();

            if (pseudoIsModify && await artistService.checkIfPseudoExists(data.pseudo)) {
                res.status(400).json(new ErrorResponse(`Genre '${data.pseudo}' already exists`));
                return;
            }
        }

        const artist = await artistService.update(id, data);
        console.log(artist);


        if (!artist) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    },

    delete: async (req, res) => {
        const id = req.params.id;

        const isDeleted = await artistService.delete(id);

        if (!isDeleted) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    }
};

module.exports = artistController;