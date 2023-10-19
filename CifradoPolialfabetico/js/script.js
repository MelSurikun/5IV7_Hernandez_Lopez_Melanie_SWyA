//VALIDACIONES --------------------------------------------------------------------------
function validarTexto(input) {
    // solo letras
    input.value = input.value.replace(/\d/g, '');
}

function permitirSoloNumeros(input) {
    // solo numeros
    input.value = input.value.replace(/[^0-9]/g, '');
}

//CESAR SOLO NÚMEROS --------------------------------------------------------------------
window.addEventListener("load",inicio,true);

function inicio(){
    document.getElementById("mensaje").addEventListener("keyup", function(){
        this.value = this.value.toUpperCase();
    }, true);
    
    document.getElementById("cifrar").addEventListener("click",function(){  
        let texto = document.getElementById("mensaje").value;
        let desplazamiento = document.getElementById("desplazamiento").value;               
        document.getElementById("mensaje2").value = cifrar2(texto, desplazamiento);
    },true);
    document.getElementById("descifrar").addEventListener("click",function(){  
        let texto = document.getElementById("mensaje").value;
        let desplazamiento = document.getElementById("desplazamiento").value;                               
        document.getElementById("mensaje2").value = descifrar(texto, desplazamiento);
    },true);
}

function cifrar(texto, desplazamiento) {
    if (!texto) 
        return ''; 
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    desplazamiento = (desplazamiento % 26 + 26) % 26; 
    return texto.replace(/[A-Z]/ig, c => letras[(letras.indexOf(c) + desplazamiento) % 26]);
}

function descifrar(texto, desplazamiento) {
    if (!texto) 
        return ''; 
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    desplazamiento = (desplazamiento % 26 - 26) % 26; 
    return texto.replace(/[A-Z]/ig, c => letras[(letras.indexOf(c) - desplazamiento) % 26]);
}

function cifrar2(texto, desplazamiento) {
    let resultado='';
    let letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    desplazamiento = (desplazamiento % 26 + 26) % 26; 
    
    if (texto){
        for (let i=0; i<texto.length; ++i){
            //Si la letra está en el array de letras (es un símbolo, un espacio...)
            if (letras.indexOf(texto[i])!=-1)
            { 
                let posicion=((letras.indexOf(texto[i])+desplazamiento) % 26);
                resultado+=letras[posicion];
            }
            else
                resultado+=texto[i]; // Números, espacios, símbolos... 
        }
    }
    return resultado;
}

function colocar2(){
    //copiar el texto
    var copiar = document.getElementById("mensaje2").value;
    document.getElementById("mensaje").value = copiar;
}

function limpiar(){
    document.getElementById("mensaje").value ="";
    document.getElementById("desplazamiento").value = "";
    document.getElementById("mensaje2").value = "";
    document.getElementById("mensaje1").value = "";
    document.getElementById("desplaza").value = "";
}

//CESAR SOLO LETRAS -----------------------------------------------------------------------------------
function colocar3(){
    //copiar el texto
    var copiar = document.getElementById("mensaje1").value;
    document.getElementById("mensaje").value = copiar;
}

//PARTE VIGGENERE --------------------------------------------------------------------------------------
var viggener = viggener || (function () {
    var doStaff = function (mensaje, desp, action){
        var replace = (function (){
            var abc = ['a', 'b','c','d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'
        , 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        var l = abc.length;
        return function(c){
            var i = abc.indexOf(c.toLowerCase());
            if(i != -1){
                var pos = i;
                if(action){
                    //cifrar
                    pos += desp;
                    pos =(pos >=l) ? pos - l:pos;
                }else{
                    //descifrar
                    pos -= desp;
                    pos =(pos <0) ? pos + l:pos;
                }
                return abc[pos];
            }
            return c;
            };
        })();
        var re = (/([a-z])/ig);
        return String(mensaje).replace(re, function(match){
            return replace(match);
        });
    };
    return {
        encode : function(mensaje, desp){
            return doStaff(mensaje, desp, true);
        },
        decode : function (mensaje, desp){
            return doStaff(mensaje, desp, false);
        }
    };
})();

function longitudCifrar(){
    camposVacios();
    var texto = document.getElementById("mensaje").value;
    var clave = document.getElementById("txtClave").value;

    if(clave.length > texto.length){
        alert("La clave no puede ser mas grande que el texto a cifrar. ")
    }else{
        codificar(texto, clave);
    }
}


function longitudDescifrar(){
    camposVacios();
    var texto = document.getElementById("mensaje").value;
    var clave = document.getElementById("txtClave").value;

    if(clave.length > texto.length){
        alert("La clave no puede ser mas grande que el texto a cifrar. ")
    }else{
        decodificar(texto, clave);
    }
}

function codificar (texto, clave){
    var resultado = "";
    var indiceClave = 0;
    var charATexto = texto.split('');

    for(i = 0; i<charATexto.length;i++ ){
        var des = obIndiceClave(clave.charAt(indiceClave));
        var charTexto = charATexto[i];

        resultado += viggener.encode(charTexto, (des >= 26) ? des % 26: des);
        indiceClave++;
        if(indiceClave >= clave.length){
            indiceClave= 0;
        }
    }
    document.getElementById("res").value = resultado;
}

function decodificar (texto, clave){
    var resultado = "";
    var indiceClave = 0;
    var charATexto = texto.split('');

    for(i = 0; i<charATexto.length;i++ ){
        var des = obIndiceClave(clave.charAt(indiceClave));
        var charTexto = charATexto[i];

        resultado += viggener.decode(charTexto, (des >= 26) ? des % 26: des);
        indiceClave++;
        if(indiceClave >= clave.length){
            indiceClave= 0;
        }
    }
    document.getElementById("res").value = resultado;
}


function obIndiceClave(reco){
    var abc = ['a', 'b','c','d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'
        , 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    return abc.indexOf(reco.toLowerCase());


}

function camposVacios(){
    var texto = document.getElementById("mensaje").value;
    var clave = document.getElementById("txtClave").value;

    if(texto === ""){
        alert("INGRESE UN TEXTO PARA CIFRAR");
    }
    if(clave === ""){
        alert("INGRESE UNA CLAVE PARA CIFRAR");
    }
}

function colocar (){
    //copiar el texto
    var copiar = document.getElementById("res").value;
    document.getElementById("mensaje").value = copiar;

}

function reiniciar(){
    document.getElementById("mensaje").value = "";
    document.getElementById("txtClave").value = "";
    document.getElementById("res").value = "";

}