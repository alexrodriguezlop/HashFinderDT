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

    console.log('B' + req.body.edited_message);
    const chatID = req.body.edited_message.chat.id;
    const msgID = req.body.edited_message.message_id;

    var mensaje = '';

    const telegramRes = {
      text:mensaje, 
      method:"sendMessage", 
      chat_id:chatID, 
      reply_to_message_id: msgID, 
      parse_mode: 'Markdown'
    };

    res.setHeader("Content-Type","application/json");
    res.status(200).json(telegramRes);
}