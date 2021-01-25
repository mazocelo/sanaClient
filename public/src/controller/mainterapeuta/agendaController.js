var hoje = new Date();
var data = hoje.getDate();
var diaDaSemana = hoje.getDay();
var mes = hoje.getMonth();
var ano = hoje.getFullYear();

class AgendaController {


    constructor(usuario) {
        this.user = usuario;
        this.semanasEl = document.querySelectorAll("#dias-do-mes>tr");

        this.today = hoje
        this.data = data;
        this.diaDaSemana = diaDaSemana;
        this.mes = mes;
        this.ano = ano

        this.objMes = {}

        this.initiateMonth();
    }

    initiateMonth() {
        this.diasDoMes = new Array(this.quantosDias(this.mes));
        //funções pra preencher o objMes{}
        this.contarPraFrente()
        this.contarParaTrás();
        console.log(this.objMes)
            //desenhando
        this.insertNumberDays();

    }


    //funções pra preencher o objMes{}
    contarPraFrente() {

        var passagemDosDias = this.data
        var numDodia = this.diaDaSemana
        var i = 0
        for (var x of this.diasDoMes) {

            if (passagemDosDias - 1 == i) {
                var num = this.nomeDoDia(numDodia)
                var agora = { 'Dia do mês': passagemDosDias, 'Dia da semana': num, 'numero': numDodia }
                this.objMes[i] = agora
                passagemDosDias = passagemDosDias + 1

                if (numDodia >= 6) {
                    numDodia = 0;
                } else {
                    numDodia++
                }
            }
            i++
        }
    }
    contarParaTrás() {
        var numDodia = this.diaDaSemana
        for (var i = this.data - 1; i >= 0; i--) {
            var num = this.nomeDoDia(numDodia)
            var agora = { 'Dia do mês': i + 1, 'Dia da semana': num, 'numero': numDodia }
            this.objMes[i] = agora
            if (numDodia < 1) {
                numDodia = 6
            } else {
                numDodia--
            }

        }
    }
    quantosDias(mes) {
        var meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        var dias
        meses.forEach((m, i) => {
            if (mes = i) {
                dias = m
            }
        })
        return dias;
    }
    nomeDoDia(dia) {
        var nomesDosDias = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado']
        var nomeDoDia
        nomesDosDias.forEach((d, i) => {
            if (dia == i) {
                nomeDoDia = d;
            }
        })
        return nomeDoDia
    }
    insertNumberDays() {
        var contagem = 0
        var inicia = false
        this.semanasEl.forEach((semana, i) => {
            var dias = [...semana.children]
            dias.forEach((td, i) => {
                if (semana.id === "semana-um") {
                    if (i == this.objMes[0].numero - 1 || inicia == true) {
                        var diaAtualEl = semana.children[i]
                        var diaFormated = this.formatData(contagem)
                        diaAtualEl.innerHTML = diaFormated // CRIAR FORMATAÇÃO
                        contagem++
                        inicia = true
                    }
                } else {
                    var diaAtualEl = semana.children[i]
                    var diaFormated = this.formatData(contagem)
                    diaAtualEl.innerHTML = diaFormated // CRIAR FORMATAÇÃO
                    contagem++
                }
            })
        })
    }
    formatData(dia) {
        return JSON.stringify(this.objMes[dia])
    }
}