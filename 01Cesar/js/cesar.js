const desplazamiento = document.getElementById("desplazamiento");
const texto = document.getElementById("texto");
const textoCifrado = document.getElementById("cifrado");

//creamos funcion para poder cifrar
function cifrado(){
    //declarar el texto que se va a ingresar
    const textoIngresado = texto.value;
    textoCifrado.value = textoIngresado.split('').map(c =>{
        let mayus = (c === c.toUpperCase()) ? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);
        if(valorEntero >= 97 && valorEntero <= 122){
            const valorDesplazamiento = parseInt(desplazamiento.value);

            if(valorEntero + valorDesplazamiento > 122){
                valorEntero = 97 + (valorEntero - 122) + valorDesplazamiento - 1;
            }else{
                valorEntero = valorEntero + valorDesplazamiento;
            }
        }
        let cifrado = String.fromCharCode(valorEntero);
        return mayus ? cifrado.toUpperCase() : cifrado;
    }).join('');
}

texto.addEventListener("keyup", cifrado);
desplazamiento.addEventListener("change", cifrado);
