const fs = require("fs");
const archivo = "./db/data.json";

const guardarDB = (data) => { // Convierte nuestro array de tareas a json y lo guarda en un archivo.json
  fs.writeFileSync(archivo, JSON.stringify(data)); //El método stringify() convierte los datos de JavaScript en una cadena con formato JSON. Por lo general, se aplica a los objetos JS para producir una cadena JSON lista para enviar al servidor. Sugerencia: puede usar JSON. parse() para convertir una cadena JSON nuevamente en un objeto JavaScript.
};

const leerDB = () => { // Leemos el archivo.json y obtenemos nuestro array de tareas.
  if (!fs.existsSync(archivo)) {//El método existeSync() se usa para verificar de forma sincrónica si un archivo ya existe en la ruta dada o no.
    return null;
  }
  const info = fs.readFileSync(archivo, { encoding: "utf-8" }); //El método fs.readFileSync() se utiliza para leer el archivo y devolver su contenido. Recibe el archivo a leer y el tipo de encoding (utf-8) para que muestre los datos en español.
  const data = JSON.parse( info ); // JSON.parse() y analiza los datos json y retorna el objeto que se corresponde con el texto JSON entregado.
  return data; // Retrona un array de taras
};


module.exports = {
  guardarDB,
  leerDB,
};
