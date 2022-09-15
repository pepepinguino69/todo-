window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  
  
  
    const email = document.getElementById("inputEmail");
    const pass1 = document.getElementById("inputPassword");
    form=this.document.querySelector('form')
    

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
    form.addEventListener("submit", function (event) {
    event.preventDefault();
    token = window.localStorage.getItem("jwt");
    if (token != undefined) {
      let config = {
        method: "POST",
        body: JSON.stringify({
          email: email.value,
          password: pass1.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      realizarLogin(config);
    } else {
      alert("error de login");
    }
  });
});
    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
  /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {

           
        const offset = "/users/login";
        data = contactApi(offset, settings);
           
           
        
    }

async function contactApi(url, configComm) {
    let base = "https://ctd-todo-api.herokuapp.com/v1";
    const response = await fetch(base+url, configComm);
  const data = await response.json();
    alert(response.statusText);
    if (response.status > 299) {
        alert(error)
    }
    else{
      window.localStorage.setItem("jwt", data.jwt);
      window.location.replace("mis-tareas.html");
    }
}        
   
