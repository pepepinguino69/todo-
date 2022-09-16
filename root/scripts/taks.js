// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.


  /* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener("load", function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  if (window.localStorage.getItem('jwt')==undefined){location.replace('login.html')}  
  async function contactApi(url, configComm) {
      let base = "https://ctd-todo-api.herokuapp.com/v1";
      const response = await fetch(base + url, configComm);
      const data = await response.json();
      ;
      if (response.status > 299) {
       alert(response.statusText);
      } else {
        return data;
      }
  }
  function miFecha(a) {
    return (
      a.substring(8, 10) + "/" + a.substring(5, 7) + "/" + a.substring(0, 4)
    );
  }
  function tasksCore(type, content) {
    newState = content.substring(0, 1)
    
    if(newState=='p'){newState=true}else{newState=false}
    let offset = "/tasks";
    let base = "https://ctd-todo-api.herokuapp.com/v1";
    let config = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    };
  
    if (type == 'create') {
      config.body = JSON.stringify({ description: content, completed: false })
    }
    else if (type == 'modify') { config.method='PUT'; config.body = JSON.stringify({ completed: newState }); offset = offset + "/" + content.substring(1); }
    else {
      if (confirm('esta Seguro?')) { config.method = 'DELETE'; offset += '/' + content.substring(1) } }
     
  contactApi(offset, config);
  consultarTareas()



  }
  const btnCerrarSesion = document.getElementById("closeApp");
  let form = document.querySelector("form");
  const userInfo = document.querySelector("#user");
  modifyTasks = document.createElement('div')
  modifyTasks.style.display = 'none'

  modifyTasks.id='fullPanel'
  
  modifyTasks.class='nueva tarea'
  taskBillboard = document.createElement("div");
  taskBillboard.id='modifyTask'
  taskBillboard.innerText = 'la tarea'
  buttonPanel = document.createElement("div");
  buttonPanel.style.display = 'flex'
  buttonPanel.style.justifyContent='space-around'
  buttonPanel.style.width= '15rem'
  modifyTasks.style.height = '50px'
  modifyTasks.style.fontSize = '20px'
  btnChange = this.document.createElement('button')
  btnChange.innerHTML = '<i class="fas fa-exchange-alt"></i>&nbsp Mover';
  btnChange.addEventListener("click", (e) => {
    botonesCambioEstado();
  });
  btnDelete = document.createElement("button");
  btnDelete.innerHTML = '<i class="fa fa-trash"></i><sp>&nbsp Delete';
	
  
  btnDelete.addEventListener("click", (e) => {
    botonBorrarTarea();

  });
  btnCancel = this.document.createElement("button");
  btnCancel.className='panel'
  btnDelete.className = "panel";
  btnChange.className = "panel";
  
  
  
  
  
  

  btnCancel.addEventListener("click", (e) => {
    document.querySelector("#fullPanel").style.display = "none";
  });
    btnCancel.innerText = 'X'
 
    btnChange.style.backgroundColor = "green";
  btnDelete.style.backgroundColor='red'








    buttonPanel.appendChild(btnChange)
    buttonPanel.appendChild(btnDelete)
  buttonPanel.appendChild(btnCancel)
  modifyTasks.appendChild(buttonPanel);
  modifyTasks.appendChild(taskBillboard)
  
  
    
    colgar = document.querySelector('.container')
    colgar.appendChild(modifyTasks)
    obtenerNombreUsuario();
    consultarTareas()
 
  //btnCambioEstado=

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */
  btnCerrarSesion.addEventListener("click", function () {
    credenciales = window.localStorage.removeItem("jwt");
    window.location.replace("index.html");
  });
  

  //});

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  async function obtenerNombreUsuario() {
    token = window.localStorage.getItem("jwt");
    let configGet = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    };
    const offset = "/users/getMe";
    Api = await contactApi(offset, configGet);
    const userInfo = document.querySelector('.user-info p')
    let userCard = `<p>${Api.id}- ${Api.firstName} ${Api.lastName}</p>`;
    userCard += `<p>${Api.email}</p>`
    userInfo.innerHTML = userCard
    userPic = document.querySelector(".user-image")
    userPic.style.backgroundImage = "url(./assets/007.jpg)"
      
  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  async function consultarTareas() {
    token = window.localStorage.getItem("jwt");
    let configGet = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    };
    const offset = "/tasks";;
    Api = await contactApi(offset, configGet);
    renderizarTareas(Api)
  };
  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */
  
  
  
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    let token = window.localStorage.getItem("jwt");
    formNewTarea = document.querySelector("#nuevaTarea");
    taskDesc = formNewTarea.value
    tasksCore('create',taskDesc)
    consultarTareas()
  })







  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    token = window.localStorage.getItem("jwt");
    const tareasPendientes = document.querySelector(".tareas-pendientes");
    tareasPendientes.listStyleType = "\1F44D";
    const tareasTerminadas = document.querySelector(".tareas-terminadas");
    const fragmentPendientes = document.createDocumentFragment()
    const fragmentTerminadas = document.createDocumentFragment();
    tareasPendientes.innerHTML = "";
    tareasTerminadas.innerHTML = '';
    let fragment = new DocumentFragment();
    let acc = 0
    listado.forEach(e => {
      line = document.createElement('li')
      line.style.listStyleType = "\2746";
     
    
      
      line.innerHTML = `${e.id}-${e.userId}-${e.description}-${miFecha(e.createdAt)}`
      line.addEventListener("click", (evento) => {
        document.querySelector("#fullPanel").style.display = "flex";
        panel = document.querySelector('#modifyTask')
        taskId = evento.target.id
        taskToShow = document.getElementById(taskId).innerText
        if (taskId.substring(0, 1) == 'p') { panel.innerText = 'pending' + '-'+taskToShow }
        else
          { panel.innerText = "completed" + "-" + taskToShow;}
    

      });
      if (e.completed) { line.id = 'c' + e.id; line.className = 'completed'; fragmentTerminadas.appendChild(line); acc++; }
      else {
        line.id = 'p' + e.id;
        line.className = '';
        fragmentPendientes.appendChild(line);
      }
    })
    tareasPendientes.appendChild(fragmentPendientes)
    tareasTerminadas.appendChild(fragmentTerminadas)
    counter = document.querySelector('#cantidad-finalizadas')
    counter.innerHTML = acc
    
    



  }

    
        
    
    






    

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado(estado) {
    
    clickedItem = document.querySelector('#modifyTask')

    arr = clickedItem.innerText.split('-');
    clickedItemInList = document.querySelector('#' + arr[0].substring(0, 1) + arr[1])
    tasksCore('modify', arr[0].substring(0, 1) + arr[1])
     document.querySelector("#fullPanel").style.display = "none";
    consultarTareas();
    



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {clickedItem = document.querySelector("#modifyTask");
  arr = clickedItem.innerText.split("-");
    tasksCore("delete", arr[0].substring(0, 1) + arr[1]);
     document.querySelector("#fullPanel").style.display = "none";
   consultarTareas();
    

    

  };
})
