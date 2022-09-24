/*  Simulador --> Control de Temperatura Hogareño 
    ---------------------------------------------
    Funciona en dos franjas horarias:   06:00hs - 07:00hs   (Habitación: al levantarse, corta cuando se pasa al Living)
                                        16:30hs - 22:30hs   (Living: cuando se sale de la Habitación, corta al salir de casa.)
        Por una cuestión de simplificación, la hora se toma como Float (ej. 07:30hs --> 7.5 [hs])
    
    Parámetros que recibe:  Temp. Actual
                            Hora Actual
                            
                            (*) Temp. Deseada, lo saca del Array de Tempraturas Guardadas por Ambientes
                            
    Los ingresos son por medio de funciones que controlan los datos ingresados      */



/*  ----------
    | Clases |
    ----------  */
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

/*  Array de Temperaturas diferentes Ambientes  */
tempAmbientes = [];
/*  Instancias (Objetos) de la Clase 'tempProgramada'    */
tempAmbientes.push(new tempProgramada('Habitacion', 28 , 6.00 , 7.00));
tempAmbientes.push(new tempProgramada('Living', 25 , 7.00 , 8.00));

/*  Array que almacena el Consumo Energetico por Ambiente */
consAmbiente = [];

/*  -------------
    | Funciones |
    -------------   */
/*  Funcion que regula el ingreso de la Temperatura que sea algo acorde */
function ingresoTemperatura() {
    let temperatura = 0;
    
    do{
        temperatura = Number(prompt('Ingrese la Temperatura Actual (Mín: -20°C ; Máx: 60°C), por favor: '));
    }while((temperatura < -20) || (temperatura > 60));
    
    return temperatura;
}

/*  Funcion que regula el ingreso de una hora acorde    */
function ingresoHora() {
    let hora = 0;

    do{
        hora = parseFloat(prompt('Ingrese una Hora en formato fraccionario (ej. 21:45hs --> 21.75 [hs]), por favor: '));
    }while((hora < 0) || (hora > 23.99));

    return hora;
}

/*  Función Flecha --> calcula la diferencia de Temperaturas */
const dTemp = (may, men) => may - men; 

/* Funcion que controla la Temperatura Ambiente pasandoles como parámetros la hora y la temperatura*/
function controlTemperatura(temperaturaActual, horaActual) {
    for(const amb of tempAmbientes){
        if(((horaActual >= amb.hInicio) && (horaActual <= amb.hFinal))) {
            if(temperaturaActual < amb.tDeseada){
                alert('Calentando el ambiente: ' + amb.ambiente);
                consAmbiente.push( dTemp(amb.tDeseada, temperaturaActual) );
            }else if(temperaturaActual > amb.tDeseada){
                alert('Enfriando el ambiente: ' + amb.ambiente);
                consAmbiente.push( dTemp(temperaturaActual, amb.tDeseada) );
            }else{
                alert(amb.ambiente + ' con la Temperatura en su punto justo...');
            }
            alert('Temperatura Controlada en Ambiente: ' + amb.ambiente);
        } else {
            alert('Horario Fuera de Control para el Ambiente: ' + amb.ambiente);
        }
    }
}

/*  Funcion Anónima --> calcula el consumo total suponiendo que por cada °C se consume 1.27kW */
const consumoTotal = function(dt) {return dt * 1.27};


/*  -----------------------
    | Ejecución Principal |
    -----------------------  */
let cantidadMediciones = parseInt(prompt('Ingrese cuantas mediciones desea realizar: '));

for(let i=0; i < cantidadMediciones; i++){
    
    let tempActual = ingresoTemperatura();
    
    let hoActual = ingresoHora();

    controlTemperatura(tempActual, hoActual);
}

/*  Calculo el Consumo Total    */
const consumoParcial = consAmbiente.reduce( (acc, consumo) => acc + consumo, 0);
alert('Se consumieron ' + consumoTotal(consumoParcial) + ' kW en el proceso.');

alert('Gracias por usar nuestro Sistema ;-)');