class AgendaController {


    constructor(usuario, hoje = new Date(), data = hoje.getDate(), diaDaSemana = hoje.getDay(), mes = hoje.getMonth(), ano = hoje.getFullYear()) {
        this.user = usuario;
        this.semanasEl = document.querySelectorAll("#dias-do-mes>tr");

        this.anoEl = document.querySelector('#titulo-do-ano')
        this.mesEl = document.querySelector('#titulo-do-mes')
        this.today = hoje
        this.data = data;
        this.diaDaSemana = diaDaSemana;
        this.mes = mes;
        this.ano = ano
        this.nextMonthBtnEl = document.querySelector("#next-month")
        this.previousMonthBtnEl = document.querySelector("#prev-month")
        this.btnVoltaPraEsseMes = document.querySelector("#today-month")
        this.objMes = {}



        this.initiateMonth();
    }
    initiateMonth() {
        this.setAno(this.ano)
        this.setMes(this.mes)
        this.diasDoMes = new Array(this.quantosDias(this.mes));
        //funções pra preencher o objMes{}
        this.renderPraFrente(this.diaDaSemana, this.data, this.diasDoMes)
        this.renderParaTras(this.diaDaSemana, this.data);
        //console.log(this.objMes)
        //inserindo no HTML
        this.insertNumberDays();

        //muda de mes
        this.nextMonthBtnInit()
        this.prevMonthBtnInit()
        this.mesDeHojeBtnInit()
        console.log()
    }
    quantosDias(mes) {

        var meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if (!this.bisesto) meses[1] = 29
        var dias
        meses.forEach((m, i) => {
            if (mes == i) {
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
        //funções pra preencher o objMes{}
    renderPraFrente(numDodia, diaDeHoje, diasDoMes) {
        var i = 0
        for (var x of diasDoMes) {
            if (diaDeHoje - 1 == i) {
                var num = this.nomeDoDia(numDodia)
                var agora = { diaM: diaDeHoje, diaS: num, numero: numDodia }
                this.objMes[i] = agora
                diaDeHoje = diaDeHoje + 1
                if (numDodia >= 6) {
                    numDodia = 0;
                } else {
                    numDodia++
                }
            }
            i++
        }
    }
    renderParaTras(numDodia, diaDeHoje) {
        for (var i = diaDeHoje - 1; i >= 0; i--) {
            var num = this.nomeDoDia(numDodia)
            var agora = { diaM: i + 1, diaS: num, numero: numDodia }
            this.objMes[i] = agora
            if (numDodia < 1) {
                numDodia = 6
            } else {
                numDodia--
            }
        }
    }
    insertNumberDays() {
        var contagem = 0
        var inicia = false
        this.semanasEl.forEach((semana, i) => {
            var dias = [...semana.children]
            dias.forEach((td, i) => {
                if (this.diasDoMes.length - 1 < contagem) {

                } else {
                    if (semana.id === "semana-um") {
                        if (i == this.objMes[0].numero || inicia == true) {

                            var diaFormated = this.formatData(contagem)
                            td.innerHTML = diaFormated // CRIAR FORMATAÇÃO
                            contagem++
                            inicia = true
                        }
                    } else {
                        var diaAtualEl = semana.children[i]
                        var diaFormated = this.formatData(contagem)
                        diaAtualEl.innerHTML = diaFormated // CRIAR FORMATAÇÃO
                        contagem++
                    }
                }
            })
        })
    }
    formatData(dia) {
        //console.log(this.objMes[dia].diaS)
        var diaFormatado = JSON.stringify(this.objMes[dia].diaM)
        diaFormatado = diaFormatado.replace(/['"]+/g, "") //REMOVER ASPAS
        return diaFormatado
    }
    nextMonthBtnInit() {
        this.nextMonthBtnEl.addEventListener('click', e => {
            var ultimoDia = this.diasDoMes.length - 1
            var ultimoDiaDiaArray = this.objMes[ultimoDia] // 
            var primeirDiaDaSemana = ultimoDiaDiaArray.numero
            primeirDiaDaSemana = primeirDiaDaSemana + 1
            if (primeirDiaDaSemana > 6) primeirDiaDaSemana = 0

            this.mes = this.mes + 1
            if (this.mes > 11) this.mes = 0, this.ano = this.ano + 1

            var diasDesseMes = this.quantosDias(this.mes)
            var diasDoMes = new Array(diasDesseMes);

            this.diasDoMes = diasDoMes

            this.objMes = {}
                //onsole.log(primeirDiaDaSemana, 1, diasDoMes)

            this.setAno(this.ano)
            this.setMes(this.mes)
            this.renderPraFrente(primeirDiaDaSemana, 1, diasDoMes)
            this.cleanCalendar()
            this.insertNumberDays()
                //console.log(this.objMes)
        })
    }
    cleanCalendar() {
        this.semanasEl.forEach((semana, i) => {
            var dias = [...semana.children]
            dias.forEach((td, i) => {
                td.innerHTML = ""

            })
        })
    }
    prevMonthBtnInit() {
        this.previousMonthBtnEl.addEventListener('click', e => {
            var ultimoDia = this.objMes[0].numero
            ultimoDia = ultimoDia - 1
            if (ultimoDia < 0) ultimoDia = 6

            this.mes = this.mes - 1

            if (this.mes < 0) this.mes = 11, this.ano = this.ano - 1

            var diasNesseMes = this.quantosDias(this.mes)
            var diasDoMes = new Array(diasNesseMes);
            this.diasDoMes = diasDoMes
            this.objMes = {}
            this.setAno(this.ano)
            this.setMes(this.mes)
            this.renderParaTras(ultimoDia, diasNesseMes)
            this.cleanCalendar()
            this.insertNumberDays()
        })
    }
    setMes(mes) {
        var mesesDoAno = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        mesesDoAno.forEach((m, i) => {
            if (i == mes) {
                this.mesEl.innerHTML = m
            }
        })

    }
    setAno(ano) {
        if (this.ano % 4 == 0 && ano % 100 != 0 || ano % 400 == 0) {
            this.bisesto = false
        } else {
            this.bisesto = true
        }

        this.anoEl.innerHTML = ano
    }
    mesDeHojeBtnInit() {
        this.btnVoltaPraEsseMes.addEventListener('click', e => {
            var hoje = new Date
            this.mes = hoje.getMonth();
            this.data = hoje.getDate()
            this.diaDaSemana = hoje.getDay()
            this.ano = hoje.getFullYear()
            this.diasDoMes = new Array(this.quantosDias(this.mes));

            this.setAno(this.ano)
            this.setMes(this.mes)
            this.cleanCalendar()

            this.renderPraFrente(this.diaDaSemana, this.data, this.diasDoMes)
            this.renderParaTras(this.diaDaSemana, this.data);
            this.insertNumberDays()
                //console.log(this.objMes)
        })
    }
}