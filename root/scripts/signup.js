
  /* ---------------------- obtenemos variables globales ---------------------- */
 const nombre = document.querySelector("#inputNombre")
 const apellido = document.querySelector("#inputApellido")
  const email = document.querySelector("#inputEmail");
  const pass1 = document.querySelector("#inputPassword");
  const pass2 = document.querySelector("#inputPasswordRepetida");
 
 
 
 


  
  
  
  
  
  
  
  
  
  
  

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {

    event.preventDefault();
    
    
    
    
    
    

    if (compararContrasenias(pass1.value, pass2.value) && validarContrasenia(pass1.value) && validarEmail(email.value)) {
      let config = {
        method: "POST",
        body: JSON.stringify({
          firstName: nombre.value,
          lastName: apellido.value,
          email: normalizarEmail(email.value),
          password: pass1.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      realizarRegister(config)
      form.reset();
      window.location.replace('index.html')
    }
    else
      
      {alert('error de validaciones')}
  
  });


    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
async function realizarRegister(settings) {
    const offset = "/users";
    data = contactApi(offset, settings);
    window.localStorage.clear()
    window.localStorage.setItem("jwt", data.jwt);
    
    }
async function contactApi(url, configComm) {
    let base = "https://ctd-todo-api.herokuapp.com/v1";
    const response = await fetch(base+url, configComm);
    const data = await response.json();
    alert(response.statusText);
    if (response.status > 299) {
        alert(error)
    }
    else
    {
    return await data;
  }
  
    }        
  