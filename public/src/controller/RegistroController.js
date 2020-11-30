
class RegistroController {

    constructor(formId,divCliente){

        //this._firebase = new Firebase()
        this.formElement = document.getElementById(formId);
        this.perfilCliente = document.getElementById(divCliente);
        this.mandandoDados();
    }


    mandandoDados(){
        this.formElement.addEventListener("submit", event => {
            event.preventDefault();
            let terapeuta = this.getNovoTerapeuta(this.formElement);
            this.insereTerapeutaDb(terapeuta);
//            alert("Enviaremos um e-mail de confirmação.")
        });
    }

    getNovoTerapeuta(formElement){  
        let terapeuta = {};
        [...formElement.elements].forEach((field)=>{
            terapeuta[field.name] = field.value;
        });
        return new Terapeuta (
            terapeuta.nome,
            terapeuta.sobrenome,
            terapeuta.login,
            terapeuta.dnasc,
            terapeuta.tel1,
            terapeuta.tel2,
            terapeuta.email,
            terapeuta.cpf,
            terapeuta.ps,
            terapeuta.senha
            );
        }
    
    insereTerapeutaDb (terapeuta){
       return new Promise((s,f)=>{
        terapeuta.save().then(()=>{
            document.location.href ="/"
            s()
        }).catch(err=>{
            alert(err)
            f(err)
        })
       })
           
       
    }
    

}



