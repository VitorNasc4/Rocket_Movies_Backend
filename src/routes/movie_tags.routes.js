const {Router} = require("express")
const movie_tagsRouter = Router()

const MoviesTagsControllers = require("../controller/MoviesTagsControllers")
const moviesTagsControllers = new MoviesTagsControllers()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

movie_tagsRouter.get("/", ensureAuthenticated, moviesTagsControllers.index)

module.exports = movie_tagsRouter