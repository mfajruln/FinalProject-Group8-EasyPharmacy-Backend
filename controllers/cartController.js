const { where, json } = require('sequelize');
const { Cart, Drug } = require('../models');
const { Op } = require('sequelize');

class CartController {
    static async getAllCartItems(req, res) {

        const { userId } = req.body

        console.log(userId);

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
            const { userId, drugId, quantity, location } = req.body

            if (!userId || !drugId || !quantity
                || userId < 1 || drugId < 1 || quantity < 1
                || !Number.isInteger(userId) || !Number.isInteger(drugId) || !Number.isInteger(quantity)) {
                throw {
                    status: 400,
                    errMessage: "Bad Request."
                }
            }

            const data = await Cart.findOne({
                where: {
                        // userId: idUser 
                        // jika yang dicari hanya email, gunakan syntax yang dibawah ini
                        // email: email
                        // Op berfungsi untuk menambah operasi and dan or pada select data
                        [Op.and]: [{ userId: userId }, { drugId: drugId }, {deletedAt: null}],
                    }
                });
            
                console.log(data);

                // ada bug, ketika data cart sudah di delete
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
                // bug, update data masih salah saat quantity nya di update
                // tambah endpoint update
                await data.save();

                res.status(200).json({
                    data: data,
                    message: "Successful Update the Quantity."
                });
            }

        } catch (error) {
            console.log(error);
            res.status(error.status).json({
                //untuk error yang terjadi karena email atau phone number already exist, gunakan response code 400 (bad request)
                message: error.errMessage
            })
        }
    }

    static async updateQuantity(req, res) {

        try {
            const { id, quantity } = req.body
    
            if (!id || !quantity
                || id < 1 || quantity < 1
                || !Number.isInteger(id) || !Number.isInteger(quantity)) {
                throw {
                    status: 400,
                    errMessage: "Bad Request."
                }
            }
    
            const data = await Cart.findOne({
                where: {
                    id: id
                }
            });

            if (!data) {
                throw {
                    status: 404,
                    errMessage: "Not Found."
                }
            }
    
            data.quantity = quantity
            await data.save();
    
            res.status(200).json(data)
        } catch(error) {
            console.log(error);
            res.status(error.status).json({
                message: error.errMessage
            })
        }
        
    }

    static async deleteCart(req, res) {

        try {

            const {id, userId} = req.body

            if (!id || !userId || id < 1 || userId < 1|| !Number.isInteger(id) || !Number.isInteger(userId)) {
                throw {
                    status: 400,
                    errMessage: "Bad Request"
                }
            }
            
            const data = await Cart.findOne({
                where: {
                    [Op.and]: [{ id: id }, { userId: userId }]
                }
            })

            console.log(data);

            if (data) {
                await data.destroy();
                res.status(200).json({
                    message: "Successful Deleting the Cart"
                });
            } else if (!data) {
                throw {
                    status: 404,
                    errMessage: "Not Found"
                }
            } else {
                throw {
                    status: 500,
                    errMessage: "Internal Server Error"
                }
            }

        } catch (error) {
            res.status(error.status).json({
                message: error.errMessage
            })
        }
    }
}

module.exports = CartController;