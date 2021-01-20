var btn_agregar = document.getElementsByClassName("agregar");//Recojo la clase del botón agregar
var columna = document.getElementsByClassName("columna");//Recojo la clase columna
var fila_inventario = document.getElementsByClassName("fila");//Recojo la clase fila de tabla inventario
const tabla_factura = document.getElementById("factura");//Recojo el id de mi tabla factura
var btn_eliminar = document.getElementsByClassName("eliminar");//Recojo la clase del boton eliminar
var btn_productos_agregados = document.getElementById("producto");//Recojo el id del boton agregar productos
var btn_minus = document.getElementsByClassName("fa-minus");//Recojo la clase del boton -
var btn_plus = document.getElementsByClassName("fa-plus");//Recojo la clase del boton +
//Funcion para agregar productos a la tabla Factura
function agregar_factura() {

    this.disabled = true;//Desactivo el boton agregar que he oprimido 
    var columna_del_btn = this.parentNode;//Guardo el elemento padre del boton al que le he dado click y me saca <td>
    var fila = columna_del_btn.parentNode;//Guardo el elemento padre de la columna <td> con lo que me da un <tr>
    var elementos_fila = fila.childNodes;//Guardo los elementos hijo de la fila <tr>
    var cantidad_inventario = elementos_fila[7].textContent - 1;//Guardo la cantidad del elemento al que 
    //le di click que esta en la posicion 7 y le resto 1
    elementos_fila[7].textContent = cantidad_inventario;//Actualizo el valor de mi cantidad 
    var cantidad_factura = 0;//Creo una variable Cantidad Factura y la inicio en 0
    cantidad_factura++;//Cada que oprima un boton agregar se aumentara en uno este valor pero como 
    //solo se llama una vez en cada elemento dara 1
    //console.log(elementos_fila[1].textContent); Saca el código del elemento al que le di click ya que esta en la posición[1]
    //Si quisiera sacar el nombre del artículo seria el indice [3].    
    var fila_nueva = document.createElement("tr");//Me creo el elemento <tr> para una fila nueva
    for (var c = 0; c < elementos_fila.length; c++) {//Recorro los elementos de mi fila
        if (c == 1) {//si c llega al indice 1 quiere decir que en la tabla factura en esa posicion se va 
            //A colocar la siguiente columna en el elemento fila que hemos creado
            fila_nueva.innerHTML += '<td class="columna">' + elementos_fila[1].textContent + '</td>';
            //Se coloca en la columna el primer elemento de la tabla inventario que seria código en la fila
        }
        else if (c == 2) {
            fila_nueva.innerHTML += '<td class="columna">' + elementos_fila[3].textContent + '</td>';
            //Se coloca en la columna el segundo elemento de la tabla inventario que seria artículo en la fila

        }
        else if (c == 3) {
            fila_nueva.innerHTML += '<td class="columna">' + elementos_fila[5].textContent + '</td>';
            //Se coloca en la columna el segundo elemento de la tabla inventario que seria V/U en la fila
        }
        else if (c == 4) {
            fila_nueva.innerHTML += '<td class="columna"><i class="fa fa-minus"></i>' + cantidad_factura + '<i class="fa fa-plus"></i></td>';
            //Se coloca en la columna el icono de menor la variable cantidad_factura que sera 1 y el icono mayor
        }
        else if (c == 5) {
            fila_nueva.innerHTML += '<td class="columna"><button class="eliminar">Eliminar</button></td>';
            //Coloco un boton en la columna llamado eliminar 
        }
        //Lo que hace fila_nueva es agregar dentro de esa fila todas las columnas que hemos creado con su
        //Respectivo contenido

    }
    tabla_factura.appendChild(fila_nueva);//En la variable tabla_factura ponemos dentro la fila que hemos creado
    //Recorro los botones eliminar para saber cual ha sido clickeado y realizar el evento de borrar fila
    for (var b = 0; b < btn_eliminar.length; b++) {
        btn_eliminar[b].addEventListener("click", eliminarfila);//evento click a un determinado boton eliminar 
        //y le digo que debe hacer llamando la funcion      

    }
    //Recorro los botones que tengas la clase fa-minus que ya guarde en una variable
    for (var menos = 0; menos < btn_minus.length; menos++) {

        btn_minus[menos].addEventListener("click", botonmenos);//Al que haya sido clickeado le ponemos
        //un evento click y una funcionalidad llamando a la funcion

    }
    //Recorro los botones que tengas la clase fa-plus que ya guarde en una variable
    for (var mas = 0; mas < btn_plus.length; mas++) {

        btn_plus[mas].addEventListener("click", botonmas)//Al que haya sido clickeado le ponemos
        //un evento click y una funcionalidad llamando a la funcion

    }
}

