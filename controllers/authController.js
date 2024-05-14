const { User } = require('../models');
const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { Op } = require('sequelize');

class AuthenticationController {

    static async Register(req, res) {
        try {
            const { fullName, email, password, phoneNumber } = req.body

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
                    status: 400,
                    errMessage: `Email or Phone Number already taken!`
                }
            }

            let pwdEncrypt = hashPassword(password)
            await User.create({
                fullName, 
                email, 
                password: pwdEncrypt, 
                phoneNumber,
                roleUser: 'user'
            });
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
                    status: 404,
                    errMessage: "Email / password is not invalid."
                }
            }

            const checkPass = comparePassword(password, data.password)
            console.log(password);

            if (!checkPass) {
                throw {
                    status: 400,
                    errMessage: "Email / password is not invalid."
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