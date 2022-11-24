const express = require('express');
const router = express.Router();
const uploader = require('../config/uploader.config')
const User = require("../models/User.model")
const saltRounds = 10
const bcryptjs = require('bcryptjs')
const { isLoggedOut } = require('./../middleware/route-guard');

// Signup

router.get("/sign-up", isLoggedOut, (req, res, next) => {
    // res.send("Sign up here")
    res.render('auth/sign-up')

})

router.post("/sign-up", isLoggedOut, uploader.single("imageField"), (req, res, next) => {
    const { password, name, username, email, profileImg, bio, links, savedPlaces } = req.body

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => User.create({ name, username, email, bio, links, savedPlaces, profileImg: req.file.path, password: hashedPassword }))
        .then(() => res.redirect('/'))
        .catch(error => { next(error) })

})

// Login 

router.get("/log-in", isLoggedOut, (req, res, next) => {
    // res.send("Log in here")
    res.render('auth/log-in')

})

router.post("/log-in", isLoggedOut, (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            console.log({ user })
            if (!user) {
                res.render('auth/log-in', { errorMessage: 'Email not found' })
                return
            } else if (bcryptjs.compareSync(password, user.password) === false) {
                res.render('auth/log-in', { errorMessage: 'Wrong Password' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/home')
            }
        })
        .catch(error => { next(error) })
})

// Logout
router.get('/log-out', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router;
