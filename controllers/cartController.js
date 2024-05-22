const { where } = require('sequelize');
const { Cart, Drug } = require('../models');
const { Op } = require('sequelize');

class CartController {
    static async getAllCartItems(req, res) {

        const { userId } = req.body
        
        try {
            if (!userId || userId < 1 || !Number.isInteger(userId)) {
                throw {
                    status: 400,
                    errMessage: "Bad Request."
                }
            }

            const data = await Cart.findAll({
                where:{
                    // userId: userId
                    [Op.and]: [{ userId: userId }, { deletedAt: null }]
                },
                include: [
                    {
                        model: Drug,
                        attributes: [
                            "name",
                            "price"
                        ]
                    }
                ]
            });

            console.log(data.length);
            if (data.length > 0) {
                res.status(200).json(data);
            } else if (!data.length) {
                throw {
                    status: 404,
                    errMessage: "Not Found."
                }
            }

        } catch (error){
            console.log(error);
            res.status(error.status).json({
                message: error.errMessage
            })
        }
    }

    static async addToCart(req, res) {

        try {
            const { userId, drugId, quantity } = req.body

            const data = await Cart.findOne({
                where: {
                        // userId: idUser 
                        // jika yang dicari hanya email, gunakan syntax yang dibawah ini
                        // email: email
                        // Op berfungsi untuk menambah operasi and dan or pada select data
                        [Op.and]: [{ userId: userId }, { drugId: drugId }],
                    }
                });
            
                console.log(data);
            if (!data) {

                await Cart.create({
                    userId, 
                    drugId, 
                    quantity
                });

                res.status(201).json({
                    message: "Successful Adding to Cart."
                });
            } else if (data) {

                data.quantity += quantity;
                await data.save();

                res.status(200).json({
                    data: data,
                    message: "Successful Update the Quantity."
                });
                // throw {
                //     status: 400,
                //     errMessage: "data duplicate."
                // }
            }

            // const data = await Cart.findAll({
            //     where: {
            //         // userID: userID
            //         userId: userId
            //         // [Op.and]: [{ userId: userId }, { drugId: drugId }],
            //     }
            // })

            // if (data.length = 0) {
            //     console.log("data gak ada");
            // } else {
            //     console.log("data gak jelas");
            // }

        } catch (error) {
            console.log(error);
            res.status(error.status).json({
                //untuk error yang terjadi karena email atau phone number already exist, gunakan response code 400 (bad request)
                message: error.errMessage
            })
        }
    }

    static async updateQuantity(req, res) {
        
        const { id, quantity } = req.body

        const data = await Cart.findOne({
            where: {
                [Op.and]: [
                    { id: id }, 
                ],
            }
        });

        data.quantity = quantity
        await data.save();

        res.status(200).json(data)
    }
}

module.exports = CartController;