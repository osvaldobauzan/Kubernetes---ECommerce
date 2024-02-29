const {Router} = require('express');
const router = Router(); 
const authMiddleware = require('../middlewares/validateToken')
const upload = require('../multer-config'); // Importa el middleware multer

// Articles
const articleController = require('../controllers/article.controller');
router.get('/articles', articleController.getArticles);
router.get('/articles/:id', articleController.getArticleById);

// Brand
const brandController = require('../controllers/brand.controller');
router.get('/brands', brandController.getBrands);

// Communities and Cities
const communityController = require('../controllers/community.controller');
router.get('/communities', communityController.getCommunities);

// Reviews
const reviewController = require('../controllers/review.controller');
router.get('/reviews/product/:id', reviewController.getReviewByProduct);
router.get('/reviews/user', authMiddleware.authRequired, reviewController.getReviewsByUser);

router.post('/reviews/product/:id', reviewController.createReview)
// router.post('/reviews/product/:id', upload.single('image'), reviewController.createReview)
// Añadir reviews por usuario

router.post('/reviews', reviewController.createReview);
// router.post('/reviews', authMiddleware.authRequired, reviewController.createReview);


module.exports = router;