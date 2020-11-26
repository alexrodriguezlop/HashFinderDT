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


// FunciĂłn principal manejadora de peticiĂłn
module.exports = async (req, res) => {

  if (typeof(req.body) !== 'undefined'){

    const chatID = req.body.message.chat.id;
    const sentMessage = req.body.message.text;
    
    console.log(req.body.message);
    
    if(sentMessage != null){
      console.log('A');
      var result = obtener(md5(sentMessage));
      console.log('B');
      if(result === null){
        console.log('C');
        //res.status(404).send("No se encontrĂł.");
        return {
          statusCode: 200,
          body: JSON.stringify({text: 'wewewewewewew', method: 'sendMessage', chat_id: chatID}),
          headers:{'Content-Type': 'application/json'}
        }    
      }
      else{
        console.log('E');
        //sendMessage" -d "chat_id=8*****2&text=prueba"
        return res.status(200).send({
          method: 'sendMessage',
          chat_id: chatID,
          text: 'dsdsdsdsdss',
          parse_mode: null
        })
      }
      
    }

  }
}
