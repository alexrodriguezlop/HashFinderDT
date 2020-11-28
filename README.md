# HashFinderDT
Busca en una lista cuando se cifró el mensaje usando la función hash sobre el texto.

[Acceso al BOT @H20DTbot](https://t.me/H20DTbot)

#### Desarrollo:

**@BotFather**
El primer paso para crear nuestro bot se realiza con Telegram.
Haremos uso de **@BotFather**.
El será el encargado de guiarnos en la creación de nuestro bot usando la orden **/newbot**.

Nos solicitará que elijamos un nombre y un nombre de usuario para nuestro bot. 

![](img/A1.png)

Cuando terminemos este proceso **@BotFather** nos proporcionará el token de nuestro bot. 
**Importante** mantenerlo a salvo, ya que es la clave que nos permite el control sobre nuestro bot.

Posteriormente desde **@BotFather** podemos establecer otros parámetros de nuestro bot como la privacidad, la imagen del bot, la descripción, los comandos, etc.

![](img/A2.png)

![](img/A3.png)

#### Código:

Para llevar a cabo la comunicación necesitamos una serie de datos:

- **chatID:** Identifica el chat al que irá dirigida la respuesta.
- **msgID:** Identifica el mensaje dentro del chat al que estamos contestando.
- **cadena:** Extrae todo lo que el usuario a escrito desde el chat.
 	- **arg:** Comando extraído de cadena.
 	- **clave:** Clave extraída de cadena.

He encontrado problemas ante la posibilidad de que el usuario edite un mensaje, ya que en dicho caso el contenido de **req** cambia.
Con lo que para poder solventar dicha situación accedo a la información contenida en **req** con una ruta distinta dependiendo de si es o no un mensaje editado siguiendo la siguiente lógica:

```
if(req.body.message != undefined)
	req.body.message.message_id
else
	req.body.edited_message.message_id
	
```

Para determinar el comportamiento utilizo en switch case en el cual cada caso dependerá del argumento y generará un mensaje diferente que posteriormente será integrado en una estructura que será devuelta.


```
 switch(arg) {
    // /BUSCAR
    case '/buscar':
      if(clave != ''){
        var result = obtener(md5(clave));
  
        if(result === null){
          mensaje = '\u{2716} *Su mensaje no ha sido cifrado y por tanto no hay registros*';
        }
        else{
          mensaje = '\u{1F4C6} *Fecha:* ' + result.fecha + ' \u{231A} *Hora:* ' + result.hora;
        }
      }
      else{
        mensaje = '\u{1F605} *No ha introducido el texto a buscar!* ';
      }
      break;
    // /HELP
    case '/help':
      mensaje = '\u{1F50D} Para buscar use la orden */buscar* seguida del texto.  \u{27A1} *Ejemplo:* /buscar test';
      break;
    // Otro caso    
    default:
      mensaje = '\u{26A0} Comando desconocido, use */help*';
  }
```
Una vez ya ha sido generado el mensaje correspondiente a la acción del usuario generaremos una estructura que será interpretada por telegram:

```
  telegramRes = {
    text:mensaje, 
    method:"sendMessage", 
    chat_id:chatID, 
    reply_to_message_id: msgID, 
    parse_mode: 'Markdown'
  };

```
Dicha estructura contendrá:

- **text:** Contendrá el mensaje generado en función a la solicitud, es decir la respuesta. 
- **method:** Contendrá el método a utilizar por la api de telegram, en este caso **sendMessage**. 
- **chat_id:** Contendrá el identificador del chat al que va dirigida la respuesta. 
- **reply_to_message_id:** Contendrá el identificador del mensaje al que estamos respondiendo. 
- **parse_mode:** Contendrá la forma en que se debe interpretar el mensaje, en este caso **Markdown**.

La estructura será enviada como un objeto **JSON**.
Para ello debemos establecer el tipo en la cabecera:

`res.setHeader("Content-Type","application/json");`
  
 Posteriormente estableceremos el estado de la solicitud como 200 (Exitoso) y adjuntaremos el objeto json a **res**.
 En dicho caso usaremos `.json()` en lugar de `.send()`.
  
`res.status(200).json(telegramRes);`


Aquí podemos ver una captura del log donde se editaba un mensaje.
La captura muestra el contenido de dos rutas:
 `req.body.edited_message.message_id` y  `req.body.message.message_id`.
Se aprecia como una de ellas es indefinida.
El error se producía cuando se intentan extraer los datos de la ruta indefinida.

![](img/A4.png)

Para el uso de Emoji se ha usado esta [URL](https://apps.timwhitlock.info/emoji/tables/unicode)


#### Uso:

Ejemplo:
>Si ciframos el texto *supercalifragilisticoespialidoso* en algún momento, podremos saber posteriormente cuando se cifró proporcionando el texto exacto a la orden **/buscar**

> **/buscar** supercalifragilisticoespialidoso


**Ejemplo de uso:**

![](img/1.png)

![](img/2.png)

![](img/3.png)

![](img/4.png)

![](img/5.png)


