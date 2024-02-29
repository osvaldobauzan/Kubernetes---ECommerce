const firebase = require('../database/db.firebase');
const firestore = firebase.firestore();
const { SECRET } = require('../config.js');
const Community = require('../models/Community.js');


const getCommunities = async(req, res, next) => {
    try{
        const communities = await firestore.collection('Communities');
        const data = await communities.orderBy('name').get();
        let communitiesArray = [];
            if(data.empty) {
                res.status(404).send('getCommunities() => No Communities');
        } else {
            data.forEach( doc =>{
                let com = new Community(
                    doc.id,
                    doc.data().name,
                );
                communitiesArray.push(com);
            });
            // console.log(communitiesArray)

            return res.json({"communities": communitiesArray});
        }
    }catch (error) {
        return res.status(400).send(error.message);
    }
};


module.exports = {
    getCommunities,
}