const {Router} = require("express")
const usersRouter = Router()

const UsersControllers = require("../controller/UsersControllers")
const usersControllers = new UsersControllers()

const UserAvatarConrollers = require("../controller/UserAvatarControllers")
const userAvatarConrollers = new UserAvatarConrollers()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const multer = require("multer")
const uploadConfig = require("../configs/upload")
const upload = multer(uploadConfig.MULTER)

usersRouter.post("/", usersControllers.create)
usersRouter.put("/", ensureAuthenticated, usersControllers.update)
usersRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarConrollers.update)

module.exports = usersRouter