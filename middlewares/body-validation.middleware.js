const { Request, Response, NextFunction } = require('express');
const { BaseSchema } = require('yup');
const { InvalidBodyErrorResponse } = require('../api-responses/error-response');

/**
 * Fonction pour gérer le middleware "bodyValidator"
 * @param {BaseSchema} yupValidator Schema de validation "yup"
 * @param {Number} errorCode Code erreur si les données sont invalides
 * @returns {(req : Request, res : Response, next : NextFunction) => undefined}
 */
const bodyValidation = (validator, errorCode = 422) => {

    /**
     * Middleware de validation
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    return (req, res, next) => {
        // Validation des données du body 
        validator.noUnknown().validate(req.body, { abortEarly: false })
            .then((data) => {
                req.validateData = data;
                next();
            })
            .catch((yupError) => {
                const validationErrors = {};

                for (const { path, message, type } of yupError.inner) {
                    if (type !== 'trim') {
                        validationErrors[path] = message;
                    }
                }

                res.status(errorCode).json(new InvalidBodyErrorResponse(
                    'Data unvalid',
                    validationErrors,
                    errorCode
                ));
            });
    };
};

module.exports = bodyValidation;