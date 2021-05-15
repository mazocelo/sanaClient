class Usuario {

    constructor({ nome, sobrenome, login, dnasc, telefone, email, cpf, ps, senha }) {

        this._id;
        this._login = login;
        this._name = nome;
        this._login = login;
        this._sobrenome = sobrenome;
        this._dnasc = dnasc;
        this._telefone = telefone;
        this._email = email;
        this._cpf = cpf;
        this._ps = ps;
        this._password = senha;

    }
    get id() {
        return this._id;
    }
    get register() {
        return this._register;
    }

    get login() {
        return this._login;
    }

    get name() {
        return this._name;
    }

    get sobrenome() {
        return this._sobrenome;
    }

    get telefone() {
        return this._telefone;
    }


    get cpf() {
        return this._cpf;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    get ps() {
        return this._ps = ps;
    }

    set photo(value) {
        this._photo = value;
    }

    saveNew() {
        // para post
        return new Promise((resolve, reject) => {

            let promise = HttpRequest.post('/users', this)

            promise.then(confirmation => {
                //console.log(confirmation)
                resolve(confirmation);
            }).catch(e => {

                reject(e);
            })
        })
    }
    changePicture(foto) {
        HttpRequest.put(`/users/${this.id}`, this)
    }


}