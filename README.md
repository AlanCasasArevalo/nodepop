# URL de AWS donde se encuentra la practica  
## DNS
ec2-34-201-200-155.compute-1.amazonaws.com

## IP publica
34.201.200.155

# Aplicacion Nodepop
Esta es una API para iOS/Android 

Instalar las dependencias de npm guardadas en el package.json
npm install

## Iniciar la aplicacion
Para iniciar la aplicacion se puede hacer de 2 modos:

npm start (Inicia directamente en modo cluster)

npm run dev (incluye nodemon y habria que tener instalado nodemon) 

## Configurar la aplicacion
Para configurar el puerto de la aplicacion modificar el archivo www dentro de la carpeta /bin.

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
Header Name (Authorization) Header Value (Bearer TokenRecibido en el registro)
           
o en la query string algo similar a esto en la url:

?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ......

## Registro de usuarios
### POST url/api/users/signup
Esta es la manera mediante la cual accedemos al registro de usuarios. Es necesario para registrarse:

name
email
password

Sin los 3 campos rellenos saltara un fallo similar a este:

{"message":"Error al crear el usuario ValidationError: password: Path `password` is required."}

En caso de que el usuario ya este creado saldra un error similar a este:
{"message":"Error al crear el usuario WriteError({\"code\":11000,\"index\":0,\"errmsg\":\"insertDocument :: caused by :: 11000 E11000 duplicate key error index: nodepop.users.$name_1  dup key: { : \\\"dum\\\" }\",\"op\":{\"name\":\"dum\",\"email\":\"test12@gmail.com\",\"password\":\"test1234\",\"_id\":\"59351e3807ae060540ad1d0b\",\"__v\":0}})"}

Si todo ha ido bien en el registro recibiremos el siguiente mensaje:
{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlhdCI6MTQ5NjY1MzQzMCwiZXhwIjoxNDk3ODYzMDMwfQ.QcCZfi-piYCiSp0MUKG3LmVM-s2T7WQ58t4C4Eomrus"}

## Entrada de usuarios registrados
### POST url/api/users/signin
Esta es la manera mediante la cual accedemos a entrada de usuarios registrados
Una vez registrado si accedemos con los mismos datos correctamente y el token que recibimos correcto nos dara el siguiente mensaje o similar:

{"message":"Te has logueado correctamente","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlhdCI6MTQ5NjY1MzQ4MCwiZXhwIjoxNDk3ODYzMDgwfQ.CEe_JgErl60fZvMAp9VU9OskylAHOej3FFBPziLWMGw"}

## Obtencion de anuncios 
### GET url/api/products
Para poder acceder a los productos publicados tienes que estar registrado y en caso de que este todo ok saldra un mensaje dandote todos los anuncios registrados hasta el momento. En caso contrario saldra un mensaje similar a este:

{
    success: false,
    message: "Como decia Gandalf:  NO PUEDES PASAR"
}

Podemos filtrar los productos mediante los siguientes filtros:
limit: {int}
sort: {string}
tag: {string}
sell: {bool}
price: {rango} muestra los productos en un rango de 0-10, 10-50, 50-....
name: {string}

Ejemplo de peticion /api/products?limit=2&sort=price&sell=true&name=iphone
Resultado de la peticion
{
    "success":true,
    "result":[
        {"_id":"593335fc79752f32554f7428",
        "name":"iphone",
        "sell":true,
        "price":150,"picture":"https://c1.staticflickr.com/6/5731/22026361156_2b01033daf_b.jpg",
        "__v":0,"tag":["mobile"]
        }
    ]
}




















