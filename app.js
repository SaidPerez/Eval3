require ('colors');
console.clear();

const {guardarBD, leerDB} = require ('./helpers/guardarArchivo');
//importacion de nuestros paquetes
//const{mostrarMenu, pausa} = require('./helpers/mensajes');
const{inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        mostrarListadoChecklist,
        confirmar} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

//async es una función asíncrona
const main = async()=>{
    let opt="";
    const tareas = new Tareas();

    // const tareasDB = leerDB();
    // if (tareasDB){
    //     //establecer las tareas
    //     tareas.crearTareaFromArray(tareasDB);
    // }

    do{
        //await esperamos que nos manden algo
        opt = await inquirerMenu();
        switch (opt){
            case '1':
                //crear opcion
                const desc= await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletados(true);
            break;
            case '4':
                tareas.listarPendientesCompletados(false);
            break;
            case '5':
                //completado | pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                //Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id!=='0'){
                    const ok = await confirmar('¿Está seguro?');
                    if (ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            break;

        }
        //await pausa();
        guardarBD(tareas.listadoArr);//nosotros guardamos en todo momento
    } while (opt!=='0');
    //pausa();
}

main();