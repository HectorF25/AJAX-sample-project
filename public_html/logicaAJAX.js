/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
let myvar = [];
let imgItem = [];
let listaC = ``;
let txtInfo = document.getElementById("txtInformacion");
let listCiudades = document.getElementById("listaCiudades");
let imagenCiudad = document.getElementById("imagenCiudad");
window.addEventListener('load',init,false);
function init(){
   let selectBox = document.getElementById('listPaises');
   if (selectBox.length === 0 || selectBox.value === 'nada'){
        paisElegido = "nada";
        txtInfo.innerHTML = "No hay seleccion";
        listCiudades.innerHTML = "No se encuentran Datos";
        return;
   }
};
function mostarSugerencia(selectPais) {
    var paisElegido = "";
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "listadoPaises.json", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let datos = JSON.parse(this.responseText);
            myvar = datos;
            if (selectPais === "espania") {
                paisElegido = "España";
                let findCountry = _.where(myvar.listadoPaises.pais, {"nombre": paisElegido});
                informacionPais(findCountry);
                return;
            } else if (selectPais === "mexico") {
                paisElegido = "México";
                let findCountry = _.where(myvar.listadoPaises.pais, {"nombre": paisElegido});
                informacionPais(findCountry);
                return;
            } else if (selectPais === "argentina") {
                paisElegido = "Argentina";
                let findCountry = _.where(myvar.listadoPaises.pais, {"nombre": paisElegido});
                informacionPais(findCountry);
                return;
            } else if (selectPais === "colombia") {
                paisElegido = "Colombia";
                let findCountry = _.where(myvar.listadoPaises.pais, {"nombre": paisElegido});
                informacionPais(findCountry);
                return;
            } else {
                paisElegido = "nada";
                txtInfo.innerHTML = "No hay seleccion";
                listCiudades.innerHTML = "No se encuentran Datos";
                return;
            }
        }
    };
};
function informacionPais(findCountry) {
    let contenidoAMostrar = "";
    let contenidoAMostrar2 = "";
    let options = "";
    for (i = 0; i < findCountry.length; i++) {
        listaC = `
            <p>La informacion del pais es</p>
            <ul>
                <li>Capital: ${findCountry[i].capital}</li>
                <li>Texto capital: ${findCountry[i].textoCapital}</li>
            </ul>
        `;
        for (a = 0; a < findCountry[i].ciudadImportante.length; a++){
            contenidoAMostrar = contenidoAMostrar + '<div id="ciudad' + i + '">';
            contenidoAMostrar += '<a href="https://es.wikipedia.org/wiki/'+ findCountry[i].ciudadImportante[a] + '" target="_blank">' + findCountry[i].ciudadImportante[a] + '</a></div>';
            contenidoAMostrar2 = '</br></br></br></br></br><select id="ciudades" onchange="printImg(this.value)">';
            options += `<option value="${findCountry[i].ciudadImportante[a]}">${findCountry[i].ciudadImportante[a]}</option>`;
            contenidoAMostrar2 += options;
            contenidoAMostrar2 += '</select>';   
        }
        txtInfo.innerHTML = '<p>'+findCountry[i].nombre+'</p>';
    }
    if (contenidoAMostrar) {
            listCiudades.innerHTML = listaC;
            listCiudades.innerHTML += contenidoAMostrar;
            listCiudades.innerHTML += contenidoAMostrar2;
    }
};

function printImg(pais) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && this.status === 200) {
           let imgJson = JSON.parse(this.responseText);
           imgItem = imgJson;
           console.log(imgItem);
           console.log(pais);
           for (i = 0; i < imgItem.capitales.length; i++){
                let nombreCapital = imgItem.capitales[i].nombre;
                let imagenComidaCap = imgItem.capitales[i].urlComida;
                let nomPlato = imgItem.capitales[i].Comida;
                if (nombreCapital === pais){
                    imagenCiudad.innerHTML =  `<p>La capital seleccionada es: ${nombreCapital} y el plato típico es: ${nomPlato}</p></br>  
                    <img src = "${imagenComidaCap}" alt = "alt" width="550px" height="450px" / >`;
                }
            };
        }
    };
    xhttp.open("GET", "listadoImagenesPais.json", true);
    xhttp.send();
};

