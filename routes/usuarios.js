const express = require('express');
var router = express.Router();

router.post('/log', function(req, res, next) {
    console.log(req.user)
    res.send(req.user);
    res.end()
})
router.get('/', function(req, res, next) {
    //console.log('aqui')
    res.render('mainUsuario', { title: 'Express' });
});


module.exports = router