var express = require('express');
var router = express.Router();


const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
var mensagemBack;


router.put('/:id', function(req, res, next) {
    console.log(req.body)
    client.connect(err => {
            const collection = client.db("myInd").collection("users");
            collection.updateOne(req.user.id, req.body)
        })
        /*
        client.put(`/users/${req.params.id}`, req.body, function(err, request, response, obj) {
            // assert.ifError(err);

            res.json(obj);
        });
        */
})

router.delete('/:id', function(req, res, next) {
    client.del(`/users/${req.params.id}`, function(err, request, response, obj) {
        assert.ifError(err);

        res.json(obj);
    });
})


router.post('/', function(req, res, next) {
    //console.log(req.body)
    if (testReqBody(req.body)) {
        client.connect(err => {
            const collection = client.db("myInd").collection("users")
            collection.insertOne(req.body, function(err, resp) {
                if (err) {
                    console.log('erro', resp, err)
                    throw err
                }
                mensagemBack = 'ok'
                console.log("novo usuario inserido");
                res.send(mensagemBack)
            })

        })
    } else {

        mensagemBack = 'complete os campos que estão faltando'
        res.send(mensagemBack)

    }

})

module.exports = router;

function testReqBody(cliente) {
    isValid = true;
    Object.keys(cliente).forEach((campo, i) => {

        if (campo === '_cpf' && cliente._cpf.length != 11) {
            isValid = false
        }
        if (campo === '_password' || campo === '_name' || campo === '_login' || campo === '_telefone' || campo === '_email') {
            if (!cliente[campo]) {
                isValid = false
                    // console.log(campo, ':', cliente[campo])
            }

        }
    })
    return isValid
}