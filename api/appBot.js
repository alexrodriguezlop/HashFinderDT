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
  console.log( req.body.message);
  console.log( req.body.edited_message);

  var chatID, msgID, mensaje, telegramRes, cadena, arg, clave;
  
  if(req.body.message != undefined){
    chatID = req.body.message.chat.id;
    msgID = req.body.message.message_id;
    cadena = req.body.message.text;
  }
  else{
    if(req.body.edited_message != undefined){
      chatID = req.body.edited_message.chat.id;
      msgID = req.body.edited_message.message_id;
      cadena = req.body.edited_message.text;
    }
  }

  arg = cadena.slice(0, 7).toLowerCase();
  clave = cadena.slice(8, cadena.length); 
  

  switch(arg) {
    // /BUSCAR
    case '/buscar':
      if(clave != ''){
        var result = obtener(md5(clave));
  
        if(result === null){
          mensaje = '*Su mensaje no ha sido cifrado y por tanto no hay registros*';
        }
        else{
          mensaje = '*Fecha:* ' + result.fecha + ' *Hora:* ' + result.hora;
        }
      }
      else{
        mensaje = 'No ha introducido el texto a buscar';
      }
      break;
    // /HELP
    case '/help':
      mensaje = 'Para buscar usa la orden * /buscar* seguida del texto';
      break;
    // Otro caso    
    default:
      mensaje = 'Comando desconocido, use * /help*';
  }

  telegramRes = {
    text:mensaje, 
    method:"sendMessage", 
    chat_id:chatID, 
    reply_to_message_id: msgID, 
    parse_mode: 'Markdown'
  };

  res.setHeader("Content-Type","application/json");
  res.status(200).json(telegramRes);
}
