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


const token = process.env.BOT_TOKEN;

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Welcome')
});

//telegraf.handleUpdate(rawUpdate, [webhookResponse])
module.exports = async (req, res) => {
  telegraf.handleUpdate(ctx, res);
}