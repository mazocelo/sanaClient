class TherapistProfileController {
    constructor(usuario) {

        this.usuario = usuario;

        this.nomeEl = document.querySelector('#nome-do-terapeuta')

        this.initEvents()

    }
    initEvents() {
        //perfil
        this.nomeEl.innerHTML = this.usuario.nome
            //perfil options
        this.trocarDeFotoBtn()
        this.changeList()
        this.perfilBtns()

    }

    trocarDeFotoBtn() {
        let btn = document.querySelector("#trocar-foto")
        let input = document.querySelector("#input-foto-perfil")
        btn.addEventListener("click", () => {
            input.click()
        })
        input.addEventListener("change", () => {
            let file = input.files[0]
            var reader = new FileReader();
            reader.onload = () => {
                reader.result;
            };
            reader.readAsDataURL(file)
            console.log("enviar correto a foto para o ID")
        })
    }

    changeList() {
        var configBtn = document.querySelector('#config-btn')
        var configList = document.querySelector('#config-lista')
        configBtn.addEventListener('click', (e) => {
            configBtn.classList.toggle("change");
            configList.classList.toggle("list")
        })
        var agenda = document.querySelector("#agenda")
        var instruções = document.querySelector("#instruções")
        var mensagens = document.querySelector("#mensagens")
        var perfil = document.querySelector("#perfil")
        var suporte = document.querySelector("#suporte")

        var btnAgenda = document.querySelector(".btn-agenda")
        var btnInstruções = document.querySelector(".btn-instruções")
        var btnMensagens = document.querySelector(".btn-mensagens")
        var btnPerfil = document.querySelector(".btn-perfil")
        var btnSuporte = document.querySelector(".btn-suporte")


        btnAgenda.addEventListener("click", () => {
            this.allNone();
            this.oneBlock(agenda)
        })

        btnInstruções.addEventListener("click", () => {
            this.allNone();
            this.oneBlock(instruções)
        })

        btnMensagens.addEventListener("click", () => {
            this.allNone();
            this.oneBlock(mensagens)
        })

        btnPerfil.addEventListener("click", () => {
            this.allNone();
            this.oneBlock(perfil)
        })

        btnSuporte.addEventListener('click', () => {
            this.allNone();
            this.oneBlock(suporte)
        })
    }
    allNone() {
        var mainShow = document.querySelector(".show-panel").childNodes
        mainShow.forEach(el => {
            if (el.nodeName == "DIV") {
                el.classList.add("none")
                el.classList.remove("div-terapeuta")

            }
        })
    }
    oneBlock(div) {
        div.classList.remove("none")
        div.classList.add("div-terapeuta")
    }
    perfilBtns() {
        var salvarBtnDescri = document.querySelector("#salvar-descrição")
        var editarDescri = document.querySelector('#editar-descrição')
        var areaDeEdiçao = document.querySelector("#text-de-edição")

        editarDescri.addEventListener('click', () => {
            areaDeEdiçao.classList.remove("none")
            salvarBtnDescri.classList.remove("none")
            editarDescri.classList.add("none")

        })

        salvarBtnDescri.addEventListener("click", () => {
            areaDeEdiçao.classList.add("none")
            salvarBtnDescri.classList.add("none")
            editarDescri.classList.remove("none")
                // ENVIAR NOVOS DADOS

        })

        var editarNome = document.querySelector("#editar-nome")
        var salvarNome = document.querySelector("#salvar-nome")
        var areaNome = document.querySelector("#area-nome")
        editarNome.addEventListener("click", () => {
            editarNome.classList.add("none")
            salvarNome.classList.remove("none")
            areaNome.classList.remove("none")

        })

        salvarNome.addEventListener("click", () => {
            editarNome.classList.remove("none")
            salvarNome.classList.add("none")
            areaNome.classList.add("none")
                // ENVIAR NOVOS DADOS
        })
    }
}