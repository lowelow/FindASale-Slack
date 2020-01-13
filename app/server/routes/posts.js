const express = require('express');
const Post    = require('../db').Post;

const router = express.Router();
// INSERT NEW POST
router.post('/', async (req, res) => {
    await Post.create(req.body).then(post => {
        res.status(200).send(post);
    })
    .catch(err => {
        res.status(400).send({ error : err } );
    });
});

// GET ALL POSTS
router.get('/', async (req, res) => {
    await Post.findAll().then(posts => {
        res.status(200).send(posts);
    }).catch(err => {
        res.status(400).send({ error : 'Bad Request'} );
    });
});

// GET SPECIFIC POST BY ID
router.get('/:postID', async (req, res) => {
    await Post.findAll({ 
        where: {
            id : req.params.postID 
        }
    }).then(posts => {
        const status = posts.length > 0 ? 200 : 404;
        res.status(status).send(posts);
    }).catch(err => {
        res.status(400).send({ error : 'Bad Request'} );
    });
});

module.exports = router;