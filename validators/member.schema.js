const yup = require('yup');

const regexPwd = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+)/;
const regexPwdError = 'Mot de passe trop faible';

const memberLoginSchema = yup.object().shape({
    email: yup.string().trim().required(),
    password: yup.string().min(8).required()
});

const memberRegisterSchema = yup.object().shape({
    email: yup.string().trim().required().email().max(200),
    password: yup.string().required()
});

module.exports = {
    memberLoginSchema,
    memberRegisterSchema
};