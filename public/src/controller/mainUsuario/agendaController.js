class AgendaController {


    constructor(usuario) {
        this.user = usuario;
        //elements
        this.semanasEl = document.querySelectorAll("#dias-do-mes>tr");
        this.agendaDiv = document.querySelector('#agenda');
        this.telaDia = document.querySelector('#day-selected');
        this.anoEl = document.querySelector('#titulo-do-ano');
        this.mesEl = document.querySelector('#titulo-do-mes');
        //btns do calendario
        this.nextMonthBtnEl = document.querySelector("#next-month");
        this.previousMonthBtnEl = document.querySelector("#prev-month");
        this.btnVoltaPraEsseMes = document.querySelector("#today-month");

        //var para contagem dos dias
        this.today = new Date();
        this.data = this.today.getDate();
        this.diaDaSemana = this.today.getDay();
        this.mes = this.today.getMonth();
        this.ano = this.today.getFullYear();
        this.objMes = {};
        this.initiateMonth();
    }
    initiateMonth() {
        this.diasDoMes = new Array(this.quantosDias(this.mes));
        //funções pra preencher o objMes{}
        this.renderPraFrente(this.diaDaSemana, this.data, this.diasDoMes);
        this.renderParaTras(this.diaDaSemana, this.data);
        //inserindo no HTML
        this.routineRender();
        //botoes muda de mes
        this.nextMonthBtnInit();
        this.prevMonthBtnInit();
        this.mesDeHojeBtnInit();
        this.btnDiaInitialize();
        this.initZoomDay()
            //console.log(this.user)
    }
    quantosDias(mes) {
        var dias
        var meses = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if (this.bisesto) meses[1] = 28
        meses.forEach((m, i) => {
            if (mes == i) {
                dias = m
            }
        });
        return dias;
    }
    nomeDoDia(dia) {
            var nomesDosDias = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado']
            var nomeDoDia
            nomesDosDias.forEach((d, i) => {
                if (dia == i) {
                    nomeDoDia = d;
                }
            });
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
                    td.dataset.data = 0
                } else {
                    if (semana.id === "semana-um") {
                        if (i == this.objMes[0].numero || inicia == true) {
                            var diaFormated = this.formatData(contagem)
                            td.innerHTML = diaFormated // CRIAR FORMATAÇÃO
                            var info = JSON.stringify(this.objMes[contagem])
                            td.dataset.data = info
                            contagem++
                            inicia = true

                        } else {
                            td.dataset.data = 0
                        }
                    } else {
                        var diaFormated = this.formatData(contagem)
                        td.dataset.data = JSON.stringify(this.objMes[contagem])
                        td.innerHTML = diaFormated // CRIAR FORMATAÇÃO
                        contagem++

                    }
                }
            })
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
    cleanCalendar() {
        this.semanasEl.forEach((semana, i) => {
            var dias = [...semana.children]
            dias.forEach((td, i) => {
                td.innerHTML = ""

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
            this.renderPraFrente(primeirDiaDaSemana, 1, diasDoMes)
            this.routineRender()
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
            this.renderParaTras(ultimoDia, diasNesseMes)
            this.routineRender();
        })
    }
    mesDeHojeBtnInit() {
        this.btnVoltaPraEsseMes.addEventListener('click', e => {
            var hoje = new Date
            this.mes = hoje.getMonth();
            this.data = hoje.getDate();
            this.diaDaSemana = hoje.getDay();
            this.ano = hoje.getFullYear();
            this.diasDoMes = new Array(this.quantosDias(this.mes));
            this.renderPraFrente(this.diaDaSemana, this.data, this.diasDoMes);
            this.renderParaTras(this.diaDaSemana, this.data);
            this.routineRender();
        })
    }
    routineRender() {
            this.cleanCalendar();
            this.setAno(this.ano);
            this.setMes(this.mes);
            this.insertNumberDays();
        }
        //mostrando o dia selecionado
    addEventDayShow(tdEl) {
        tdEl.addEventListener('click', e => {
            if (tdEl.dataset.data == 0) {} else {
                this.agendaDiv.classList.add("none");
                this.agendaDiv.classList.remove("div-terapeuta");
                this.telaDia.classList.add("div-terapeuta");
                this.telaDia.removeChild(diaAtual)
                var data = document.createElement('div')
                data.id = "diaAtual"
                var infos = tdEl.dataset.data
                data.innerHTML = infos
                this.telaDia.appendChild(data)
                console.log(JSON.parse(infos))
            }
        })
    }
    btnDiaInitialize() {
        var btn = document.querySelector('#btn-voltar-calendario')
        btn.addEventListener('click', e => {
            this.agendaDiv.classList.add("div-terapeuta")
            this.telaDia.classList.remove("div-terapeuta")
        })
    }
    initZoomDay() {
        this.semanasEl.forEach((semana, i) => {
            var dias = [...semana.children]
            dias.forEach((td, i) => {
                this.addEventDayShow(td)
            })
        })
    }
}