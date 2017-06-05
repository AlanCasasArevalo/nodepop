# Aplicacion Nodepop
Esta es una API para iOS/Android 

###Instalar las dependencias de npm guardadas en el package.json
npm install

## Iniciar la aplicacion
Para iniciar la aplicacion se puede hacer de 2 modos:
npm start (Inicia directamente en modo cluster)

npm run dev (incluye nodemon y habria que tener instalado nodemon) 

## Configurar la aplicacion
Para configurar el puerto de la aplicacion modificar el archivo www dentro de la carpeta /bin 
Para configurar la conexion a la base de datos modificar el archvio connectMongoose.js en la carpeta /lib

## Configurar seguridad
Esta aplicacion usa para sus usuarios la seguridad JWT, lo que implica que para entrar en la aplicacion y poder usarla tiene que registrarse previamente. Para entrar en dicho registro hemos de acceder mediante la url/api/users/signup
Recibiremos un token en la respuesta del servidor en modo json:
{
    "token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTQ5NjY0OTA4MCwiZXhwIjoxNDk3ODU4NjgwfQ._w12Re6i22P44CHXjpGqU8aZrTMr0YiQjrmAul8biKg"
}
Para entrar una vez registrados url/api/users/signin

En la cabecera de la peticion hemos de pasar la autorizacion de este modo:
Headers
Header Name             Header Value
Authorization           Bearer TokenRecibido en el registro
o en la query string algo similar a esto en la url:
?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ......

## Registro de usuarios
### POST /api/users/signup




