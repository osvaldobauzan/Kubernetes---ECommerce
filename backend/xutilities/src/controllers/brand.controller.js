const firebase = require('../database/db.firebase');
const firestore = firebase.firestore();
const { SECRET } = require('../config.js');
const Brand = require('../models/Brand');


const getBrands = async(req, res, next) => {
    console.log("getBrands")
    try{
        const brands = await firestore.collection('Brands');
        const data = await brands.get();
        let brandsArray = [];
            if(data.empty) {
                res.status(404).send('getBrands() => No Brands');
        } else {
            data.forEach( doc =>{
                let brand = new Brand(
                    doc.id,
                    doc.data().name,
                );
                brandsArray.push(brand);
            });

            return res.json({"brands": brandsArray});
        }
    }catch (error) {
        return res.status(400).send(error.message);
    }
};


module.exports = {
    getBrands,
}