const model = require("../../models/index");
const Constant = require("../../constant.js");
const validation = require('../validations')
const utility = require('../../services/utility')

module.exports = {
    async signUp(req, res, next) {
        try {
            await validation.user.signUp(req);
            let data = req.body;
            const emailExist = await model.user.findOne({
                email: data.email.toLowerCase()
            })
            if (emailExist) { // check email exist
                throw Constant.EMAIL_EXIST
            }
            if (!containsSpecialChars(data.password) || !containsNumbers(data.password)) { // check password contain number and special character or not
                throw Constant.MUST_CONTAIN
            }
            const saveData = await model.user({
                email: data.email.toLowerCase(),
                password: await utility.hashPasswordUsingBcrypt(data.password)
            }).save()
            res.send({
                status: 200,
                message: Constant.SUCCESS_SIGNUP,
                data: saveData
            })
        } catch (err) {
            next(err);
        }
    },
    async signin(req, res, next) {
        try {
            await validation.user.signin(req);
            let data = req.body;
            const user = await model.user.findOne({
                email: data.email.toLowerCase(),
            }).select("+password").lean();
            if (user && await utility.comparePasswordUsingBcrypt(data.password, user.password)) { // comparing password
                let jti = await utility.generateRandomString(10)
                user.authTokan = await utility.jwtSign({
                    _id: user._id,
                    jti: jti
                })
                delete user.password;
                res.send({
                    status: 200,
                    message: Constant.LOGIN_SUCCESS,
                    data: user
                })
            } else
                res.send({
                    status: 401,
                    message: Constant.INVALID_CRED
                })
        } catch (err) {
            next(err.message);
        }
    }
}

function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}

function containsNumbers(str) {
    const specialChars = /[0-9]/;
    return specialChars.test(str);
}