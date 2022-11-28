const service = require('./service')
// {create, readAll, update, _delete} 

const callback = (res) => {
  return (error, result) => {
    return error
      ? res.status(500).send(error)
      : res.json(result)
  }
}

const post = (req, res) => {
  service.create(req.body, callback(res))
}

const get = (req, res) => {
  service.readAll(callback(res))
}

const readPage = (req, res) => {
  const limit = parseInt(req.params.limit)
  const skip = limit * parseInt(req.params.skip)
  service.readPage(skip, limit, callback(res))
}

const put = (req, res) => {
  service.update(req.params.id, req.body, callback(res))
}

const _delete = (req, res) => {
  service.delete(req.params.id, callback(res))
}

const count = (req, res) => {
  service.count(callback(res))
}

const random = (req, res) => {
  const count = parseInt(req.params.count)
  service.random(count, callback(res))
}

module.exports = {post, get, put, delete: _delete, count, random, readPage}