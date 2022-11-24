const router = require("express").Router()

const Place = require('../models/Place.model')

router.get('/places', (req, res, next) => {

    const { type } = req.query

    Place
        .find({ type })
        .then(places => {
            res.json(places)
        })

        .catch(error => { next(error) })
})


module.exports = router