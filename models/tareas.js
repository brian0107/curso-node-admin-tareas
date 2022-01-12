require("colors");
const Tarea = require("./tarea");

class Tareas {
  constructor() {
    this._listado = {}; //El listado que almacenara las tareas es un objeto ya que a diferencia de un array tenemos la ventaja de acceder directamente a la propiedad que nos interesa de esta manera:  this._listado['propiedad];
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
  crearTarea(desc = "") {
    const tarea = new Tarea(desc); //Creamos un objeto tarea
    this._listado[tarea.id] = tarea; // Establecemos la tarea en el listado. Agregamos una propiedad unica a nuestro objeto listado (id tarea) y su valor será la tarea.
  }

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {//Object.keys() devuelve un array de strings con todas las llaves existentes en un objeto.
      const tarea = this._listado[key];
      listado.push(tarea); //Agregamos cada tarea en el array
    });

    return listado; //Retornamos un array con todas las tareas del listado
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto() {
    console.log(); //Espacio
    this.listadoArr.forEach((tarea, index) => {
      const idx = `${index + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      console.log(`${idx} ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log(); //Espacio
    let contador = 0;
    this.listadoArr.forEach((tarea, index) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? completadoEn.green : "Pendiente".red;

      if (completadas) {
        // Mostrar completadas
        if (completadoEn) {
          console.log(`${(++contador + ".").green} ${desc} :: ${estado}`);
        }
      } else {
        // Mostrar pendientes
        if (!completadoEn) {
          console.log(`${(++contador + ".").green} ${desc} :: ${estado}`);
        }
      }
    });
  }
  toggleTareasCompletadas(ids = []) {
    //COMPLETAR LAS TAREAS
    ids.forEach((id) => {
      const tarea = this._listado[id]; //Obtenemos cada tarea del listado cuyo id se encuentre en nuestro arreglo de ids.
      if (!tarea.completadoEn) {
        //Si la tarea no estaba completada
        tarea.completadoEn = new Date().toISOString(); //La completamos
      }
    });

    //DEJAR PENDIENTES LAS TAREAS
    this.listadoArr.forEach((tarea) => {
      const { id } = tarea; // Obtenemos el id de cada tarea del listado
      if (!ids.includes(id)) { // Si una tarea del listado no se encuentra en el array de ids.
        this._listado[id].completadoEn = null; //La marcamos como pendiente
      }
    });
  }
}

module.exports = Tareas;
