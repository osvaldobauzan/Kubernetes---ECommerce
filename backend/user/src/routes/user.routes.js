const {Router} = require('express');
const router = Router(); 

const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/validateToken')

// Authentication
router.post('/login', userController.loginUser);
router.post('/logout', authMiddleware.authRequired, userController.logoutUser);
router.get('/profile', authMiddleware.authRequired, userController.profile);
// router.put('/updateProfile', authMiddleware.authRequired, userController.updateProfile);
router.put('/updateProfile', authMiddleware.authRequired, userController.updateProfile);
router.put('/updatePassword', authMiddleware.authRequired, userController.updatePassword);

// Users
router.get('/', authMiddleware.authRequired, userController.getUsers);
router.post('/', userController.createUser);
// router.post('/', authMiddleware.authRequired, userController.createUser);
// router.get('/profile', authMiddleware.authRequired, userController.getProfile);
router.get('/:id', authMiddleware.authRequired, userController.getUserById);
router.put('/:id', authMiddleware.authRequired, userController.updateUser);
router.delete('/:id', authMiddleware.authRequired, userController.deleteUser);

// router.post('/', productController.createProduct);
// router.get('/', productController.getProducts);
// router.get('/:productId', productController.getProductsById);
// router.put('/:productId', productController.updateProduct);
// router.delete('/:productId', productController.deleteProduct);

module.exports = router;