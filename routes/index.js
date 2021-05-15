var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Sana' });
});
router.get('/login', function(req, res, next) {
    //console.log(req.user)
    if (req.user) res.redirect('/usuarios')
    res.render('login', { title: 'Sana' });
});
router.get('/logout', function(req, res, next) {
    req.session.destroy(() => {
        req.logout();
        res.redirect("/"); //Inside a callback… bulletproof!
    });
});
router.get('/cadastro', function(req, res, next) {
    res.render('form', { title: 'Sana' });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/usuarios',
    failureRedirect: '/login'
}))


module.exports = router;