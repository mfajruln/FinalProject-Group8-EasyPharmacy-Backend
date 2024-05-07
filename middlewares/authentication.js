const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt');
const { where } = require('sequelize');

async function checkAuth(req, res, next) {
    console.log(req.get);

    try {

        // if (!req.get("token")) {
        //     console.log('token is not found');
        //     throw {
        //         name: "401",
        //         errMessage: "You don't have the right access, please login first."
        //     }
        // }

        if (req.get("token")) {
            const token = req.get("token");
            const dataDecrypt = verifyToken(token)

            const user = await User.findOne({
                where: {
                    id: dataDecrypt.id
                }
            });
            if (user) {
                return next()
            } else {
                throw {
                    name: "401",
                    errMessage: "User are not identified"
                }
            }
        } else if(!req.get("token")){
            throw {
                name: "401",
                errMessage: "You don't have the right access, please login first."
            }
        } else {
            throw {
                name: "500",
                errMessage: "Server Error."
            }
        }
    } catch(error) {
        if (error.name === "400") {
            res.status(400).json({
                //untuk error invalid password, gunakan response code 400 (Bad Request)
                message: error.errMessage
            })
        } else if (error.name === "401") {
            res.status(404).json({
                //untuk error email user tidak ditemukan, gunakan response code 404 (Not Found)
                message: error.errMessage
            })
        } else {
            res.status(500).json({
            })
        }
    }

    // const token = req.get("token")
    // const dataDecrypt = verifyToken(token)

    // try {
    //     const data = await User.findOne({
    //         where: {
    //             id: dataDecrypt.id
    //         }
    //     });

    //     if (!data) {
    //         throw {
    //             name: "404",
    //             errMessage: "Email user is not found"
    //         }
    //     }
    // } catch(error) {

    // }
}
// class Authentication {
// }

// function authentication(req, res, next) {
//     try {
//         const token = req.get("token")
//         const userDecoded = verifyToken(token)

//         console.log(userDecoded);
//         User.findOne({
//             where: {
//                 id: userDecoded.id,
//             }
//         })
//             .then(user => {
//                 if (!user) {
//                     return res.status(401).json({
//                         name: "Authentication Error",
//                         devMessage: `User with id ${userDecoded.id} not found in Database`
//                     })
//                 }
//                 res.locals.user = user
//                 return next()
//             })
//             .catch(err => {
//                 return res.status(401).json(err)
//             })
//     } catch (err) {
//         return res.status(401).json(err)
//     }
// }

module.exports = checkAuth