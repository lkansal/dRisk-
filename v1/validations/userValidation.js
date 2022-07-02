const joi = require('joi');

const validateSchema = async (inputs, schema) => {
    try {
        const { error, value } = schema.validate(inputs);
        console.log(error);
        if (error) throw error.details ? error.details[0].message.replace(/['"]+/g, '') : "";
        else return false;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    async signUp(req, property = 'body'){
        let schema = joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().required()
        });
        return await validateSchema(req[property], schema);
    },
    async signin(req, property = 'body'){
        let schema = joi.object().keys({
            email: joi.string().required(),
            password: joi.string().required()
        });
        return await validateSchema(req[property], schema);
    }
}