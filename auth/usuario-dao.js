class UsuarioDao {

    constructor() {
        this._db = this.getDB();
    }

    getDB(){
        router.get('/', function(req, res, next) {
            client.get('/users', function(err, request, response, obj) {
              assert.ifError(err);
          
              return obj
            });
          })
    }
    buscaPorEmail(email) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM usuarios
                    WHERE email = ?
                `,
                [email],
                (erro, usuario) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o usuário!');
                    }

                    return resolve(usuario);
                }
            )
        });
    }
}

module.exports = UsuarioDao;





/*class UsuarioDao {

    constructor(db) {
        this._db = db;
    }

    buscaPorEmail(email) {
        return new Promise((resolve, reject) => {

            router.get('/:id', function(req, res, next) {
                client.get(`/users/${req.params.id}`, function(err, request, response, obj) {
                  assert.ifError(err);
                
                  if(obj){
                    resolve(obj)
                  } 
                  else{
                      reject(err)
                  }
                });
              })
            
        });
    }
}

module.exports = UsuarioDao; */