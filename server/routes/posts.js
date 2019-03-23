const express = require('express');
const router = express.Router();
const Posts = require('../models/Post.js');
const UTIL = require('../../util')

router.get('/list', (request, response, next) => 
{
    response.status(200);
    response.end( UTIL.jsonify( Posts.getAll() ) ); 
})

router.post('/add', (request, response, next) => 
{
    const input = request.body;
    Posts.insert(input, response)
})

module.exports = router;