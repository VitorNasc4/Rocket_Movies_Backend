const {Router} = require("express")
const sessionsRouter = Router()

const SessionsControllers = require("../controller/SessionsControllers")
const sessionsControllers = new SessionsControllers()

sessionsRouter.post("/", sessionsControllers.create)

module.exports = sessionsRouter