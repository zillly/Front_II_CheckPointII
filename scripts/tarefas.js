window.addEventListener('load', function () {

  
  const userName = document.querySelector('.user-info p');
  const usuarioToken = localStorage.token
  const urlMe = "https://ctd-todo-api.herokuapp.com/v1/users/getMe"
    
 const headerGetMe = {
     'Content-type': 'application/json; charset=UTF-8',
     'Authorization': usuarioToken
      }

      const userGetMe =  {
         method: 'GET',
         headers: headerGetMe
     }
     
     fetch(urlMe , userGetMe )
     .then(async resposta => {
         if (resposta.status === 200){
             let user = await resposta.json()
             userName.innerText =`${user.firstName} ${user.lastName}`
             
            
            }
          })
          
  const btnEncerra = document.getElementById('closeApp');
  btnEncerra.addEventListener('click', function () {
    let encerrar = confirm("Deseja encerrar sessão")
    if (encerrar) {
      localStorage.clear();
      location.replace('/index.html');
    }
  })

  
  const urlTareas = 'https://ctd-todo-api.herokuapp.com/v1/tasks'
  const formTarefa = document.querySelector('.nova-tarefa');
  const novaTarefa = document.getElementById('novaTarefa');


  


});