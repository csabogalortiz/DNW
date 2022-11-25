const express = require('express');
const router = express.Router();
const uploader = require('./../config/uploader.config')
const Place = require('../models/Place.model')
const { isLoggedIn } = require('./../middleware/route-guard');
const User = require('../models/User.model')
const Comment = require('../models/Comment.model')




// Como hago si la ruta que se va a renderizar es la del comment no la de place no es mejor crearla en la de places?


// Create Comment - Form -  (hanlde)

/*
router.post('/new-comment/:place_id', (req, res, next) => {
    const { description } = req.body
    const { _id: owner } = req.session.currentUser
    const { place_id } = req.params

    console.log({ owner, description })

    Comment
        .create({ owner, description })

        .then(comment => {
            console.log(comment)

            Place
                .findByIdAndUpdate(place_id, { "$push": { "comment": comment._id } })
                .then(() => res.redirect('/places/details'))
        })
        .catch((err) => {
            console.log(err);

        })

})
*/

router.post('/new-comment/:place_id', (req, res, next) => {
    const { description } = req.body
    const { _id: owner } = req.session.currentUser
    const { place_id } = req.params

    console.log({ owner, description })

    Comment
        .create({ owner, description })
        .then(comment => {
            console.log(comment)

            Place
                .findByIdAndUpdate(place_id, { "$push": { "comment": comment._id } })
                .then(() => res.redirect(`/places/details/${place_id}`))
        })
        .catch((err) => {
            console.log(err);

        })

})


module.exports = router;


