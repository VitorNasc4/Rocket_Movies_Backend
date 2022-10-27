const knex = require('../database/knex')

class MoviesTagsControllers {
  async index(req, res) {
    const user_id = req.user.id

    const tags = await knex("movie_tags").where({user_id})

    return res.json(tags)
  }
}

module.exports = MoviesTagsControllers