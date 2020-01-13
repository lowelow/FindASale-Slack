const express = require('express');
const User    = require('../db').User;

const router = express.Router();
// INSERT NEW USER
router.post('/', async (req, res) => {
    await User.create(req.body).then(user => {
        res.status(200).send(user);
    })
    .catch(err => {
        res.status(400).send({ error : 'Bad Request'} );
    });
});

// GET ALL USERS
router.get('/', async (req, res) => {
    await User.findAll().then(users => {
        res.status(200).send(users);
    }).catch(err => {
        res.status(400).send({ error : 'Bad Request'} );
    });
});

// GET SPECIFIC USER BY ID
router.get('/:userID', async (req, res) => {
    await User.findAll({ 
        where: {
            id : req.params.userID 
        }
    }).then(users => {
        const status = users.length > 0 ? 200 : 404;
        res.status(status).send(users);
    }).catch(err => {
        res.status(400).send({ error : 'Bad Request'} );
    });
});

module.exports = router;