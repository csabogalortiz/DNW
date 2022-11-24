const setNavbar = require("../middleware/navbar")
module.exports = (app) => {

    app.use(setNavbar)

    const indexRoutes = require("./index.routes");
    app.use("/", indexRoutes);

    const placesRouter = require('./places.routes')
    app.use("/places", placesRouter)

    const mapsRouter = require('./map.routes')
    app.use("/explore", mapsRouter)

    const apiRouter = require("./api.routes")
    app.use("/api", apiRouter)

    const authRouter = require("./auth.routes");
    app.use("/auth", authRouter);

    const usersRouter = require("./users.routes")
    app.use("/user", usersRouter)

    const commentRouter = require("./comment.routes")
    app.use("/comment", commentRouter)

}