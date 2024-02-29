const firebase = require('../database/db.firebase');
const firestore = firebase.firestore();
// var multer = require('multer');
const { SECRET } = require('../config.js');
const Review = require('../models/Review.js')

// const upload = require('../multer-config');


const createReview = async(req, res, next) => {

    /**
     * Por terminar
     */
    // const filename = req.file.image;
    // const path = req.file. path;
    // console.log(typeof req.image)

    // console.log("Request createReview => ", req.body)
    console.log("REQQQQQQQ" , req.body);
    try{
        const id = req.params.id;
        const data = req.body;
        data.productId = id;
        console.log(data);
        let reviewSaved = await firestore.collection('Reviews').doc().set(data);
        return res.json(reviewSaved); 
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const getReviewByProduct = async(req, res, next) => {
    try{
        const id = req.params.id;
        const reviews = await firestore.collection('Reviews').where('productId', '==', id);
        const data = await reviews.get();
        let reviewsArray = [];
            if(data.empty) {
                res.status(404).send('getReviews() => No Reviews');
        } else {
            data.forEach( doc =>{
                let review = new Review(
                    doc.id,
                    doc.data().productId,
                    doc.data().userId,
                    doc.data().title,
                    doc.data().review,
                    doc.data().rating,
                    doc.data().likes
                );
                reviewsArray.push(review);
            });

            return res.json({"reviews": reviewsArray});
        }
    }catch (error) {
        return res.status(400).send(error.message);
    }
};

const getReviewsByUser = async(req, res, next) => {
    try{
        console.log('getReviewsByUser', req.user)
        const id = req.user.id
        const reviews = await firestore.collection('Reviews').where('userId', '==', id);
        const data = await reviews.get();
        let reviewsArray = [];

        if(data.empty) {
                res.status(204).json(reviewsArray);
        } else {
            data.forEach( doc =>{
                let review = new Review(
                    doc.id,
                    doc.data().productId,
                    doc.data().userId,
                    doc.data().title,
                    doc.data().review,
                    doc.data().rating,
                    doc.data().likes
                );
                reviewsArray.push(review);
            });

            

            return res.json(reviewsArray);
        }
    }catch (error) {
        return res.status(400).send(error.message);
    }
};


module.exports = {
    getReviewByProduct,
    createReview,
    getReviewsByUser,
}