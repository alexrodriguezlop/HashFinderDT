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
module.exports = async (req, res) => {

  if (typeof(req.body) !== 'undefined'){

    const chatID = req.body.message.chat.id;
    const arg = req.body.message.text;
    
    var mensaje, status;
       
    if(arg != null && arg){
      var result = obtener(md5(arg));

      if(result === null){
        //Telegram espera un metodo, un identificador de chat y un mensaje.
        mensaje = '*Su mensaje no ha sido cifrado y por tanto no hay registros*';
        status = 400;

        //Vercel espera cabecera especificando tipo, status y body
        //res.setHeader("Content-Type","application/json");
        //res.status(400).json(telegramRes);
      }
      else{
        mensaje = '**Fecha:**' + result.fecha + ' **Hora:**' + result.hora;
        status = 200;
      }
    }
  }
  const telegramRes = {text:mensaje, method:"sendMessage", chat_id:chatID, reply_to_message_id: req.body.message.message_id, parse_mode: 'Markdown'};
 
  res.setHeader("Content-Type","application/json");
  res.status(status).json(telegramRes);
}
