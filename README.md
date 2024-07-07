Push Notifications
Setup de Firebase
Una vez creado nuestro proyecto Ionic procedemos a crear el proyecto en Firebase.
Una vez aquí vamos a agregar Firebase a nuestro proyecto de Ionic. Presionamos en el icono de Android.
En esta nueva pantalla colocaremos nuestro AppId que lo encontraremos en el archivo capacitor.config.ts. Una vez hecho esto presionamos en Registrar App
Por último debemos descargar el archivo google-services.json y presionamos siguiente en el resto de pasos hasta volver a nuestra consola.
El archivo recientemente descargado lo vamos a agregar en nuestro proyecto en el lugar donde nos indica la imagen anterior dentro de android → app → google-services.json
-------------------------------------------------------------------
Setup de Ionic
Instalar el plugin de push notification para capacitor:
npm install @capacitor/push-notifications
Crear los listeners para las push notifications.
Consumir los endpoints de nuestra API para enviar push notifications.
-------------------------------------------------------------------
Configuracion de firebase functions
Ejecutae: firebase init functions
luego de seguir la configuracion, pegar el contenido de este repo en la carpeta /functions que se debería haber creado al ejecutar el comando anterior con exito.
-------------------------------------------------------------------
Configuración push notifications
Desde nuestro proyecto en firebase ir a Configuración → Configuración del proyecto → Cuentas de servicio → SDK de Firebase Admin → Hacer click en “Generar nueva clave privada”
Este archivo debemos guardarlo en el root de nuestro servidor y editar el archiv .env para que coincida con el nombre de este, con el siguiente formato:
SERVICE_ACCOUNT=./<archivo_clave_privada>.json
DATABASE_URL=https://<id_proyecto>.firebaseio.com
-------------------------------------------------------------------
Finalmente ejecutar el comando firebase deploy --only functions
Al terminar de ejecutarse correctamente, debería proveeerte del endpoint al cual deberás enviar tus request HTTP POST(/general y /directo), con el siguiente formato:
---Para '.../app/general'
{
     "title": "Pedido de cuenta.",
     "body": "El usuario anonimo está esperando para pagar, ha solicitado la cuenta",
     "role": "mozo"
 }

 ------------
 
Para '.../app/directo'
{
     "title": "Pedido de cuenta.",
     "body": "El usuario anonimo está esperando para pagar, ha solicitado la cuenta",
     "token": "EL_TOKEN_FCM"
 }
