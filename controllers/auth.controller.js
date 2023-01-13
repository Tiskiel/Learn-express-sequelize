const { ErrorResponse } = require("../api-responses/error-response");
const authService = require("../services/auth.service");
const { generateJWT } = require("../utils/jwt.utils");


const authController = {

    register: async (req, res) => {
        const { email, password } = req.validateData;

        const member = await authService.register(email, password);

        res.status(200).json(member);
    },

    login: async (req, res) => {
        const { email, password } = req.validateData;

        const member = await authService.login(email, password);

        if (!member) {
            res.status(400).json(new ErrorResponse('Bad credential'));
            return;
        }

        const token = await generateJWT(member);

        res.status(200).json({ token: token });
    }
};

module.exports = authController;