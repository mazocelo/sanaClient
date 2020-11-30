var express = require('express');
var router = express.Router();

var restify = require('restify-clients');


const uuid = require('uuid')
const sessao = require('express-session')
const passport = require ('passport')
const LocalStrategy = require('passport-local').Strategy



var client = restify.createJsonClient({
  url: 'http://localhost:4000',
  version: '~1.0'
});


passport.use(new LocalStrategy(
  function(username, password, done) {
      client.post(`/login`, ({username, password}) , function(err, req, res, obj) {
        
        if (err) { 
          console.log(err)
          return done(err);
        }
        
        if (obj.erro) {
          console.log('tratamento sem username / senha')
          return done(null, false, obj);
        }
        else{
          return done(null, obj);
        }
      
      });
    }
));


/**
 * 
 *  if (obj.erro == 'password') {
          console.log('tratamento sem password')
        return done(null, false,obj);
        }
 */

passport.serializeUser((usuario,done)=>{
  const usuarioSessao = {
      nome: usuario._name,
      email: usuario._email,
  }
  done(null,usuarioSessao)
})

passport.deserializeUser((usuarioSessao, done)=>{
  done(null, usuarioSessao)
})

router.use(sessao({
  secret: 'sana auth',
  genid:  function(req){
      return uuid()
  },
  resave: false,
  saveUninitialized: false

}))

router.use(passport.initialize());
router.use(passport.session());

router.use(function(req,res,next){
  req.passport = passport;  
  next();
})


  router.post('/', 
    function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) { 
              return next(err); 
          }
          if (!user) { 
            console.log(info)
            res.redirect('/');
            return res.end()
          }
          req.logIn(user, function(err) {
            if (err) {
              console.log(err)
              return next(err);
              }
           
            console.log(req.user)
            return res.render('./templates/mainTerapeuta', user)
          
          });
      })(req, res, next);
  
  })


  router.post('/log',
    function(req,res, next){
      res.json(req.user).send();
    }
  )

module.exports = router;