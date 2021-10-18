/*váriaveis globais*/ 

var altura = 0
var largura = 0
var vidas = 1
var tempo = 100

var criaMosquitoTempo = 1500

// controle de dificuldade do jogo
var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal'){
    //1500 (um segundo e meio)
    criaMosquitoTempo = 1500
}else if(nivel === 'dificil'){
    //1000 (um segundo)
    criaMosquitoTempo = 1000
}else if(nivel === 'exterminador'){
    //750 (3/4 de um segundo)
    criaMosquitoTempo = 750
}

/*Função para controlar a área que o mosquito vai aparecer, conforme
redimensionamento do usuário*/

function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight
    largura = window.innerWidth

    //console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

/*variavel da função do cronometro*/
var cronometro = setInterval(function(){
    if(criaMosquitoTempo == 1000){
        tempo = 50
    }else if(criaMosquitoTempo == 750){
        tempo = 25
    }
    tempo -= 1

    if(tempo < 0  ){
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    }else{

    document.getElementById('cronometro').innerHTML = '&nbsp&nbsp' + tempo
    } 
}, 1000)

/*Criando posição randômica do mosquito*/
function posicaoRandomica(){

    //remover o mosquito anterior caso exista
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        //Remove vida caso tempo passe

        if (vidas > 3){
            window.location.href = 'fim_de_jogo.html'
        }else{
            document.getElementById('v' + vidas).src = 'img/coracao_vazio.png'
            vidas++
        }
    }
    

    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    //console.log(posicaoX, posicaoY)

    //criando elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'img/mosca.png'
    mosquito.className = tamanhoAleatorio() + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.draggable = 'false'
    mosquito.ondragstart = function(){return false}
    mosquito.onclick = function(){
        mosquito.src = 'img/mosca_morta.png'
        mosquito.className = 'mosca_morta'
        mosquito.id = 'mosca'
        setTimeout(function(){
            document.getElementById('mosca').remove()
        },300)    
    }

    document.body.appendChild(mosquito)
}

/*Criando tamanhos variáveis do mosquito*/

function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3)
    
    switch(classe){
        case 0:
            return 'mosquito1 '
        case 1:
            return 'mosquito2 '
        case 2:
            return 'mosquito3 '        
    }
}

/*Alternando Lados do mosquito */

function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2)
    
    switch(classe){
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'        
    }
}