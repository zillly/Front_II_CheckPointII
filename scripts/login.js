let form = document.querySelector('form');
let email = document.getElementById('inputEmail')
let labelSenha = document.getElementById('labelSenha')
let senha = document.getElementById('inputPassword')
let labelEmail = document.getElementById('labelEmail')
let msgError = document.getElementById('msgErr')
let url = 'https://ctd-todo-api.herokuapp.com/v1/users/login';


form.addEventListener('submit', function (evento) {
    evento.preventDefault();
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
           localStorage.setItem('token', usuarioToken);
           location.replace('/tarefas.html');
           
        }else{
            msgError.setAttribute('style', 'display: block')
            msgError.innerHTML = '<strong>Erro desconhecido </strong>'
        }
        
        //console.log(resposta.json());
    })
   
    });
    
