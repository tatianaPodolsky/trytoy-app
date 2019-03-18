const mongoService = require('./mongo-service-new');

const ObjectId = require('mongodb').ObjectId;

function query(filterBy) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('Toy');
            if(!filterBy) {
                return collection.find({}).toArray()
            }
            else {
                let searchMongo = {};
                if (filterBy.txt !== '') searchMongo.name = {'$regex' : filterBy.txt};
                if (filterBy.inStock !== 'null') searchMongo.inStock = (filterBy.inStock === 'true')? true : false;
                if (filterBy.type !== 'null') searchMongo.type = filterBy.type;
                if (filterBy.sort === 'null') {
                    console.log('search', searchMongo);
                    
                    return collection.find(searchMongo).toArray();}
                else {
                    let sortBy = (filterBy.sort === 'name')? {name: 1} : {price: 1};
                    console.log('Search', searchMongo, 'sortby', sortBy);
                    return collection.find(searchMongo).sort(sortBy).toArray()
                }
            }
        })
}
function getById(id) {
    const _id = new ObjectId(id)
    console.log('server service, id:', _id);
    return mongoService.connect()
        .then(db => db.collection('Toy').findOne({ _id }))
}
function add(toy) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('Toy');
            return collection.insertOne(toy)
                .then(result => {
                    toy._id = result.insertedId;
                    return toy;
                })
        })
}

function update(toy) {
    toy._id = new ObjectId(toy._id)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('Toy');
            return collection.updateOne({ _id: toy._id }, { $set: toy })
                .then(result => {
                    return toy;
                })
        })
}
function remove(toyId) {
    toyId = new ObjectId(toyId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('Toy');
            return collection.remove({ _id: toyId })
        })
}

module.exports = {
    query,
    getById,
    add,
    update,
    remove
}