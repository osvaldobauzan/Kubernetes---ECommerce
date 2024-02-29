const firebase = require('../database/db.firebase');
const firestore = firebase.firestore();
const { SECRET } = require('../config.js');
const Article = require('../models/Article')


const getArticles = async(req, res, next) => {
    try{
        const articles = await firestore.collection('Articles');
        const data = await articles.get();
        let articlesArray = [];
            if(data.empty) {
                res.status(404).send('getArticles() => No Articles');
        } else {
            data.forEach( doc =>{
                let article = new Article(
                    doc.id,
                    doc.data().title,
                    doc.data().description,
                    doc.data().imageArticle,
                    doc.data().imageMini,
                    doc.data().article,
                    doc.data().tags
                );
                articlesArray.push(article);
            });

            return res.json({"articles": articlesArray});
        }
    }catch (error) {
        return res.status(400).send(error.message);
    }
};


const getArticleById = async(req, res, next) => {
    try{

        const id = req.params.id;
        const articles = await firestore.collection('Articles').doc(id);
        const data = await articles.get();

        if ( !data.exists ) {
            return res.status(400).send('No existe Artículo con ese ID');    
        } else {
            return res.send(data.data());
        }
    }catch (error) {
        return res.status(400).send(error.message);
    }
};


module.exports = {
    getArticles,
    getArticleById,
}