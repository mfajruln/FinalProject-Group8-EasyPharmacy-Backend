const { User } = require('../models');
const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { Op, json } = require('sequelize');

class AuthenticationController {

    static async Register(req, res) {
        try {
            const { fullName, email, password, phoneNumber } = req.body
            console.log(req.body);

            const data = await User.findAll({
                where: {
                        // jika yang dicari hanya email, gunakan syntax yang dibawah ini
                        // email: email
                        // Op berfungsi untuk menambah operasi and dan or pada select data
                        [Op.or]: [{ email: email }, { phoneNumber: phoneNumber }],
                    },
                });
            
            // console.log(data==true);
            if (data.length > 0) {
                // jika data ada, maka data yang diinput sudah ada pada database
                // syntax throw dibawah akan melempar object ke parameter error yang ada pada fungsi catch
                throw {
                    name: "User or Phone Number Exist",
                    status: 400,
                    errMessage: `Email or Phone Number already taken!`
                }
            }

            req.body.password = hashPassword(req.body.password)
            await User.create(req.body);
            /**
             * ! perbaiki field create-nya, req.body is not a best practice!
             */
            
            res.status(201).json({
                message: "Successful Regist!"
            })

        } catch (error){
            console.error(error);
            res.status(error.status).json({
                //untuk error yang terjadi karena email atau phone number already exist, gunakan response code 400 (bad request)
                message: error.errMessage
            })
        }
        
        // console.log("masuk regis");


        // .then(user => {
        //     console.log(typeof(user));
        //     if (user) {
        //         throw {
        //             name: "User Login Error",
        //             devMessage: `User with email ${email} already taken!`
        //         }
        //     }
        //     const isCorrect = comparePassword(password, user.password)
        //     if (!isCorrect) {
        //         throw {
        //             name: "User Login Error",
        //             devMessage: `User's password with email ${email} does not match`
        //         }
        //     }
        //     let payload = {
        //         id: user.id,
        //         email: user.email,
        //     }

        //     const token = generateToken(payload)

        //     return res.status(200).json({ token })
        // }).catch(err => {
        //     if (err.name === 'SequelizeUniqueConstraintError') {
        //         res.status(400).json({ message: 'User already exists' });
        //     } else {
        //         res.status(500).json({ message: err.message });
        //     }
        // })

        // User.findOne({
        //     where: {
        //         email,
        //         phoneNumber
        //     }
        // })
        //     .then(user => {
        //         console.log(user);
        //         if (user) {
        //             throw {
        //                 name: "User Login Error",
        //                 devMessage: `User with email ${email} already taken!`
        //             }
        //         }
        //         const isCorrect = comparePassword(password, user.password)
        //         if (!isCorrect) {
        //             throw {
        //                 name: "User Login Error",
        //                 devMessage: `User's password with email ${email} does not match`
        //             }
        //         }
        //         let payload = {
        //             id: user.id,
        //             email: user.email,
        //         }

        //         const token = generateToken(payload)

        //         return res.status(200).json({ token })
        //     })
        //     .catch(err => {
        //         console.error(err);
        //         if (err.name === 'User Login Error') {
        //             res.status(401).json({ message: err.devMessage });
        //         } else {
        //             res.status(500).json({ message: err.message });
        //         }
        //     })

        // User.create({
        //     fullname,
        //     email,
        //     phone_number: phone_number,
        //     password
        // })
        //     .then(result => {
        //         let response = {
        //             id: result.id,
        //             username: result.username,
        //             email: result.email,
        //             phone_number: result.phone_number
        //         }
        //         res.status(201).json(response)
        //     })
        //     .catch(err => {
        //         console.error(err);
        //         if (err.name === 'SequelizeUniqueConstraintError') {
        //             res.status(400).json({ message: 'User already exists' });
        //         } else {
        //             res.status(500).json({ message: err.message });
        //         }
        //     })
    }

    static async Login(req, res) {
        // console.log(req.body);

        try {
            const { email, password } = req.body
            console.log(req.body);

            const data = await User.findOne({
                where: {
                        // jika yang dicari hanya email, gunakan syntax yang dibawah ini
                        email: email
                        // Op berfungsi untuk menambah operasi and dan or pada select data
                        // [Op.or]: [{ email: email }, { phone_number: phone_number }],
                    },
                });

            if (!data) {
                throw {
                    name: "404",
                    errMessage: "Email / password is not invalid."
                }
            }

            const checkPass = comparePassword(password, data.password)

            if (!checkPass) {
                throw {
                    name: "400",
                    errMessage: "Incorrect Password"
                }
            }

            
            let payload = {
                id: data.id,
                fullName: data.fullName,
                roleUser: data.roleUser
            }
            
            const token = generateToken(payload)

            // console.log(token);

            return res.status(200).json({ token })
        } catch (error){
            console.error(error);

            res.status(error.status).json({
                message: error.errMessage
            });
            // ikutin cara ini

            if (error.name === "400") {
                res.status(400).json({
                    //untuk error invalid password, gunakan response code 400 (Bad Request)
                    message: error.errMessage
                })
            } else if (error.name === "404") {
                res.status(404).json({
                    //untuk error email user tidak ditemukan, gunakan response code 404 (Not Found)
                    message: error.errMessage
                })
            } else {
                res.status(500).json({
                    //untuk error yang terjadi karena email atau phone number already exist, gunakan response code 400 (bad request)
                    // message: error.errMessage
                })
            }
        }
        // User.findOne({
        //     where: {
        //         email
        //     }
        // })
        //     .then(user => {
        //         if (!user) {
        //             throw {
        //                 name: "User Login Error",
        //                 devMessage: `User with email ${email} not found`
        //             }
        //         }
        //         const isCorrect = comparePassword(password, user.password)
        //         if (!isCorrect) {
        //             throw {
        //                 name: "User Login Error",
        //                 devMessage: `User's password with email ${email} does not match`
        //             }
        //         }
                // let payload = {
                //     id: data.id,
                //     fullname: data.fullname,
                // }

        //         const token = generateToken(payload)

        //         return res.status(200).json({ token })
        //     })
        //     .catch(err => {
        //         console.error(err);
        //         if (err.name === 'User Login Error') {
        //             res.status(401).json({ message: err.devMessage });
        //         } else {
        //             res.status(500).json({ message: err.message });
        //         }
        //     })
    }
}

module.exports = AuthenticationController;