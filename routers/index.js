const router = require('express').Router();

const AuthenticationController = require('../controllers/authController');
const DrugController = require('../controllers/drugController');
const CartController = require('../controllers/cartController');
const OrderController = require('../controllers/orderController');

const authentication = require('../middlewares/authentication');
const userField = require('../middlewares/userAuthorize');

/**
 * * Basic Route Section
 */
router.post('/user/register', AuthenticationController.Register);
router.post('/user/login', AuthenticationController.Login);

router.get('/drug/datalength', DrugController.getLenghtData);
router.get('/drug/list', DrugController.getAllDrugs);
router.get('/drug/detail/:id', DrugController.drugDetail);

/**
 * * Authentication Section
 */
router.use(authentication);

/**
 * * Authorization Section
 */
router.use(userField);

/**
 * * Cart Section
 */
router.get('/cart/list/:id', CartController.getAllCartItems);
router.post('/cart/add', CartController.addToCart);
router.delete('/cart/delete/', CartController.deleteCart);
router.put('/cart/updatequantity', CartController.updateQuantity);

/**
 * * Order Section
 */
router.get('/order/unpaidlist/:id', OrderController.uppaidOrderList);
router.get('/order/paidlist/:id', OrderController.paidOrderList);
router.get('/order/cancellist/:id', OrderController.cancelOrderList);
// router.get('/order/list', OrderController.getAllOrders);
router.post('/order/placedorder', OrderController.placedOrder);
router.post('/order/detail', OrderController.detailOrder);
router.post('/order/paid', OrderController.paidOrder);
router.put('/order/update', OrderController.updateQuantity);
router.post('/order/cancel', OrderController.cancelOrder);

module.exports = router;