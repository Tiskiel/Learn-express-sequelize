const authController = require('../controllers/auth.controller');
const bodyValidation = require('../middlewares/body-validation.middleware');
const { memberLoginSchema, memberRegisterSchema } = require('../validators/member.schema');


const authRouter = require('express').Router();

authRouter.route('/login')
    .post(bodyValidation(memberLoginSchema), authController.login);

authRouter.route('/register')
    .post(bodyValidation(memberRegisterSchema), authController.register);

module.exports = authRouter;