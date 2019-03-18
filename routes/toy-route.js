const toyService = require('../services/toy-service')

const BASE_URL = '/api/toy'
function addToyRoutes(app) {
    // REST API:

    // LIST
    app.get(BASE_URL, (req, res) => {
        console.log('Getting the list(server)');
        var filterBy = req.query;
        if (JSON.stringify(filterBy) === '{}') filterBy = null;
        toyService.query(filterBy)
            .then(toys => {
                // console.log(toys);
                res.json(toys)})
    })
    // SINGLE - GET Full details
    app.get(`${BASE_URL}/:toyId`, (req, res) => {
        const toyId = req.params.toyId;
            toyService.getById(toyId)
                .then(toy => res.json(toy))
    })
    // // SINGLE - GET Full details including reviews
    // app.get('/toy/:toyId', (req, res) => {
    //     const toyId = req.params.toyId;
    //     Promise.all([
    //         toyService.getById(toyId),
    //         reviewService.query({toyId})
    //     ])
    //     .then(([toy,reviews]) => {
    //         res.json( {
    //             toy,reviews
    //         })
    //     })
    // })

    // // DELETE
    app.delete(`${BASE_URL}/:toyId`, (req, res) => {
        const toyId = req.params.toyId;
        toyService.remove(toyId)
            .then(() => res.end(`Toy ${toyId} Deleted `))
    })

    // CREATE
    app.post(BASE_URL, (req, res) => {
        const toy = req.body;
        toyService.add(toy)
            .then(toy => {
                res.json(toy)
            })
    })

    // UPDATE
    app.put(`${BASE_URL}/:toyId`, (req, res) => {
        const toy = req.body;
        toyService.update(toy)
            .then(toy => res.json(toy))
    })

}


module.exports = addToyRoutes;