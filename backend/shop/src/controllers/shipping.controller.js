const firebase = require('../database/db.firebase');
const Order = require('../models/Order');
const Item = require('../models/Item');
const Payment = require('../models/Payment');
const Shipping = require('../models/Shipping');
const firestore = firebase.firestore();
const { format } = require('date-fns')

const getShippingsByUser = async (req, res, next) => {

    const userId = req.body.userId;

    try {

        const shippings = await firestore.collection('Shipping')
                                    .where('userId', '==', userId)
                                    // .where('statusOrder', '==', statusOrder);

        let shippingsArray = [];
        await shippings.get().then(snapshot => {
            snapshot.forEach(doc => {
        
                let shipping = new Shipping(
                    doc.id,
                    doc.data().userId,
                    doc.data().userFullName,
                    doc.data().orderId,
                    doc.data().address,
                    doc.data().postalCode,
                    doc.data().community,
                    doc.data().contactInfo,
                    doc.data().shippingCompany,
                    doc.data().trackingNumber,
                    doc.data().estimateDeliveryDate,
                    doc.data().shippingType,
                    doc.data().shippingCost,
                    doc.data().incidents
                );
                shippingsArray.push(shipping);
            });
        });

        return res.json(shippingsArray); 

    } catch (error) {
        return res.status(400).send(error.message);
    }

};

const getShippingsByOrder = async (req, res, next) => {

    const orderId = req.body.orderId;

    try {

        const shippings = await firestore.collection('Shipping')
                                    .where('orderId', '==', orderId)
                                    // .where('statusOrder', '==', statusOrder);

        let shippingsArray = [];
        await shippings.get().then(snapshot => {
            snapshot.forEach(doc => {
        
                let shipping = new Shipping(
                    doc.id,
                    doc.data().userId,
                    doc.data().userFullName,
                    doc.data().orderId,
                    doc.data().address,
                    doc.data().contactInfo,
                    doc.data().shippingCompany,
                    doc.data().trackingNumber,
                    doc.data().estimateDeliveryDate,
                    doc.data().shippingType,
                    doc.data().shippingCost,
                    doc.data().incidents
                );
                shippingsArray.push(shipping);
            });
        });

        return res.json(shippingsArray); 

    } catch (error) {
        return res.status(400).send(error.message);
    }

};


const getShippingsById = async (req, res, next) => {

    try{
        const id = req.params.id;
        // const paymentId = req.body.id;
        const shipping =  await firestore.collection('Shipping').doc(id);
        const data = await shipping.get();

        if ( !data.exists ) {
            return res.status(400).send('No existe pago con ese ID');    
        } else {
            return res.json(data.data());
        }

    } catch (error) {
        return res.status(400).send(error.message);
    }

};

const createshipping = async (req, res, next) => {
    try{

        const actual = new Date();
        let data = req.body;
        
        data.userId = req.body.userId,
        data.userFullName = req.body.userFullName,
        data.orderId = req.body.orderId,
        data.address = req.body.address,
        data.contactInfo = req.body.contactInfo,
        data.shippingCompany = req.body.shippingCompany,
        data.trackingNumber = req.body.trackingNumber,
        data.estimateDeliveryDate = req.body.estimateDeliveryDate,
        data.shippingType = req.body.shippingType,
        data.shippingCost = req.body.shippingCost,
        data.createdAt = format(actual, 'dd/MM/yyyy HH:mm:ss');
        data.updatedAt = format(actual, 'dd/MM/yyyy HH:mm:ss');
        data.incident = req.body.incident      
        
        const shipSaved = await firestore.collection('Shippings').doc().set(data);
    
        return res.json({'message': 'ship Saved'}); 
        } catch (error) {
            console.log('Error Creating Ship')
        return res.status(400).send(error.message);
    }
        
};


const updateShipping = async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let user = await firestore.collection('Shipping').doc(id);

        let updatedPayment = await user.update(data);

        return res.json(updatedPayment)
    } catch (error) {
        return res.status(400).send(error.message);
    }
};


module.exports = {
    getShippingsByUser,
    getShippingsByOrder,
    getShippingsById,
    createshipping,
    updateShipping

}
