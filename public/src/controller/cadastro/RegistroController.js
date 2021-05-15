class RegistroController {

    constructor(formId, divCliente) {

        //this._firebase = new Firebase()
        this.formElement = document.getElementById(formId);
        this.perfilCliente = document.getElementById(divCliente);
        this.mandandoDados();
        this.formatDados();
    }
    formatDados() {
        this.cpf = document.querySelector(".cpf-mask")
        this.cpf.addEventListener('input', (e) => {
            var typing = e.target.value;

            var typinString = typing.toString()
            var stringSize = typinString.length
            if (typinString.includes('.')) {
                this.cpf.value = typing.replace('.', "")
            }
            if (stringSize > 11) {
                this.cpf.value = typinString.substring(0, 11)
            }
        })
    }


    mandandoDados() {
        this.formElement.addEventListener("submit", event => {
            event.preventDefault();
            let usuario = this.getNovoUsuario(this.formElement);
            this.insereUsuarioDb(usuario).then((msg) => {
                        console.log(msg)
                        if (msg === 'ok') {
                            window.location.href = '/login'
                        } else {
                            alert(`${msg}`)
                            window.location.href = '/cadastro'
                        }

                    }

                ).catch(err => {
                    console.log(err)
                })
                //
                //window.location.href ='/'
                //event.submit()
                //alert("Enviaremos um e-mail de confirmação.")
        });
    }

    getNovoUsuario(formElement) {
        let usuario = {};
        [...formElement.elements].forEach((field) => {
            if (!field.value) {
                usuario[field.name] = field.value
                    //return alert("complete o campo de " + field.name);
            } else {
                usuario[field.name] = field.value;
            }
        });
        return new Usuario(usuario);
    }

    insereUsuarioDb(usuario) {
        return new Promise((s, f) => {
            usuario.saveNew().then((user) => {
                //(console.log(user))
                s(user)
            }).catch(err => {
                alert(err)
                f(err)
            })
        })
    }
}