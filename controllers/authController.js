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
            
            res.status(201).json({
                message: "Successful Regist!"
            })

        } catch (error){
            res.status(error.status).json({
                //untuk error yang terjadi karena email atau phone number already exist, gunakan response code 400 (bad request)
                message: error.errMessage
            })
        }
    }

    static async Login(req, res) {

        try {
            const { email, password } = req.body

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

            const userData = {
                id: data.id,
                email: data.email,
                fullName: data.fullName
            }

            return res.status(200).json({ token, userData })
        } catch (error) {

            res.status(error.status).json({
                message: error.errMessage
            });
            // ikutin cara ini
        }
    }
}

module.exports = AuthenticationController;