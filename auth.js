const LocalStrategy = require('passport-local').Strategy

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        // console.log('aqui')
        const usuarioSessao = {
            name: user.name,
            email: user.email,
            id: user._id
        }


        done(null, usuarioSessao)
    })

    passport.deserializeUser((usuarioSessao, done) => {
        try {

            //console.log(usuarioSessao)
            //localizar id e devolver usuario
            done(null, usuarioSessao);
        } catch (err) {
            console.log(err)
            return done(err, null)
        }
    })
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {

        client.connect(err => {
            const collection = client.db("myInd").collection("users");
            //if (err) console.log(err)
            collection.findOne({ "username": username, "password": password }).then(user => {
                    if (err) {
                        console.log(err)
                        done(err, false)
                    }
                    if (!user) return (done(null, false))
                    if (user.password !== password) {
                        console.log('aqui')
                        return (done(null, false))
                    }

                    return (done(null, user))

                })
                //client.close();
        })
    }));



}