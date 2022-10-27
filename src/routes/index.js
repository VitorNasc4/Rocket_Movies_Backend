const {Router} = require("express")

const routes = Router()

const usersRouter = require("./users.routes")
const moviesNotesRouter = require("./movie_notes.routes")
const movie_tagsRouter = require("./movie_tags.routes")
const sessionsRouter = require("./sessions.routes")

routes.use(("/users"), usersRouter)
routes.use(("/movies_notes"), moviesNotesRouter)
routes.use(("/movies_tags"), movie_tagsRouter)
routes.use(("/sessions"), sessionsRouter)

module.exports = routes