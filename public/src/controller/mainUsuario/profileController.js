class UserProfileController {
    constructor(usuario) {

        this.usuario = usuario;

        this.nomeEl = document.querySelector('#nome-do-terapeuta')

        this.initEvents()

    }
    initEvents() {
        //perfil
        console.log(this.usuario)
        this.nomeEl.innerHTML = this.usuario.nome
            //menu sanduiche
        this.changeList()
            //perfil options
        this.trocarDeFotoBtn()
        this.perfilBtns()
        this.fotoPerfilEl = document.querySelector(".user-img")


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
        var btnLogout = document.querySelector(".btn-logout")
        var logoutLink = document.querySelector("#logout-link")
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
        btnLogout.addEventListener('click', () => {
            this.allNone();
            logoutLink.click()
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
    trocarDeFotoBtn() {
        var btn = document.querySelector("#trocar-foto")
        var input = document.querySelector("#input-foto-perfil")
        var saveFotoBtn = document.querySelector("#save-foto-btn")

        btn.addEventListener("click", () => {
            input.click()
        })
        input.addEventListener("change", () => {
            var file = input.files[0]
            var reader = new FileReader();
            reader.onload = () => {
                this.fotoPerfilEl.src = reader.result;
            };
            reader.readAsDataURL(file)
            saveFotoBtn.classList.remove('none')
        })

        saveFotoBtn.addEventListener('click', (e) => {
            /**
             * this.usuario.changePicture(file)
             */
            saveFotoBtn.classList.add('none')
        })
    }



}