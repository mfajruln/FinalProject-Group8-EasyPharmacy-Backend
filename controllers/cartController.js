const { Cart } = require('../models');

class CartController {
    static async getAllCartItems(req, res) {
        console.log("masuk ke all cart items");
    }

    static async addToCart(req, res){
        const reqData = req.body;

        console.log(reqData);
    }
}

module.exports = CartController;