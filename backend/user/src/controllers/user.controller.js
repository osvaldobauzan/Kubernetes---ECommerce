const firebase = require('../database/db.firebase');
const User = require('../models/User');
const firestore = firebase.firestore();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config.js');

const loginUser = async(req, res, next) => {
    console.log("hola")
    // res.header("Access-Control-Allow-Origin", "*");

    // res.header(
    //     "Access-Control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-Type, Accept, authorization"
    // );
    // res.header(
    //     "Access-Control-Allow-Methods",
    //     "PUT, GET, POST, DELETE, OPTIONS"
    // );
    try {
        //Utilizando ID
        let user =  await firestore.collection('Users').doc(req.body.email);
        let data = await user.get();

        if ( !data.exists ) {
            return res.status(400).send('No existe usuario con ese ID');    
        } else {
            console.log("pass -> ", req.body.password)
            console.log("data.data() -> ", data.data().password);
            let matchPassword = await User.comparePassword(req.body.password, data.data().password)
            
            if ( !matchPassword ) {
                return res.status(401).json({
                    token: null,
                    message: "Invalid Password",
                  });
            }

            const token = jwt.sign({ id: data.id }, SECRET, {
                expiresIn: 86400, // 24 hours
            });

            res.cookie("token",token);
            userValid = data.data();
            res.json( {'email': userValid.email, 'token': token} );
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const logoutUser = async (req, res,next) => {
    res.cookie('token',"",{
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

const profile = async (req, res, next) => {

    try {
        const user =  await firestore.collection('Users').doc(req.user.id).get();
        let userFound  = user.data();
        userFound.id = user.id;

        console.log("USERFOUND! ", userFound)
        return res.json(userFound);
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const updateProfile = async (req, res, next) => {
    try {

        let data = req.body;
        // if (data.id == null) data.id = req.user.id
        console.log("UPDATEPROF", data)
        const user =  await firestore.collection('Users').doc(data.id);
        // const xx = await user.get();
        let updatedUser = await user.update(data);
        return res.json(`Actualizado: ${updatedUser}`)
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const updatePassword = async (req, res, next) => {
    try {

        let data = req.body;
        if (data.id == null) data.id = req.user.id

        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);

        console.log("UPDATE PASS", data)
        const user =  await firestore.collection('Users').doc(data.id);
        // const xx = await user.get();
        let updatedUser = await user.update(data);
        return res.json(`Contraseña actualizada: ${user.get().id}`)
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

/**
 * USER
 */
const createUser = async (req, res, next) => {
    console.log("Request => ", req.body)
    try{
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const data = req.body;
        let userSave = await firestore.collection('Users').doc(req.body.email).set(data);
        return res.json(userSave); 
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const getUsers = async (req, res, next) => {

    try{
        const users = await firestore.collection('Users');
        const data = await users.get();
        let userArray = [];
            if(data.empty) {
                res.status(404).send('getUsers() => No USERS');
        } else {
            data.forEach( doc =>{
                let user = new User(
                    doc.id,
                    doc.data().name,
                    doc.data().lastname,
                    doc.data().email,
                    doc.data().password,
                    doc.data().phone,
                    doc.data().address,
                    doc.data().postalCode,
                    doc.data().community,
                    doc.data().role,
                    doc.data().avatar,
                    doc.data().createAt,
                    doc.data().lastLogin,
                    doc.data().emailValidate
                );
                userArray.push(user);
            });

            console.log("getUSER!")
            return res.json({"users": userArray});
        }
    }catch (error) {
        return res.status(400).send(error.message);
    }
};

const getUserById = async (req, res, next) => {
    try{
        const id = req.params.id;
        const user =  await firestore.collection('Users').doc(id);
        const data = await user.get();

        if ( !data.exists ) {
            return res.status(400).send('No existe usuario con ese ID');    
        } else {
            return res.send(data.data());
        }

    } catch (error) {
        return res.status(400).send(error.message);
    }
};


/**
 * GetProfile
 */

const getProfile = async (req, res, next) => {
    try{
        const id = req.user.id;
        const user =  await firestore.collection('Users').doc(id);
        const data = await user.get();

        if ( !data.exists ) {
            return res.status(400).send('No existe usuario con ese ID');    
        } else {
            return res.send(data.data());
        }

    } catch (error) {
        return res.status(400).send(error.message);
    }
};



const updateUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let user = await firestore.collection('Users').doc(id);

        let updatedUser = await user.update(data);

        return res.send(`Actualizado: ${updatedUser}`)
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        let user = await firestore.collection('Users').doc(id).delete();
        return res.send(`Eliminando`)
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

module.exports = {
    loginUser,
    logoutUser,
    profile,
    updatePassword,
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateProfile,
    // getProfile
}
