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

    select.innerHTML = options
  })

}




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