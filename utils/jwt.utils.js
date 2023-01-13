const jwt = require('jsonwebtoken');

const generateJWT = ({ id, email, isAdmin }) => {
    return new Promise((resolve, reject) => {

        const data = { id, email, isAdmin };
        const secret = process.env.JWT_SECRET;
        const option = {
            algorithm: 'HS512',
            audience: process.env.JWT_AUDIENCE,
            issuer: process.env.JWT_ISSUER,
            expiresIn: '1h'
        };


        jwt.sign(data, secret, option, (error, token) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(token);
        });
    });
};

const decodeJWT = (token) => {
    if (!token) {
        return Promise.reject(new Error('Invalid JWT'));
    }

    const secret = process.env.JWT_SECRET;
    const option = {
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,

    };
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, option, (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            resolve({
                id: data.id,
                email: data.email,
                isAdmin: data.isAdmin
            });
        });
    });
};

module.exports = {
    generateJWT,
};