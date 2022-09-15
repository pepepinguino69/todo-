/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {return (texto.length>10)
    
}

function normalizarTexto(texto) {return texto.trim().toLowerCase()
    
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    const validRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegEx)
}
    

    


function normalizarEmail(email) {return email.toLowerCase()
    
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) { alert(contrasenia); return (contrasenia.length > 5) }
    


function compararContrasenias(contrasenia_1, contrasenia_2) {
    alert(contrasenia_1 + 'pass1');alert(contrasenia_2+'pass2'); return (contrasenia_1==contrasenia_2)
    
}

