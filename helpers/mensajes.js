require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("======================".green);
    console.log("Seleccione una opcion".green);
    console.log("======================\n".green);

    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar tarea`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"5.".green} Completar tarea(s)`);
    console.log(`${"6.".green} Borrar tarea`);
    console.log(`${"0.".green} Salir\n`);

    //Crear interfaz
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Leer entrada del usaurio
    readline.question("Seleccione una opción: ", (opcionSeleccionada) => {
      readline.close();
      resolve(opcionSeleccionada);
    });

  });

}

const pausa = () => {
  return new Promise((resolve) => {
    //Crear interfaz
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    // Leer entrada del usaurio
    readline.question(
      `\nPresione ${"ENTER".green} para continuar\n`,
      (opcionSeleccionada) => {
        readline.close();
        resolve();
      });
  });
}

module.exports = {
  mostrarMenu,
  pausa
};
