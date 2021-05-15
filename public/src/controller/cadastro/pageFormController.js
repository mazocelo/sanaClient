var p1 = document.getElementById("cadastro1");
var p2 = document.getElementById("cadastro2");
var pf = document.getElementById("cadastrofinal");

var pagCadastro = document.getElementById("pagina-cadastro");
var pagLogin = document.getElementById("pagina-login");
var pagInicial = document.getElementById("pagina-inicial");
var criarConta = document.getElementById("criar-conta");

var cpfValue = document.querySelector(".cpf-mask")


function pagina2() {
    p1.style.display = "none";
    p2.style.display = "block";
    pf.style.display = "none";
}

function paginafinal() {
    p1.style.display = "none";
    p2.style.display = "none";
    pf.style.display = "block";
}

function pagina1() {
    p1.style.display = "block";
    p2.style.display = "none";
    pf.style.display = "none";

}