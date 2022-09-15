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
      alert(response.statusText);
      if (response.status > 299) {
        alert("error");
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
  btnChange.addEventListener("click", (e) => {
    botonesCambioEstado();
  });
  btnDelete = this.document.createElement("button");
  btnDelete.addEventListener("click", (e) => {
    botonBorrarTarea();
  });
  btnCancel = this.document.createElement("button");
  btnCancel.style.padding = "10px";
  btnDelete.style.padding = "10px";
  btnChange.style.padding = "10px";
  btnCancel.style.display= "flex";
  btnDelete.style.display="flex";
  btnChange.style.display="flex";
  btnCancel.style.alignItems="center"
  btnDelete.style.alignItems="center"
  btnChange.style.alignItems="center"

  btnCancel.addEventListener("click", (e) => {
    document.querySelector("#fullPanel").style.display = "none";
  });
    btnCancel.innerText = 'Cancel'
  btnChange.innerText = 'Mover'
    btnChange.style.backgroundColor = "green";
  btnDelete.innerText = "Delete";
  btnDelete.style.height = "30px";
  btnDelete.style.fontSize = "20px";
  btnDelete.style.backgroundColor='red'
btnChange.style.height = "30px";
  btnChange.style.fontSize = "20px";
  btnCancel.style.height = "30px";
  btnCancel.style.fontSize = "20px";




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
    const tareasTerminadas = document.querySelector(".tareas-terminadas");
    const fragmentPendientes = document.createDocumentFragment()
    const fragmentTerminadas = document.createDocumentFragment();
    tareasPendientes.innerHTML = "";
    tareasTerminadas.innerHTML = '';
    let fragment = new DocumentFragment();
    let acc = 0
    listado.forEach(e => {
      line = document.createElement('li')
      
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
      if (e.completed) { line.id = 'c' + e.id; fragmentTerminadas.appendChild(line); acc++ }
      else {line.id = 'p' + e.id;
        fragmentPendientes.appendChild(line)
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
    arr=clickedItem.innerText.split('-'); tasksCore('modify',arr[0].substring(0,1)+arr[1])
    consultarTareas();
    



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {clickedItem = document.querySelector("#modifyTask");
  arr = clickedItem.innerText.split("-");
  tasksCore("delete", arr[0].substring(0, 1) + arr[1]);
   consultarTareas();
    

    

  };
})
