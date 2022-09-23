/*  Simulador --> Control de Temperatura Hogareño 
    ---------------------------------------------
    Funciona en dos franjas horarias:   06:00hs - 08:00hs   (al levantarse, corta cuando se sale al Trabajo, Colegio, etc.)
                                        16:30hs - 22:30hs   (al regresar del Trabajo, Colegio, etc.; hasta la hora de acostarse)
        Por una cuestión de simplificación, la hora se toma como Float (ej. 07:30hs --> 7.5 [hs])
    
    Parámetros que recibe:  Temp. Actual
                            Temp. Deseada
                            Hora Actual                     
                            
    Los ingresos son por medio de funciones que controlan los datos ingresados      */



/*  Clases  */
class tempProgramada {
    constructor(ambiente, tDeseada, hInicio, hFinal){
        this.ambiente = ambiente;
        this.tDeseada = tDeseada;
        this.hInicio = hInicio;
        this.hFinal = hFinal;
    }

    informacion(){
        alert('Ambiente: '+ this.ambiente + '.- Temp.Deseada: ' + this.tDeseada + '°C.- H.Inicio: ' + this.hInicio + 'hs.- H.Final: ' + this.hFinal + 'hs.');
    }
}

/*  Array de Temperaturas   */
tempAmbientes = [];

/*  Instancias (Objetos) de la Clase 'tempProgramada'    */
tempAmbientes.push(new tempProgramada('Habitacion', 28 , 6.00 , 7.00));

tempAmbientes.push(new tempProgramada('Living', 25 , 7.00 , 8.00));







/*  Funciones   */
function controlTemperatura(temperaturaActual, horaActual) {
    for(const amb of tempAmbientes){
        if(((horaActual >= amb.hInicio) && (horaActual <= amb.hFinal))) {
            if(temperaturaActual < amb.tDeseada){
                alert('Calentando el ambiente: ' + amb.ambiente);
            }else if(temperaturaActual > amb.tDeseada){
                alert('Enfriando el ambiente: ' + amb.ambiente);
            }else{
                alert(amb.ambiente + ' con la Temperatura en su punto justo...');
            }
            alert('Temperatura Controlada en Ambiente: ' + amb.ambiente);
        } else {
            alert('Horario Fuera de Control para el Ambiente: ' + amb.ambiente);
        }
    }
}

function ingresoTemperatura() {
    let temperatura = 0;
    
    do{
        temperatura = Number(prompt('Ingrese la Temperatura Actual (Mín: -20°C ; Máx: 60°C), por favor: '));
    }while((temperatura < -20) || (temperatura > 60));
    
    return temperatura;
}

function ingresoHora() {
    let hora = 0;

    do{
        hora = parseFloat(prompt('Ingrese una Hora en formato fraccionario (ej. 21:45hs --> 21.75 [hs]), por favor: '));
    }while((hora < 0) || (hora > 23.99));

    return hora;
}

/*  Ejecución Principal */
let cantidadMediciones = parseInt(prompt('Ingrese cuantas mediciones desea realizar: '));

for(let i=0; i < cantidadMediciones; i++){
    
    let tempActual = ingresoTemperatura();
    
    let hoActual = ingresoHora();

    controlTemperatura(tempActual, hoActual);
}

alert('Gracias por usar nuestro Sistema ;-)');