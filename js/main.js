
const isEmail = (email) => {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
    return regex.test(email);
  }
  
  const esNumero = (numero) => {
    let regexNumber = /^(?:(?:00||\S)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
    return regexNumber.test(numero);
  }

  const esPassword = (clave = passwords[PASS]) => {
    let regexPass = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    return regexPass.test(clave);
  }
  
  const reseteo = () => {
    location.reload();
  }
  
  //Desaparecer y reanudar datos
  const desaparecer = () => {
      campoVacio = "";
      mensajeError = "";
      $mensajeError.innerHTML = mensajeError;
      $mensajeError.style.setProperty("display","none");
      $password.value = "";
      $confirmarPass.value = "";
  
  }
   
  const activarBoton = () => $botonEnviar.removeAttribute("disabled");
  
  const $email = document.getElementById("email"),
   $telefono = document.getElementById("telefono"),
   $password = document.getElementById("password"),
   $confirmarPass = document.getElementById("confirmarPass"),
   $mensajeError = document.getElementById("mensajeErrorCampos"),
   $mensajeExitoso = document.getElementById("mensajeExitoso"),
   $botonEnviar = document.getElementById("botonEnviar");
  
    const   PASS = Symbol("p"),
    CPASS = Symbol("cp"),
    passwords = {
      [PASS] : "",
      [CPASS] : ""
    };
  
   let campoVacio= "",
    mensajeError = "";
    
    //Ocultar div mensaje error y exitoso
    $mensajeError.style.setProperty("display","none");
    $mensajeExitoso.style.setProperty("display","none");
  
  document.addEventListener("click", (e) => {
  
    if(e.target.matches("#botonEnviar")){
    
      //Almacenar en Symbol
      passwords[PASS] = $password.value;
      passwords[CPASS] = $confirmarPass.value;
  
      // Verificación de campos no vacíos
      if ($email.value === "") campoVacio +=  `<p id="error">• Email.</p>`;
      if ($telefono.value === "") campoVacio += `<p id="error">• Teléfono.</p>`;
      if ($password.value === "") campoVacio += `<p id="error">• Contraseña.</p>`;
      if ($confirmarPass.value === "") campoVacio += `<p id="error">• Confirmación de contraseña.</p>`;
      if (campoVacio!="") mensajeError = `<p id="error" class="titulo">Los siguientes campos están vacíos: </p>${campoVacio+mensajeError} `; 
  
      //Validamos el formato del email
      if(isEmail($email.value) === false && $email.value != "") mensajeError +=`<p id="error">Tu dirección de email ${$email.value} no es válida.</p>`;
      
      // Validación numérica del campo teléfono
      if(esNumero($telefono.value) === false && $telefono.value != "") mensajeError += `<p id="error">Tu teléfono no es válido.</p>`;
      
      //Validación campo password y confirmación password
      if(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test($password.value) === false && $confirmarPass.value != "") mensajeError += `<p id="error">La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.</p>`; 

      // Confirmación del password
         const confirmarPassword = () => {
        if(passwords[PASS] != passwords[CPASS] && $confirmarPass.value != "") {
        mensajeError += `<p id="error">La confirmación de su contraseña no es válida, por favor escríbalo igualmente a la original.</p>`;
      }
      };
      confirmarPassword();
   
      if(mensajeError!="")
      {
        $mensajeError.innerHTML = mensajeError;
        $mensajeError.style.setProperty("display","block");
        $mensajeExitoso.style.setProperty("display","none");
        setTimeout(desaparecer, 5000);
        setTimeout(activarBoton, 5000);
  
      } else {
        $mensajeExitoso.innerHTML = `<p id="exito">Felicidades ${$email.value}, te has registrado con éxito. Recibirás un correo de confirmación para logear. Muchas gracias por suscribirte con nosotros.</p>`;
        $mensajeError.style.setProperty("display","none");
        $mensajeExitoso.style.setProperty("display","block");
        $botonEnviar.style.setProperty("margin-bottom","2%");
        setTimeout(reseteo, 10000);
      }
  
      //Desactivo boton de envío para prevenir muchos clicks
      $botonEnviar.setAttribute("disabled", "true");
  
   
      
      
      
      
  
  
    }
  })