const express = require('express');
const router = express.Router();
const Users = require('../models/User.js');
const UTIL = require('../../util')

router.get('/list', (request, response, next) => 
{
    response.status(200);
    response.end( UTIL.jsonify( Users.getAll() ) ); 
})
router.get('/wipe', (request, response, next) => 
{
    Users.wipe(response)
})
router.post('/register', (request, response, next) => 
{
    const input = request.body;
    Users.insert(input, response)
})

router.post('/login', (request, response, next) => 
{
    const input = request.body;
    Users.login(input, response)
})
module.exports = router;