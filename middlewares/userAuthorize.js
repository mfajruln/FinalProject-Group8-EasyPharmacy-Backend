const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

async function checkUserRole(req, res, next) {
    try {
        if (req.get("token")) {
            const token = req.get("token");
            const dataDecrypt = verifyToken(token);

            const data = await User.findOne({
                where: {
                    id: dataDecrypt.id
                }
            });

            if (data && data.roleUser === "user") {
                return next();
            } else {
                throw {
                    status: 403,
                    errMessage: "User is not authorized"
                };
            }
        } else {
            throw {
                status: 500,
                errMessage: "Internal Server Error"
            };
        }
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.errMessage || "Internal Server Error"
        });
    }
}

module.exports = checkUserRole;