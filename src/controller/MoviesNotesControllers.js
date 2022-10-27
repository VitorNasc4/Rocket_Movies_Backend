const knex = require('../database/knex')

class MoviesNotesControllers {
  async create(req, res) {
    const { title, description, rating, tags } = req.body
    const user_id = req.user.id

    const note_id = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    })

    const movie_tagsInsert = tags.map(tag => {
      return {
        note_id,
        user_id,
        name: tag
      }
    })
  

    await knex("movie_tags").insert(movie_tagsInsert)

    return res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const movie_note = await knex("movie_notes").where({ id }).first()

    const movie_tags = await knex("movie_tags").where({ note_id: id }).orderBy("name")

    return res.json({
      ...movie_note,
      movie_tags,
    })
  }

  async delete(req, res) {
    const { id } = req.params

    await knex("movie_notes").where({ id }).delete()

    return res.json()
  }

  async index(req, res) {
    const { title, tags } = req.query
    const user_id = req.user.id

    let movie_notes

    if (tags) {
      const filterTags = tags.split(",").map(tag => tag)

      movie_notes = await knex("movie_tags").select([
        "movie_notes.id",
        "movie_notes.title",
        "movie_notes.user_id",
      ]).where("movie_notes.user_id", user_id)
        .whereLike("title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
        .orderBy("movie_notes.title")
    } else {
      movie_notes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const userTags = await knex("movie_tags").where({user_id})

    const movie_notesWithTag = movie_notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })

    return res.json(movie_notesWithTag)
  }
}

module.exports = MoviesNotesControllers