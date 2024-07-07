<h3>Push Notifications</h3><br>
<h5>Setup de Firebase</h5><br>
Una vez creado nuestro proyecto Ionic procedemos a crear el proyecto en Firebase.<br>
Una vez aquí vamos a agregar Firebase a nuestro proyecto de Ionic. Presionamos en el icono de Android.<br>
En esta nueva pantalla colocaremos nuestro AppId que lo encontraremos en el archivo capacitor.config.ts. Una vez hecho esto presionamos en Registrar App<br>
Por último debemos descargar el archivo google-services.json y presionamos siguiente en el resto de pasos hasta volver a nuestra consola.<br>
El archivo recientemente descargado lo vamos a agregar en nuestro proyecto en el lugar donde nos indica la imagen anterior dentro de android → app → google-services.json<br>
-------------------------------------------------------------------<br>
<h5>Setup de Ionic</h5><br>
Instalar el plugin de push notification para capacitor:<br>
npm install @capacitor/push-notifications<br>
Crear los listeners para las push notifications.<br>
Consumir los endpoints de nuestra API para enviar push notifications.<br>
-------------------------------------------------------------------<br>
<h5>Configuracion de firebase functions</h5><br>
Ejecutae: firebase init functions<br>
luego de seguir la configuracion, pegar el contenido de este repo en la carpeta /functions que se debería haber creado al ejecutar el comando anterior con exito.<br>
-------------------------------------------------------------------<br>
<h5>Configuración push notifications</h5><br>
Desde nuestro proyecto en firebase ir a Configuración → Configuración del proyecto → Cuentas de servicio → SDK de Firebase Admin → Hacer click en “Generar nueva clave privada”<br>
Este archivo debemos guardarlo en el root de nuestro servidor y editar el archiv .env para que coincida con el nombre de este, con el siguiente formato:<br>
SERVICE_ACCOUNT=./<archivo_clave_privada>.json<br>
DATABASE_URL=https://<id_proyecto>.firebaseio.com<br>
-------------------------------------------------------------------<br>
Finalmente ejecutar el comando firebase deploy --only functions<br>
Al terminar de ejecutarse correctamente, debería proveeerte del endpoint al cual deberás enviar tus request HTTP POST(/general y /directo), con el siguiente formato:<br>
---Para '.../app/general'<br>
{<br>
     "title": "Pedido de cuenta.",<br>
     "body": "El usuario anonimo está esperando para pagar, ha solicitado la cuenta",<br>
     "role": "mozo"<br>
 }<br>
<br>
 ------------<br>
 <br>
Para '.../app/directo'<br>
{<br>
     "title": "Pedido de cuenta.",<br>
     "body": "El usuario anonimo está esperando para pagar, ha solicitado la cuenta",<br>
     "token": "EL_TOKEN_FCM"<br>
 }<br>
<br>
