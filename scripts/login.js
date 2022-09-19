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
        .then(resposta => {
            
            
           console.log(resposta.json());
          resposta.json()
        })
        .then(data => {

            if (data.jwt) {
                const usuario = {
                    jwt: data.jwt,
                    name: email.value
                    }
                localStorage.setItem('user', JSON.stringify(usuario));
                location.replace('/')

                
            }
            
            form.reset();
        })
    });



