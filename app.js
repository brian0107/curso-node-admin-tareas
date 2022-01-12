require("colors");
const { guardarDB, leerDB } = require("./db/guardarArchivo");
const {
  inquirerMenu,
  pausar,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  completarTareasChecklist,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    // Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu(); //Imprime el Menú y retorna la opcion seleccionada por el usuario.
    
    switch (opt) {
      case "1":
        // crear tarea
        const desc = await leerInput("Descripción: "); //Recibimos la desc de la tarea
        tareas.crearTarea(desc);
        break;

      case "2":
        // listar tareas
        tareas.listadoCompleto();
        break;

      case "3":
        // listar tareas completadas
        tareas.listarPendientesCompletadas();
        break;

      case "4":
        // listar tareas pendientes
        tareas.listarPendientesCompletadas(false);
        break;

      case "5":
        // Mostrar tareas checklist
        const ids = await completarTareasChecklist( tareas.listadoArr ); //Obtenemos un array con los ids de las tareas que queremos completar
        tareas.toggleTareasCompletadas(ids); //Completar/Pendiente
        break;

      case "6":
        // listar tareas borrar
        const id = await listadoTareasBorrar( tareas.listadoArr );
        if (id !== "0") {
          //Si selecciono una tarea
          const ok = await confirmar("¿Esta seguro?"); //Preguntar si esta seguro de borrar la tarea
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada correctamente".green);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr); //Actualiza la bd (Json) al finalizar una acción.

    await pausar(); // Agrega una pausa despues de realizar una acción para poder ver lo que hemos hecho.
  } while (opt !== "0"); //Mientras la opcion no sea salir seguimos mostrando el menu
};

main();
