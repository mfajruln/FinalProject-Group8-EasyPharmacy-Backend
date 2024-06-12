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

        try {
            const { search, page } = req.query;

            let options = {}
            let limit
            let offset

            if (search){
                options = {
                    where: { "name": { [Op.iLike]: '%'+search +'%'} }
                    }
            }
            if(page !== '' && typeof page!=='undefined'){
                if(page.size !==''  && typeof page.size!=='undefined'){
                    limit  = page.size
                    options.limit = limit
                }
                if(page.number !==''  && typeof page.number!=='undefined'){
                    offset = page.number*limit - limit
                    options.offset= offset
                }
            }else{
                limit = 5;
                offset = 0
                options.limit = limit
                options.offset = offset
            }
    
            const data = await Drug.findAll(options);

            if (data) {

                res.status(200).json({ data });
            } else {
                
                throw {

                    status: 500,
                    errMessage: "Internal Server Error"
                }
            }
        } catch (error) {
            
            res.status(error.status).json({

                message: error.errMessage
            });
        }
    }

    static async drugDetail(req, res) {

        try {

            const drugId = +req.params.id

            if (!drugId || drugId < 1 || !Number.isInteger(drugId)) {
                throw {
                    status: 400,
                    errMessage: "Bad Request"
                }
            }

            const data = await Drug.findOne({
                where: {
                    id: drugId
                }
            });

            if (data) {
                res.status(200).json({ data })
            } else if(!data) {
                throw {
                    status: 404,
                    errMessage: "Drug not found"
                }
            }
        } catch(error) {
            res.status(error.status).json({
                message: error.errMessage
            });
        }
    }
}

module.exports = DrugController;