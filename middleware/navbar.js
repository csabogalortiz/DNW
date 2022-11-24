const hideNavbar = (req, res, next) => {

    if (req.session.currentUser) {
        req.app.locals.userName = req.session.currentUser.username
        req.app.locals.id = req.session.currentUser._id
    } else {
        req.app.locals.userName = null
        req.app.locals.id = null
    }
    next()

}

module.exports = hideNavbar