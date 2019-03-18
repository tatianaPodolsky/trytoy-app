var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;
    
    // const url = (!process.env.PORT)? 
    //                 'mongodb://localhost:27017' : 'mlab url'
    const url = 'mongodb+srv://Tati:5582@cluster0-sbg5z.mongodb.net/test?retryWrites=true';
    // mongodb+srv://Tati:<password>@cluster0-sbg5z.mongodb.net/test?retryWrites=true
    const dbName = 'toy_db';  
    
    const client = new MongoClient(url, { useNewUrlParser: true });

    return client.connect()
        .then(client => {
            console.log('Connected to MongoDB');
            // If we get disconnected (e.g. db is down)
            client.on('close', ()=>{
                console.log('MongoDB Diconnected!');
                dbConn = null;
            })
            dbConn = client.db(dbName)
            return dbConn;
        })
}

module.exports = {
    connect : connectToMongo
}