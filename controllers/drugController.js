const { Drug } = require('../models');

class DrugController {
    
    static async getAllDrugs(req, res){
        console.log("masuk ke get all drug data");

        // let {search,page} = req.query
        // try {
        //     let options = {}
        //     let limit
        //     let offset
        //     if (search){
        //         options = {
        //             where: { "name": { [Op.iLike]: '%'+search +'%'} }
        //             }
        //     }
        //     if(page !== '' && typeof page!=='undefined'){
        //         if(page.size !==''  && typeof page.size!=='undefined'){
        //             limit  = page.size
        //             options.limit = limit
        //         }
        //         if(page.number !==''  && typeof page.number!=='undefined'){
        //             offset = page.number*limit - limit
        //             options.offset= offset
        //         }
        //     }else{
        //         limit = 5;
        //         offset = 0
        //         options.limit = limit
        //         options.offset = offset
        //     }
        //     const drugs = await Drug.findAll(options);
        //     res.status(200).json(drugs);
        // } catch (error) {
        //     console.log(error)
        //     res.status(500).json({ message: 'Internal Server Error' });
        // }

        // try {

        //     const data = await Drug.findAll({});

        //     if (!data) {
        //         throw {
        //             name: "404",
        //             errMessage: "There is no drug found"
        //         }
        //     }

        //     return res.status(200).json({ data })
        // } catch(error) {
        //     if (error) {
        //         res.status(404).json({
        //             //untuk error email user tidak ditemukan, gunakan response code 404 (Not Found)
        //             message: error.errMessage
        //         })
        //     }
        // }
    }

    static async drugDetail(req, res){
        console.log('masuk ke detail obat');

        try {

            const drugId = req.params.id
            console.log(drugId);
    
            const data = await Drug.findOne({
                where: {
                    id: drugId
                }
            });
            console.log(data);

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