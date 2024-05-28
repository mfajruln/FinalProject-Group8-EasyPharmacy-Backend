const router = require('express').Router();

const AuthenticationController = require('../controllers/authController');
const DrugController = require('../controllers/drugController');
const CartController = require('../controllers/cartController');
const OrderController = require('../controllers/orderController');

const authentication = require('../middlewares/authentication');
const userField = require('../middlewares/userAuthorize');

router.post('/user/register', AuthenticationController.Register);
router.post('/user/login', AuthenticationController.Login);

router.get('/drug/datalength', DrugController.getLenghtData);
router.get('/drug/list', DrugController.getAllDrugs);
router.get('/drug/detail/:id', DrugController.drugDetail);

// route use itu untuk menambahkan middleware atau prefix pada routenya
router.use(authentication);

router.use(userField);
router.get('/cart/list', CartController.getAllCartItems);
router.post('/cart/add', CartController.addToCart);
router.delete('/cart/delete/', CartController.deleteCart);
router.put('/cart/updatequantity', CartController.updateQuantity);

router.get('/order/unpaid', OrderController.getAllOrders);
router.get('/order/paid', OrderController.getAllOrders);
router.get('/order/canceled', OrderController.getAllOrders);
router.get('/order/list', OrderController.getAllOrders);
router.post('/order/placedorder', OrderController.placedOrder);
router.get('/order/detail/:id', OrderController.detailOrder);
router.put('/order/cancel/:id', OrderController.cancelOrder);

module.exports = router;