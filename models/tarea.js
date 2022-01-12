const { v4: uuidv4 } = require("uuid"); //Libreria externa para generar Id unicos

class Tarea {
  constructor(desc) { 
    this.id = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    this.desc = desc;
    this.completadoEn = null;
  }
}

module.exports = Tarea;
