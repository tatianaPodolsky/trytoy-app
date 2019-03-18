const userService = require('../services/user-service')

//TODO - to make a BASE_URL

function addUserRoutes(app) {
    // REST API:

    // LIST
    app.get('/api/user', (req, res) => {
        console.log('Getting the users list(server)');
        userService.query()
            .then(users => res.json(users))
    })
    // SINGLE - GET Full details
    app.get('/api/user/:userId', (req, res) => {
        const userId = req.params.userId;
            userService.getById(userId)
                .then(user => res.json(user))
    })
    //SINGLE - LOGIN
    app.post('api/user/login',(req, res) => {
        var username = req.query;
        userService.getByName(username)
            .then(user => {
                console.log('BACKEND service, user:', user);
                req.session.loggedInUser = user;
                res.json(user)
            })
            .catch(err => {
                console.log('BACKEND service ERROR', err);
                res.status(500).send('Wrong Credentials')
            })
            
    })

    // // DELETE
    app.delete('api/user/:userId', (req, res) => {
        const userId = req.params.userId;
        userService.remove(userId)
            .then(() => res.end(`User ${userId} Deleted `))
    })

    // CREATE
    app.post('api/user', (req, res) => {
        const user = req.body;
        userService.add(user)
            .then(user => {
                res.json(user)
            })
    })
    // UPDATE
    app.put('api/user/:userId', (req, res) => {
        const user = req.body;
        userService.update(user)
            .then(user => res.json(user))
    })

}


module.exports = addUserRoutes;