const data = require("../data/data.json" )
const  md5 = require('md5');


// Extrae una tupla del fichero JSON a partir de una clave hash 
function obtener(valor){
  var result = null;

  for(var i = 0; i < data.lista.length; i++){
    if(data.lista[i].hash === valor)
     result = data.lista[i];
  }
  return result;
}




// Función principal manejadora de petición
module.exports = (req, res) => {
  //var parametro = location.search.split('msg=')[1]
  
  //Captamos el parámetro
  //const { parametro = null } = req.query["msg"];
  var parametro = req.query["msg"];

  if(parametro != null){
    result = obtener(md5(parametro));
    
    if(result != null)
      res.status(404).send("No se encontró."); 
      
    res.status(200).send(result)  
  }
  else {
    res.status(400).send('Formato incorrecto, PRUEBE:?msg="test".');
  }
}

