const argon2 = require('argon2');
const memberService = require('./member.service');

const authService = {

    register: async (email, password) => {
        if (!email || !password) {
            throw new Error('Data is required !');
        }
        let hashPassword;
        try {
            hashPassword = await argon2.hash(password);
        } catch (error) {
            res.json(new ErrorResponse(error));
        }

        const member = memberService.add({ email, hashPassword });

        return member;
    },

    login: async (email, password) => {

        const hashPassword = await memberService.getHashPassword(email);

        if (!hashPassword) {
            return null;
        }

        const isValid = argon2.verify(hashPassword, password);

        if (!isValid) {
            return null;
        }

        return await memberService.getByEmail(email);

    }

};

module.exports = authService;