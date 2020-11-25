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

  if (typeof(req.body) !== 'undefined'){

    const chatID = req.body.message.chat.id;
    const sentMessage = req.body.message.text;
    var parametro = null;

    if(sentMessage != null){
      var result = obtener(md5(parametro));

      if(result === null){
        res.status(404).send("No se encontró."); 
      }
      else{
        res.status(200).send(result);
      }
      
    }

  }
}

