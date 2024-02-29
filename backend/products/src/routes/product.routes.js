const {Router} = require('express');
const router = Router(); 

const productController = require('../controllers/product.controller')

router.get('/', productController.getProducts);
router.get('/search/:text', productController.getProductsByName);
router.get('/brands', productController.getBrands);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.get('/category/:category', productController.getProductsByCategory);
router.put('/update', productController.updateProduct);

// router.get('/', userController.getUsers);
// router.post('/', userController.createUser);
// router.get('/:id',userController.getUserById);
// router.put('/:id',userController.updateUser);
// router.delete('/:id',userController.deleteUser);


module.exports = router;