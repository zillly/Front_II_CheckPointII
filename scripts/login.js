let form = document.querySelector('form');
let email = document.getElementById('inputEmail')
let labelSenha = document.getElementById('labelSenha')
let senha = document.getElementById('inputPassword')
let labelEmail = document.getElementById('labelEmail')
let msgError = document.getElementById('msgErr')
let button = document.getElementById('acessar')
let url = 'https://ctd-todo-api.herokuapp.com/v1/users/login';
let emailOk = false
let senhaOk = false

function habilitarButtonSubmit() {
    button.disabled = false
    button.innerText = 'Acessar'
    button.style.background = '#7898FF'
}

function desabilitarButtonSubmit() {
    button.disabled = true
    button.innerText = 'Bloqueado'
    button.style.background = 'grey'
}

desabilitarButtonSubmit()

email.onkeyup = () => {
    email.value = email.value.trim()

    if (email.value === "") {
        emailOk = false
    } else {
        emailOk = true
        atualizarStatusButtonSubmit()
    }
}

senha.onkeyup = () => {
    senha.value = senha.value.trim()

    if (senha.value === "") {
        senhaOk = false
    } else {
        senhaOk = true
        atualizarStatusButtonSubmit()
    }
}
    function oFormEstaOk() {
         if (emailOk && senhaOk) {
            return true
        } else {
            return false
        }
    }
    function atualizarStatusButtonSubmit() {
        if (oFormEstaOk()) {
            habilitarButtonSubmit()
        } else {
            desabilitarButtonSubmit()
        }
    }
    

form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    if (oFormEstaOk()) {
        realizarLogin()
    }
function realizarLogin(){

    const lValor = {
    email: email.value,
    password: senha.value
    };
    const loginApi = {
        method: 'POST',
        body: JSON.stringify(lValor),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(url, loginApi)
    .then(async resposta => {
        if(resposta.status === 404){
            msgError.setAttribute('style', 'display: block')
            msgError.innerHTML = '<strong>Usuario não existe</strong>'
        } 
        else if (resposta.status === 400){
            msgError.setAttribute('style', 'display: block')
            msgError.innerHTML = '<strong>Senha Incorreta </strong>'
            
        }
        else if (resposta.status === 201){ 
            
            let body = await resposta.json()
            const usuarioToken = body.jwt
            localStorage.setItem('user', usuarioToken);
            location.assign("./tarefas.html")
           
        }else{
            msgError.setAttribute('style', 'display: block')
            msgError.innerHTML = '<strong>Erro desconhecido </strong>'
        }
    
            //console.log(resposta.json());
        })
}
    });
    
