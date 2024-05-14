const { Drug } = require('../models');
const { Op, where } = require('sequelize');

class DrugController {

    static async getLenghtData(req, res) {

        const data = await Drug.findAll({
            where: {
                isActive: "active"
            }
        });

        let lenghtData = data.length;

        res.status(200).json({ lenghtData });
    }
    
    static async getAllDrugs(req, res) {

        const { page } = req.query;
        const paramQuerySQL = {};
        let limit;
        let offset;

        // pagination
        if (page !== '' && typeof page !== 'undefined') {
        if (page.size !== '' && typeof page.size !== 'undefined') {
            limit = page.size;
            paramQuerySQL.limit = limit;
        }

        if (page.number !== '' && typeof page.number !== 'undefined') {
            offset = page.number * limit - limit;
            paramQuerySQL.offset = offset;
        }
        } else {
            limit = 5; // limit 5 item
            offset = 0;
            paramQuerySQL.limit = limit;
            paramQuerySQL.offset = offset;
        }

        try {
            const data = await Drug.findAll(paramQuerySQL);
            if (data) {
                res.status(200).json({ data });
            }
        } catch (err) {
            next(err);
        }

    }

    static async drugDetail(req, res) {

        try {

            const drugId = req.params.id

            const data = await Drug.findOne({
                where: {
                    id: drugId
                }
            });

            if (data) {
                res.status(200).json({ data })
            } else if(!data) {
                throw {
                    name: "404",
                    errMessage: "Drug not found."
                }
            }
        } catch(error) {
            res.status(404).json({
                //untuk error email user tidak ditemukan, gunakan response code 404 (Not Found)
                message: error.errMessage
            })
        }
    }
}

module.exports = DrugController;