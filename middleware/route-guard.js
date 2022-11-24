
// Review Login Status

function isLoggedIn(req, res, next) {
    if (req.session.currentUser) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Log in to continue' })
    }
}

// Si estas logged in haz lo siguiente sino, te redirijo a la pagina de auth log in pero eso lo podemos arreglar 

function isLoggedOut(req, res, next) {
    if (!req.session.currentUser) {
        next()
    } else {
        res.redirect('/home')
    }
}
// Esta solo se usa cuando el usuario ya esta logged in y le da dos veces al register por ejemplo 


const checkRoles = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No access granted. You dont have  ${roleToCheck} permits' })
    }
}

module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRoles
}