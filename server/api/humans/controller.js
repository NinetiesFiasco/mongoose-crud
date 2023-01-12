const Humans = require('./model')
const randomWords = require('random-words')

const post = async (req, res) => {
  try {
    const human = await Humans.create({
      name: req.body.name,
      age: req.body.age
    })
    res.json(human)
  } catch (e) {
    res.error(e)
  }
}

const get = async (req, res) => {
  const humans = await Humans.find()
  res.json(humans)
}

const readPage = async (req, res) => {
  const limit = parseInt(req.params.limit)
  const skip = limit * parseInt(req.params.skip)
  const humans = await Humans.find().limit(limit).skip(skip)
  res.json(humans)
}

const put = async (req, res) => {
  const human = await Humans.findById(req.params.id)
  human.name = req.body.name
  human.age = req.body.age
  await human.save()
  res.json(human)
}

const _delete = async (req, res) => {
  await Humans.deleteOne({_id: req.params.id})
  res.send({ok: 'ok'})
}

const count = async (req, res) => {
  const count = await Humans.count()
  res.json(count)
}

const random = async (req, res) => {
  const count = parseInt(req.params.count)
  for (let i = 0; i < count; i++) {
    await Humans.create({
      name: randomWords(),
      age: Math.round(Math.random()*90 + 10)
    })
  }
  res.send('ok')
}

module.exports = {post, get, put, delete: _delete, count, random, readPage}