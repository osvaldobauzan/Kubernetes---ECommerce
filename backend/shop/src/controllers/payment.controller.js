const firebase = require('../database/db.firebase');
const Order = require('../models/Order');
const Item = require('../models/Item');
const Payment = require('../models/Payment')
const firestore = firebase.firestore();
const { format } = require('date-fns')

const getPaymentsByUser = async (req, res, next) => {

    const userId = req.body.userId;

    try {

        const payments = await firestore.collection('Payments')
                                    .where('userId', '==', userId)
                                    // .where('statusOrder', '==', statusOrder);

        let paymentsArray = [];
        await payments.get().then(snapshot => {
            snapshot.forEach(doc => {
        
                let payment = new Payment(
                    doc.id,
                    doc.data().userId,
                    doc.data().orderId,
                    doc.data().paymentType,
                    doc.data().paypalAccount,
                    doc.data().paymentStatus,
                    doc.data().total,
                    doc.data().createAt,
                    doc.data().updateAt
                );
                paymentsArray.push(payment);
            });
        });

        return res.json(paymentsArray); 

    } catch (error) {
        return res.status(400).send(error.message);
    }

};

const getPaymentsByOrder = async (req, res, next) => {

    const orderId = req.body.orderId;

    try {

        const payments = await firestore.collection('Payments')
                                    .where('orderId', '==', orderId)
                                    // .where('statusOrder', '==', statusOrder);

        let paymentsArray = [];
        await payments.get().then(snapshot => {
            snapshot.forEach(doc => {
        
                let payment = new Payment(
                    doc.id,
                    doc.data().userId,
                    doc.data().orderId,
                    doc.data().paymentType,
                    doc.data().paypalAccount,
                    doc.data().paymentStatus,
                    doc.data().total,
                    doc.data().createAt,
                    doc.data().updateAt
                );
                paymentsArray.push(payment);
            });
        });

        return res.json(paymentsArray); 

    } catch (error) {
        return res.status(400).send(error.message);
    }

};


const getPaymentsById = async (req, res, next) => {

    try{
        const id = req.params.id;
        // const paymentId = req.body.id;
        const payment =  await firestore.collection('Payments').doc(id);
        const data = await payment.get();

        if ( !data.exists ) {
            return res.status(400).send('No existe pago con ese ID');    
        } else {
            return res.json(data.data());
        }

    } catch (error) {
        return res.status(400).send(error.message);
    }

};

const createPayment = async (req, res, next) => {
    try{

        const actual = new Date();
        // const formatedDateTime = 
        let data = req.body;
        data.orderId = req.body.orderId;
        data.userId = req.body.userId;
        data.paymenttype = "PayPal";
        data.paypalAccount = req.body.paypalAccount;
        data.paymentStatus = "wating";
        data.total = req.body.total;
        data.createdAt = format(actual, 'dd/MM/yyyy HH:mm:ss');
        data.updatedAt = format(actual, 'dd/MM/yyyy HH:mm:ss');

        const cartSaved = await firestore.collection('Payments').doc().set(data);
    
        return res.json({'message': 'Payment Saved'}); 
        } catch (error) {
            console.log('Error Creating Payment')
        return res.status(400).send(error.message);
    }
        
};


const updatePayment = async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let user = await firestore.collection('Payments').doc(id);

        let updatedPayment = await user.update(data);

        return res.json(updatedPayment)
    } catch (error) {
        return res.status(400).send(error.message);
    }
};


module.exports = {
    getPaymentsByUser,
    getPaymentsByOrder,
    getPaymentsById,
    createPayment,
    updatePayment

}
