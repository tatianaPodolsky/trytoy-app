const mongoService = require('./mongo-service-new');

const ObjectId = require('mongodb').ObjectId;

function query() {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('User');
            return collection.find({}).toArray()
            })
}
function getById(id) {
    const _id = new ObjectId(id)
    console.log('user server service, id:', _id);
    return mongoService.connect()
        .then(db => db.collection('User').findOne({ _id }))
}
function getByName(username) {
    const nickname = new ObjectId(username)
    console.log('user server service, name:', nickname);
    return mongoService.connect()
        .then(db => db.collection('User').findOne({ nickname }))
}
function add(user) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('User');
            return collection.insertOne(user)
                .then(result => {
                    user._id = result.insertedId;
                    return user;
                })
        })
}

function update(user) {
    user._id = new ObjectId(user._id)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('User');
            return collection.updateOne({ _id: user._id }, { $set: user })
                .then(result => {
                    return user;
                })
        })
}
function remove(userId) {
    userId = new ObjectId(userId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('User');
            return collection.remove({ _id: userId })
        })
}

module.exports = {
    query,
    getById,
    getByName,
    add,
    update,
    remove
}