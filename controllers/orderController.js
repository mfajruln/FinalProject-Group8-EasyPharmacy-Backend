const { where, DATE, or } = require('sequelize');
const { Cart, Drug, Order, OrderDetail } = require('../models');
const { Op } = require('sequelize');

class OrderController {
    static async getAllOrders(req, res) {

        const { userId } = req.body

        try {
            if (!userId || userId < 1 || !Number.isInteger(userId)) {
                throw {
                    status: 400,
                    errMessage: "Bad Request."
                }
            }

            const data = await Order.findAll({
                where:{
                    userId: userId
                }
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

    static async placedOrder(req, res) {

        try {
            const { userId } = req.body

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
                }
            });

            if (data.length > 0) {

                const dataOrder = await Order.create({
                    userId,
                    paidStatus: "Belum Bayar"
                })

                const orderId = dataOrder.id

                const payload = data.map(item => {
                    return {
                        orderId,
                        drugId: item.drugId,
                        quantity: item.quantity
                    }
                })

                await Cart.update(
                    {
                        deletedAt: new Date()
                    },
                    {
                        where:{
                            [Op.and]: [{ userId: userId }, { deletedAt: null }]
                        },
                    },
                );

                const orderDetailItems = await OrderDetail.bulkCreate(payload);

                res.status(200).json(orderDetailItems);
            } else if (!data.length) {
                throw {
                    status: 404,
                    errMessage: "Not Found."
                }
            }

        } catch(error) {
            console.log(error);
            res.status(error.status).json({
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

    static async historyOrder(req, res) {
        console.log("masuk ke history order");
    }

    static async detailOrder(req, res) {
        
        try {

            const orderId = +req.params.id

            if (!orderId || orderId < 1 || !Number.isInteger(orderId)) {
                throw {
                    status: 400,
                    errMessage: "Bad Request."
                }
            }
    
            const data = await OrderDetail.findAll({
                where: {
                    orderId: orderId
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
            })

            if (data.length > 0) {
                res.status(200).json(data);
            } else if (!data.length) {
                throw {
                    status: 404,
                    errMessage: "Not Found."
                }
            }
        } catch (error) {
            console.log(error);
            res.status(error.status).json({
                message: error.errMessage
            })
        }

    }

    static async cancelOrder(req, res) {
        console.log("coba cancel order");

        
    }
}

module.exports = OrderController;