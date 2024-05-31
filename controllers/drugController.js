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

    // const getAllObat = async (req, res) => {
    //     let {search,page} = req.query
    //     try {
    //         let options = {}
    //         let limit
    //         let offset
    //         // console.log("KUDABAHENOL=>>>>>",search);
    //         if (search){
    //             options = {
    //                 where: { "name": { [Op.iLike]: '%'+search +'%'} }
    //                 }
    //         }
    //         if(page !== '' && typeof page!=='undefined'){
    //             if(page.size !==''  && typeof page.size!=='undefined'){
    //                 limit  = page.size
    //                 options.limit = limit
    //             }
    //             if(page.number !==''  && typeof page.number!=='undefined'){
    //                 offset = page.number*limit - limit
    //                 options.offset= offset
    //             }
    //         }else{
    //             limit = 5;
    //             offset = 0
    //             options.limit = limit
    //             options.offset = offset
    //         }
    //         const obats = await Obat.findAll(options);
    //         const formattedObats = obats.map(obat => ({
    //             id: obat.id,
    //             name: obat.name,
    //             description: obat.description,
    //             price: obat.price,
    //             stock: parseInt(obat.stock), // Mengonversi string ke integer
    //             image: obat.image
    //         }));
    
    //         const response = {
    //             status: true,
    //             message: "success",
    //             data: formattedObats
    //         };
    //         res.status(200).json(response);
    //     } catch (error) {
    //         // console.error("Error in getAllObat:", error);
    //         res.status(500).json({ message: 'Internal Server Error' });
    //     }
    // }
    
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
            // const obats = await Obat.findAll(options);
            
            // const options = {};
            // let limit;
            // let offset;
    
            // if (search) {
            //     options = {
            //         where: {
            //             "name": {
            //                 [Op.iLike]: '%'+ search + '%'
            //             }
            //         }
            //     }
            // }
    
            // // pagination
            // if (page !== '' && typeof page !== 'undefined') {
            //     if (page.size !== '' && typeof page.size !== 'undefined') {
            //         limit = page.size;
            //         options.limit = limit;
            //     }
    
            //     if (page.number !== '' && typeof page.number !== 'undefined') {
            //         offset = page.number * limit - limit;
            //         options.offset = offset;
            //     }
            // } else {
            //     limit = 5; // limit 5 item
            //     offset = 0;
            //     options.limit = limit;
            //     options.offset = offset;
            // }
    
            const data = await Drug.findAll(options);
            // console.log(data);
            if (data) {
                res.status(200).json({ data });
            }
        } catch (error) {
            console.log(error);
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
                    status: 404,
                    errMessage: "Drug not found."
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