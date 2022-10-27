const {Router} = require("express")
const moviesNotesRouter = Router()

const MoviesNotesControllers = require("../controller/MoviesNotesControllers")
const moviesNotesControllers = new MoviesNotesControllers()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

moviesNotesRouter.use(ensureAuthenticated)

moviesNotesRouter.post("/", moviesNotesControllers.create)
moviesNotesRouter.get("/:id", moviesNotesControllers.show)
moviesNotesRouter.delete("/:id", moviesNotesControllers.delete)
moviesNotesRouter.get("/", moviesNotesControllers.index)

module.exports = moviesNotesRouter