/*   ////////////////// FUNÇÕES  ///////////// */


const mostraIdade = () => {
  let span = document.getElementById('txt-idade')
  let campoIdade = document.getElementById('idade')
  span.innerText = campoIdade.value
  
}

var dataAtual = new Date()
const mostraData = () => {
  let dia = dataAtual.getDay()
  let mes = dataAtual.getMonth() + 1
  let ano = dataAtual.getFullYear()
  let hora = dataAtual.getHours()
  let valor = dia + '/' + mes + '/' + ano + '.' + hora

  document.getElementById('dt-cadastro').value = valor


}

const getEstados = () => {
  let api = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
  let select = document.getElementById('estado')



  //Lê a API através do fetch(),1°then captura os dados, 2° then trata os dados
  fetch(api).then(resposta => resposta.json()).then(json => {
    let options = '<option>Selecione</option>'

    //console.log(json)
    for (const index in json) {
      //console.log(json[index].nome)
      options += `<option value=${json[index].sigla}>${json[index].nome}</option>`
    }
    select.innerHTML = options
  })

}

// Preencha o select de cidades de acordo com UF selecionado
//A função recebe um parâmetro (uf) com o ID da UF
const getCidadesByUf = (uf) => {
  let api = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`


  let select = document.getElementById('cidade')




  fetch(api).then(resposta => resposta.json()).then(json => {
    let options = '<option>Selecione</option>'


    for (const index in json) {

      options += `<option value=${json[index].nome}>${json[index].nome}</option>`

    }
    select.innerHTML = options
  })

}

const rolagem = ()=>{
  const html = document.documentElement
  const linktopo = document.getElementById('linktopo')
  linktopo.style.opacity = 0

  /* //Se a rolagem for maior que 550, a seta aparece
  abaixo de 550 esconda */

  if (html.scrollTop > 550) {
    linktopo.style.display = 'block'
  } else {
   
   linktopo.style.display = 'none'
  }


  //console.log(html.scrollTop)
}





    /*  EXEMPLO LAÇO FOR
    var semestre = ['jan', 'Fev', 'Marc', 'Abr', 'Mai', 'jun']
    var texto = ''
    for (let index = 0; index < semestre.length; index++) {
      const element = semestre[index];
      texto = element + '<br>'
      document.getElementById('explorar').innerHTML += texto 
    } */


    /* -------------------------------------------*/


    /*  //////////// EVENTOS E EXECUÇOES AUTOMATICAS ///////////////  */

   

    getEstados()

    mostraIdade()
    document.getElementById('idade').addEventListener('change', mostraIdade)

    mostraData()

    // Inicializa animações scroll do AOS
    AOS.init();


    // Impede o envio do formulário quando os campos estão invalidos

    (function () {
      'use strict'

      // Captura as tags <form> que contem as classes "needs-validation"
      var forms = document.querySelectorAll('.needs-validation')

      // Executa para cada formulário da variável forms
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            //Se hover campos inválidos,interrompe o SUBMIT
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }

            form.classList.add('was-validated')
          }, false)
        })
    })()


    document.getElementById('estado').addEventListener('change', function () {
      getCidadesByUf(this.value)
    
    
    })

    window.onscroll = ()=> rolagem()



// this representa o estado 

