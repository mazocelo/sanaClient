var express = require('express');
var router = express.Router();

var assert = require('assert');
var restify = require('restify-clients');

var client = restify.createJsonClient({
  url: 'http://localhost:4000',
  version: '~1.0'
});


const db =  router.get('/', function(req, res, next) {
    client.get('/users', function(err, request, response, obj) {
      assert.ifError(err);
  
      return res.json(obj);
    });
  })
  
  //via get One 
router.get('/:id', function(req, res, next) {
    client.get(`/users/${req.params.id}`, function(err, request, response, obj) {
      assert.ifError(err);
  
      res.json(obj);
    });
  })

  
module.exports = db;

/*
.then(usuario=>{
    console.log(usuario)
    if(!usuario||password != usuario._password){
        return done(null, false, {
            mensagem: "Login e Senha incorretos"
        })
    }
    return done(null,usuario);
})
.catch(erro=>{
    done(erro,false)
});
*/