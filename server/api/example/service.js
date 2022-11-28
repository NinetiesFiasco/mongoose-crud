const ObjectId = require('mongodb').ObjectId
const randomWords = require('random-words')
const {collections} = require('../../mongodb')

const create = (data, callback) => {
  data._id = new ObjectId()
  collections.example.insertOne(data, callback)
}

const readAll = (callback) => {
  collections.example.find().toArray(callback)
}

const readPage = (skip, limit, callback) => {
  collections.example.find().skip(skip).limit(limit).toArray(callback);
}

const update = (id, data, callback) => {
  if (data._id)
    delete data._id
  collections.example.updateOne({"_id": new ObjectId(id)}, {$set: data}, callback)
}

const _delete = (id, callback) => {
  collections.example.deleteOne({"_id": new ObjectId(id)}, callback)
}

const count = (callback) => {
  collections.example.count(null, callback)
}

const random = (count, callback) => {
  for (let i = 0; i < count; i++) {
    create({stringValue: randomWords()}, callback)
  }
}

module.exports = {create, readAll, update, delete:_delete, count, random, readPage}