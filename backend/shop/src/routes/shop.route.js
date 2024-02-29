const {Router} = require('express');
const router = Router(); 

const orderController = require('../controllers/order.controller')
const itemController = require('../controllers/item.controller')
const paymentController = require('../controllers/payment.controller')
const authMiddleware = require('../middlewares/validateToken')

// Orders & carts
router.get('/cart', authMiddleware.authRequired, orderController.getCart);
router.get('/orders-status', authMiddleware.authRequired, orderController.getOrderByStatus);
router.post('/createCart', authMiddleware.authRequired, orderController.createCart);
router.put('/updateOrder', authMiddleware.authRequired, orderController.updateOrder);
router.put('/changeOrderStatus', authMiddleware.authRequired, orderController.changeOrderStatus);
router.get('/getOrdersByUser', authMiddleware.authRequired, orderController.getOrdersByUser);
router.get('/getOrderById/:orderId', authMiddleware.authRequired, orderController.getOrderById);
router.put('/update/payment/', authMiddleware.authRequired, orderController.updateOrderStatePayment, itemController.updateStatusItem);


// Items
router.post('/addItem', authMiddleware.authRequired, itemController.addItemToCart);
router.post('/cleanItemsToCart', authMiddleware.authRequired, itemController.cleanItemsToCart)
router.get('/getItem/:id', authMiddleware.authRequired, itemController.getItem);
router.get('/getItemsByOrder/:orderId', authMiddleware.authRequired, itemController.getItemsByOrder);
router.delete('/deleteItem/:id', authMiddleware.authRequired, itemController.deleteItem)

// Payments
router.get('/getPaymentByUser', paymentController.getPaymentsByUser);
router.get('/getPaymentByOrder', paymentController.getPaymentsByOrder);
router.get('/getPaymentById/:id', paymentController.getPaymentsById);
router.post('/createPayment', paymentController.createPayment);
router.put('/updatePayment/:id', paymentController.updatePayment);






// router.get('/', userController.getUsers);
// router.post('/', userController.createUser);
// router.get('/:id',userController.getUserById);
// router.put('/:id',userController.updateUser);
// router.delete('/:id',userController.deleteUser);


module.exports = router;