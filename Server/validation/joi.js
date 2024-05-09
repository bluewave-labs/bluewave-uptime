const joi = require('joi')


const authValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
});


module.exports = {authValidation}