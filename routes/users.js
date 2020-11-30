var express = require('express');
var router = express.Router();

var assert = require('assert');
var restify = require('restify-clients');

var client = restify.createJsonClient({
  url: 'http://localhost:4000',
  version: '~1.0'
});




// GET users listing. 
/*
router.get('/', function(req, res, next) {
  client.get('/users', function(err, request, response, obj) {
    assert.ifError(err);

    res.json(obj);
  });




    client.post('/login', function(err, request, response, obj) {
    assert.ifError(err);

  });
})*/




router.put('/:id', function(req, res, next) {
  client.put(`/users/${req.params.id}`, req.body, function(err, request, response, obj) {
    assert.ifError(err);

    res.json(obj);
  });
})

router.delete('/:id', function(req, res, next) {
  client.del(`/users/${req.params.id}`, function(err, request, response, obj) {
    assert.ifError(err);

    res.json(obj);
  });
})


router.post('/', function(req, res, next) {
  client.post(`/users/`,req.body , function(err, request, response, obj) {
    assert.ifError(err);

    res.json(obj);
  });
})

module.exports = router;
