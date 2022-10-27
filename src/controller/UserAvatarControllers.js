const knex = require('../database/knex')
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarConrollers {
  async update(req, res) {
    const user_id = req.user.id
    const avatarFilename = req.file.filename
  
    const user = await knex("users").where({id: user_id}).first()

    const diskStorage = new DiskStorage()

    if (!user) {
      throw new AppError(" usuários autenticado podem mudar o avatar", 401)
    }

    if (user.avatar) {
      await diskStorage.delete(user.avatar)
    }

    const filename = await diskStorage.save(avatarFilename)
    user.avatar = filename

    await knex("users").update(user).where({id: user_id})

    res.json(user)
  }
}

module.exports = UserAvatarConrollers