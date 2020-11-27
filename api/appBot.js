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
  console.log('Versión');
  console.log(req.body);

  if(req.body.message != undefined){
    const chatID = req.body.message.chat.id;
    const msgID = req.body.message.message_id;
    const cadena = req.body.message.text;
    const arg = cadena.slice(0, 7).toLowerCase();
    const clave = cadena.slice(7, cadena.length); 
    var mensaje = '';

    console.log(req.body.message);
    console.log(arg);
    console.log(clave);

    console.log(req.body.message);





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
  res.status(200);
}