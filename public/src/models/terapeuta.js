class Terapeuta {

    constructor(nome, sobrenome, login, dnasc, tel1, tel2, email, cpf, ps, senha){
        
        this._id;
        this._login = login;
        this._name = nome;
        this._login = login;
        this._sobrenome = sobrenome;
        this._dnasc = dnasc;
        this._tel1 = tel1;
        this._tel2 = tel2;
        this._email = email;
        this._cpf = cpf;
        this._ps = ps;
        this._password = senha;

    }
    get id(){
        return this._id;
    }
    get register(){
        return this._register;
    }

    get login(){
        return  this._login;
    }

    get name(){
        return this._name;
    }

    get sobrenome(){
        return this._sobrenome;
    }
    
    get tel1(){
        return this._tel1;
    }

    get tel2(){
        return this._tel2;
    }

    get cpf(){
        return this._cpf;
    }

    get email(){
        return this._email;
    }

    get password(){
        return this._password;
    }

    get photo(){
        return this._photo;
    }

    get ps(){
        return this._ps = ps;
    }

    set photo(value){
        this._photo = value;
    }

    save(){
        // para put e post
        return new Promise((resolve, reject)=>{
            
            let promise;
        
            if( this.id){
                promise = HttpRequest.put(`/users/${this.id}`, this)
            }
            else{
                promise = HttpRequest.post('/users', this)
    
            }
    
            promise.then(data =>{
                resolve(this);
            }).catch(e =>{

                reject(e);
            })
        })

        
    }
}
