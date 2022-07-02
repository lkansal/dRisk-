const Utility = require("./utility");
const Model = require('../models')
const mongoose = require('mongoose')
const constant = require('../constant')


module.exports = {
    async userAuth(req, res, next) {
    try {
         if (req.headers.authorization) {
            const accessTokenFull = req.headers.authorization;
            const decodeData = await Utility.jwtVerify(accessTokenFull);
            if (!decodeData) return res.send({ message: constant.INVALID_TOKEN});
            const userData = await Model.user.findOne({ _id: mongoose.Types.ObjectId(decodeData._id), jti: decodeData.jti }).lean().exec();
            if (userData) {
                req.user = userData;
                next();
            } else {
                return res.send({
                    status: 401,
                    message: constant.UN_AUTHORIZED
                })
            }
        } else {
            return res.send({
                status: 401,
                message: constant.AUTH_TOKEN_MISSING
            })
        }
    } catch (error) {
        next(error)
    }
}
}
