const router = require('express').Router();

const AuthenticationController = require('../controllers/authController');
const DrugController = require('../controllers/drugController');
const CartController = require('../controllers/cartController');

const authentication = require('../middlewares/authentication');
const userField = require('../middlewares/userAuthorize');

router.post('/user/register', AuthenticationController.Register);
router.post('/user/login', AuthenticationController.Login);

// route use itu untuk menambahkan middleware atau prefix pada routenya
router.use(authentication);

router.use(userField);
router.get('/drug/list', DrugController.getAllDrugs);
router.get('/drug/detail/:id', DrugController.drugDetail);

router.get('/drug/list', CartController.getAllCartItems);
router.get('/drug/list', CartController.addToCart);

module.exports = router;