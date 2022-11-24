const express = require('express');
const router = express.Router();
const uploader = require('./../config/uploader.config')
const { findByIdAndUpdate, findByIdAndDelete } = require("../models/Place.model")
const { isLoggedIn } = require('./../middleware/route-guard');
const Place = require('../models/Place.model')

const User = require('../models/User.model')

// Place list - Toca hacerlo diferente por el tema de la api 

router.get('/list', (req, res, next) => {
    // res.send("Place List goes here")

    Place
        .find()
        // .select({ name: 1 })
        .then(places => {
            res.render("places/list", {
                places,
                isADMIN: req.session.currentUser.role === 'ADMIN'
            })
        })
        .catch(error => { next(error) })
})

router.get('/details/:id', (req, res, next) => {

    const { id: place_id } = req.params

    Place
        .findById(place_id)
        .then(place => {
            res.render('places/details', place)
        })
        .catch(error => { next(error) })
})


// Create Place - Form -  (render)  
router.get('/create', (req, res, next) => {
    res.render('places/create')
})

// Create Place - Form -  (hanlde)  
router.post('/create', uploader.single('imageField'), (req, res, next) => {

    const { name, type, latitude, longitude } = req.body
    const { path: placeImg } = req.file

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Place
        .create({ name, type, location, placeImg })
        .then((place) => {
            const user_id = req.session.currentUser._id
            console.log(user_id)
            console.log(place._id)

            User
                .findByIdAndUpdate(user_id, { "$push": { "createdPlaces": place._id } })
                .then(() => res.redirect('/explore/places'))


        })
        .catch(error => { next(error) })
})


// Edit Place - Form - (render)

router.get("/edit/:id", (req, res, next) => {
    // res.send("edit your place here")
    const { id: place_id } = req.params

    Place
        .findById(place_id)
        .then(place => {
            res.render('places/edit', place)
        })
        .catch(error => { next(error) })
})

// Edit Place - Form - (handle)

router.post("/edit/:id", uploader.single('imageField'), (req, res, next) => {

    const { id: place_id } = req.params
    const { name, type, description, placeImg } = req.body

    Place
        .findByIdAndUpdate(place_id, { name, type, description, placeImg })
        .then(() => {
            res.redirect('/places/list')
        })
        .catch(error => { next(error) })
})


// Place Details
router.get('/details/:id', (req, res, next) => {

    const { id: place_id } = req.params

    Place
        .findById(place_id)
        .populate({
            path: 'comment',
            model: "Comment",
            populate: {
                path: 'owner',
                model: "User"
            }
        })

        .then(place => {
            res.render('places/details', place)
        })
        .catch(err => console.log(err))
})

// Delete 
router.post('/delete/:id', (req, res, next) => {

    const { id: place_id } = req.params

    Place
        .findByIdAndDelete(place_id)
        .then(() => {
            res.redirect('/places/list')
        })
        .catch(error => { next(error) })
})

// Owned place list
router.get('/my-places', isLoggedIn, (req, res) => {

    const { _id: owner } = req.session.currentUser

    Place
        .find({ owner })
        // .select({ name: 1 })
        .then(places => {
            res.render('places/my-places', { places })
            console.log({ places })
        })
        .catch(error => { next(error) })
})



// Create Comments 

// router.get('/details/:id', (req, res, next) => {

//     const { id: place_id } = req.params

//     Place
//         .findById(place_id)
//         .populate('comment')
//         .then(place => {
//             res.render('places/details', place)
//         })
//         .catch(err => console.log(err))

// })


// 




module.exports = router