


// Función principal manejadora de petición
module.exports = async (req, res) => {
  console.log('Versión');
  console.log(req.body);

  if(req.body.message != undefined){
    const chatID = req.body.message.chat.id;
    const msgID = req.body.message.message_id;

    var mensaje = 'Probando';

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

}