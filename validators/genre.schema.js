const yup = require('yup');

const genreSchema = yup.object().shape({
    name: yup.string().trim().required().min(2).max(50),
    desc: yup.string().nullable().trim().max(1000, 'C\'est trop long fieu')
});

module.exports = {
    genreSchema
};