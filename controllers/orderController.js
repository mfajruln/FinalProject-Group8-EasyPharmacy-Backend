const { where, DATE, or } = require('sequelize');
const { Cart, Drug, Order, OrderDetail, sequelize } = require('../models');
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

    static async uppaidOrderList(req, res) {

        try {

            const userId = +req.params.id

            if (!userId || userId < 1 || !Number.isInteger(userId)) {

                throw {
                    status: 400,
                    errMessage: "Bad Request"
                }
            }

            const data = await Order.findAll({

                where:{
                    [Op.and]: [{ userId }, { paidStatus: "Belum Bayar" }]
                    // userId: userId
                }
            });

            if (data.length > 0) {

                res.status(200).json(data);
            } else if (!data.length) {

                throw {

                    status: 404,
                    errMessage: "Not Found"
                }
            }
            
        } catch (error) {

            console.log(error);
            res.status(error.status).json({

                message: error.errMessage
            })
        }
    }

    static async paidOrderList(req, res) {

        try {

            const userId = +req.params.id
            
            if (!userId || userId < 1 || !Number.isInteger(userId)) {

                throw {

                    status: 400,
                    errMessage: "Bad Request"
                }
            }

            const data = await Order.findAll({

                where:{

                    [Op.and]: [{ userId: userId }, { paidStatus: "Selesai" }]
                    // userId: userId
                }
            });

            if (data.length > 0) {

                res.status(200).json(data);
            } else if (!data.length) {

                throw {

                    status: 404,
                    errMessage: "Not Found"
                }
            }
        } catch (error) {

            console.log(error);
            res.status(error.status).json({

                message: error.errMessage
            })
        }
    }

    static async cancelOrderList(req, res) {

        try {

            const userId = +req.params.id
            
            if (!userId || userId < 1 || !Number.isInteger(userId)) {

                throw {

                    status: 400,
                    errMessage: "Bad Request"
                }
            }

            const data = await Order.findAll({

                where:{

                    [Op.and]: [{ userId: userId }, { paidStatus: "Batal" }]
                    // userId: userId
                }
            });

            if (data.length > 0) {

                res.status(200).json(data);
            } else if (!data.length) {

                throw {

                    status: 404,
                    errMessage: "Not Found"
                }
            }
        } catch (error) {

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

                res.status(200).json({

                    message: "Berhasil Menambahkan Item ke Order"
                });
            } else if (!data.length) {

                throw {

                    status: 404,
                    errMessage: "Not Found."
                }
            } else {
                throw {
                    status: 500,
                    errMessage: "Internal Server Error"
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

            const { orderDetailId, orderId, userId, quantity } = req.body
    
            if (!orderId || !userId || !orderDetailId || !quantity
                || orderId < 1 || userId < 1 || orderDetailId < 1 || quantity < 1
                || !Number.isInteger(orderId) || !Number.isInteger(userId) || !Number.isInteger(orderDetailId) || !Number.isInteger(quantity)) {

                throw {

                    status: 400,
                    errMessage: "Bad Request"
                }
            }
    
            const dataOrder = await Order.findOne({

                where: {

                    // id: id
                    [Op.and]: [
                        { id: orderId }, { userId }, {paidStatus: "Belum Bayar"}
                    ]
                }
            });

            if (!dataOrder) {

                throw {

                    status: 404,
                    errMessage: "Invalid Order"
                }
            } else if (dataOrder) {

                const dataDetailOrder = await OrderDetail.findOne({

                    where: {

                        // id: id
                        [Op.and]: [
                            { id: orderDetailId }, {orderId: dataOrder.id}
                        ]
                    }
                });

                if (!dataDetailOrder) {

                    throw {

                        status: 404,
                        errMessage: "Invalid Order Item"
                    }
                } else if (dataDetailOrder) {

                    dataDetailOrder.quantity = quantity
                    await dataDetailOrder.save();
            
                    res.status(200).json({

                        message: "Update Quantity Order Item Berhasil"
                    })
                } else {

                    throw {

                        status: 500,
                        errMessage: "Internal Server Error"
                    }
                }
            } else {

                throw {

                    status: 500,
                    errMessage: "Internal Server Error"
                }
            }
        } catch(error) {

            console.log(error);
            res.status(error.status).json({

                message: error.errMessage
            })
        }
        
    }

    static async detailOrder(req, res) {
        
        try {

            const { orderId, userId } = req.body

            if (!orderId || !userId ||
                orderId < 1 || userId < 1 ||
                !Number.isInteger(orderId) || !Number.isInteger(userId)) {

                throw {

                    status: 400,
                    errMessage: "Bad Request"
                }
            }

            const dataOrder = await Order.findOne({
                
                where: {

                    [Op.and]: [
                        { id: orderId }, { userId }
                    ]
                }
            })

            if (!dataOrder) {

                throw {

                    status: 404,
                    errMessage: "Invalid Order"
                }
            } else if(dataOrder) {

                const dataDetailOrder = await OrderDetail.findAll({

                    where: {
                        orderId
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
    
                if (dataDetailOrder.length > 0) {

                    res.status(200).json(dataDetailOrder);
                } else if (!dataDetailOrder.length) {

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
            } else {

                throw {

                    status: 500,
                    errMessage: "Internal Server Error"
                }
            }
    
            
        } catch (error) {

            console.log(error);
            res.status(error.status).json({

                message: error.errMessage
            })
        }

    }

    static async paidOrder(req, res) {

        const transc = await sequelize.transaction();

        try {
            
            const { orderId, userId } = req.body

            if (!orderId || !userId
                || orderId < 1 || userId < 1
                || !Number.isInteger(orderId) || !Number.isInteger(userId)) {
                throw {
                    status: 400,
                    errMessage: "Bad Request"
                }
            }
    
            const data = await Order.findOne({
                where: {
                    [Op.and]: [
                        { id: orderId }, { userId }, {paidStatus: "Belum Bayar"}
                    ]
                }
            })

            if (!data) {
                
                throw {

                    status: 404,
                    errMessage: "Not Found"
                }
            } else if (data) {

                const dataQuantityOrder = await OrderDetail.findAll({

                    where: {
                        orderId: data.id
                    }
                })

                for (let drug of dataQuantityOrder) {
                    
                    const dataStock = await Drug.findOne({

                        where: {

                            id: drug.drugId
                        }
                    })
    
                    if (drug.quantity > dataStock.stock) {
                        
                        throw {
    
                            status: 400,
                            errMessage: "Out of Stock " + dataStock.name
                        }
                    } else {

                        await dataStock.decrement('stock', {

                            by: drug.quantity
                        }, {
                            transaction: transc
                        })
                    }
                }

                data.paidStatus = "Selesai";
                await data.save();

                await transc.commit();

                res.status(200).json({
                    message: "Order Berhasil di Bayar"
                });

                // data.paidStatus = "Batal"
                // await data.save();
        
                // res.status(200).json({
                //     message: "Order Berhasil di Batalkan"
                // })


            } else {
                throw {

                    status: 500,
                    errMessage: "Internal Server Error"
                }
            }


        } catch (error) {

            console.log(error);

            await transc.rollback();
            res.status(error.status).json({

                message: error.errMessage
            })
        }
        
    }
    
    static async cancelOrder(req, res) {
        
        try {
            
            const { orderId, userId } = req.body

            if (!orderId || !userId
                || orderId < 1 || userId < 1
                || !Number.isInteger(orderId) || !Number.isInteger(userId)) {

                throw {

                    status: 400,
                    errMessage: "Bad Request"
                }
            }
    
            const data = await Order.findOne({

                where: {

                    [Op.and]: [
                        { id: orderId }, { userId }, {paidStatus: "Belum Bayar"}
                    ]
                }
            })

            if (!data) {

                throw {

                    status: 404,
                    errMessage: "Not Found."
                }
            } else if (data) {

                data.paidStatus = "Batal"
                await data.save();
        
                res.status(200).json({

                    message: "Order Berhasil di Batalkan"
                })
            } else {

                throw {

                    status: 500,
                    errMessage: "Internal Server Error"
                }
            }
        } catch (error) {

            console.log(error);
            res.status(error.status).json({

                message: error.errMessage
            })
        }
        
    }
}

module.exports = OrderController;