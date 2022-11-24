const express = require('express');
const router = express.Router();
const Place = require('./../models/Place.model');
const User = require('../models/User.model')
//  Map
router.get('/places', (req, res, next) => {
    const currentUserId = req.session.currentUser._id
    User.findById(currentUserId).then(userData => {
        const favs = userData.favPlaces
        Place
            .find()
            .then(places => {
                const formattedPlaces = places.map(elm => {
                    console.log(elm._id)
                    return { ...elm._doc, isFav: favs.includes(elm._id.toString()) }
                })
                res.render('explore/map', { user: req.session.currentUser._id, places: formattedPlaces })
            })
            .catch(error => { next(error) })
    })
})
module.exports = router