//Recorre el boton agregar y al boton que le haya dado click escucha un evento y realiza una función
for (var i = 0; i < btn_agregar.length; i++) {
    btn_agregar[i].addEventListener("click", agregar_factura);

}
//Funcion que me elimina la fila segun alla oprimido cualquier boton eliminar
function eliminarfila() {
    var columna_btn_eliminar = this.parentNode;//En este caso guardo el elemento padre 
    //del boton eliminar que dimos click o sea la columna
    var fila_btn_eliminar = columna_btn_eliminar.parentNode;//Guardo la fila de la columna
    var elt_fila = fila_btn_eliminar.childNodes;//Guardo los elementos hijo de mi fila
    var codigo = parseInt(elt_fila[0].childNodes[0].textContent);//Descubro cual es el codigo del elemento del 
    //boton al que le di click de la tabla factura
    
    for (var f = 1; f < fila_inventario.length; f++) {//Recorro las filas de la tabla inventario
        var codigo_inventario = parseInt(fila_inventario[f].childNodes[1].childNodes[0].textContent);//Me
        //Recorre todos los codigos de mi tabla inventario 
        if (codigo === codigo_inventario) {//y cuando verifique que uno de esos codigos sea igual
            //a uno de los codigos de mi tabla inventario va a realizar lo siguiente
            var cant_fac = parseInt(elt_fila[3].childNodes[1].textContent);//Guardo la cantidad que este
            //almacenada en la tabla factura
            //console.log(cant_fac);
            var cant_inve = parseInt(fila_inventario[f].childNodes[7].childNodes[0].textContent);//Ahora entro 
            //a la cantidad que hay en mi tabla inventario
            //console.log(cant_inve);
            var resultado_cant = cant_fac + cant_inve;//Y como vamos a eliminar este articulo tenemos que saber 
            //cual es la cantidad que hay en la tabla tanto la de inventario como factura y sumarla 
            fila_inventario[f].childNodes[7].childNodes[0].textContent = resultado_cant;//Ese resultado de esa suma
            //La coloco en la tabla inventario ya que no vamos a ser la compra de ese artículo
            fila_btn_eliminar.remove();//Finalmente que tenemos que quitar la fila del boton que hemos dado click
            //ya que precisamente esto es lo que queremos conseguir con esta función
            fila_inventario[f].childNodes[9].childNodes[0].disabled = false;//Y como en la funcion agregar_factura 
            //colocamos que ese boton que fue clickeado lo desabilite ahora lo que hacemos es habilitarlo ya que 
            //ya no se encuentra en la tabla factura
        }

    }
}
//Funcion del boton menos, resta cantidad de tabla factura y aumenta cantidad tabla inventario
function botonmenos() {
    var col_btn_menos = this.parentNode;//El elemento padre de el boton menos al que dimos click es decir la columna
    var fila_btn_menos = col_btn_menos.parentNode;//Ahora que tenemos la columna sacamos su elemento padre es decir la fila
    var num_codigo = parseInt(fila_btn_menos.childNodes[0].childNodes[0].textContent);////Descubro
    //el codigo de la tabla factura dependiendo del boton - al que haya dado click

    for (var f_f = 1; f_f < fila_inventario.length; f_f++) {//Recorro las filas de la tabla inventario

        var cod_inv = parseInt(fila_inventario[f_f].childNodes[1].childNodes[0].textContent);//saco los codigos
        //de la tabla inventario
        if (num_codigo === cod_inv) {//y hasta que coincida el codigo de la tabla factura sea el mismo que 
            //uno de los codigos que hace en el recorrido de la tabla inventario me hace lo siguiente
            var cant_fact = parseInt(col_btn_menos.childNodes[1].textContent);//Guardo la cantidad de mi
            //tabla factura
            //console.log(cant_fact);//cuando ejecute el boton menos la cantidad por defecto sera de 1 por 
            //eso en la condicion pongo menor a 2 
            if (cant_fact < 2) {//si esa cantidad es menor a 1 no puede ya que el articulo que vaya a comprar 
                //tiene que tener como minimo una cantidad de 1 
                alert("La cantidad debe ser mayor a 0");//Muestro alerta para avisar que no puede 
                //descontar un articulo menor a 1
            } else {//Pero si la cantidad en mi tabla factura es mayor a 1 entonces yo quiero que 
                //se reste esta cantidad y que de ese articulo en mi tabla inventario se vaya sumando
                cant_fact = parseInt(col_btn_menos.childNodes[1].textContent)-1;//Recojo la cantidad que
                //se encuentra en la tabla factura y le resto 1
                col_btn_menos.childNodes[1].textContent = cant_fact;//Aca lo muestro
                var inv_cant = parseInt(fila_inventario[f_f].childNodes[7].childNodes[0].textContent) + 1;//y
                //que en mi tabla inventario se vaya sumando esta cantidad
                fila_inventario[f_f].childNodes[7].childNodes[0].textContent = inv_cant;//y lo muestro en la 
                //posicion de mi tabla inventario
            }
        }
    }


}
//Función del boton mas, suman cantidad de tabla factura y disminuye cantidad tabla inventario
function botonmas() {
    var col_btn_mas = this.parentNode;//El elemento padre de el boton mas al que dimos click es decir la columna
    var fila_btn_mas = col_btn_mas.parentNode;//El elemento padre de esa columna es decir la fila
    var cod = parseInt(fila_btn_mas.childNodes[0].childNodes[0].textContent);//Ahora guardo el codigo que tiene
    //el boton al que le di el icono +
    
    for (var fil_inv = 1; fil_inv < fila_inventario.length; fil_inv++) {//Recorro las filas de la tabla inventario
        var inv_cod = parseInt(fila_inventario[fil_inv].childNodes[1].childNodes[0].textContent);//saco 
        //los codigos de la tabla inventario
        if (cod === inv_cod) {//si el numero del codigo que saque de mi tabla factura coincide con un numero
            //de codigo de mi tabla inventario entonces hare lo siguiente
            var ct_in=parseInt(fila_inventario[fil_inv].childNodes[7].childNodes[0].textContent);//Localizo
            //la cantidad de mi tabla inventario para ese codigo
            if(ct_in<=0){//Pero si ese numero llega hacer 0 o menor eso me quiere decir que ya no cuento con 
                //suficientes insumos de ese articulo y ya no me quedan mas en mi inventario
                alert("Lo sentimos, producto Agotado");//Muestro la alerta
                
            }else{//Pero si cuento con mas cantidad de ese articulo 
                ct_in=parseInt(fila_inventario[fil_inv].childNodes[7].childNodes[0].textContent)-1;//A la cantidad
                //de mi inventario le voy disminuyendo de a 1
                fila_inventario[fil_inv].childNodes[7].childNodes[0].textContent=ct_in;//Y lo muestro en la posicion
                //en la que se encuentra ubicado
                var c_f=parseInt(fila_btn_mas.childNodes[3].childNodes[1].textContent)+1;//Y la cantidad de
                //la tabla factura va ir aumentado en 1 ya que eso queremos
                fila_btn_mas.childNodes[3].childNodes[1].textContent=c_f;//y lo muestro en la posición de la 
                //cantidad de mi tabla factura

            }
            
        }
    }
}
//Al boton agregar productos le agrego un evento de tipo click y una funcionalidad
btn_productos_agregados.addEventListener("click", function () {
    //Si la tabla no tiene filas
    if (tabla_factura.childNodes.length < 3) {
        //Quiere decir que no hay al menos un producto agregado
        alert("No has agregado productos por favor agrega productos");
    } else {
        //Si hay por lo menos una fila o sea al menos un producto para hacer la compra
        alert("Productos agregados correctamente");
    }

});


