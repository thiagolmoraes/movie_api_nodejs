# API MOVIES

A Api permite que você adicione, busque e avalie filmes.

#### Ferramentas Utilizadas

 - ExpressJS
 - Sequelize
 - JWT
 - MySQL
 - Eslint

 
#### Como instalar

A Aplicação vou desenvolvida utilizando *MySQL*, você pode usar um container caso não o tenha e não queira baixar.

`docker run -d --name mysql_container -e MYSQL_USER='thiago' -e MYSQL_ROOT_PASSWORD='123Mudar@' -e MYSQL_PASSWORD='123Mudar@' -p 3306:3306 mysql:8`

Caso fizer alguma alteração as configurações do banco de dados estão localizados na pasta ``` src/config/database.js```.

Depois execute 

```
yarn install
$ ./sequelize_start.sh
yarn run dev
```

### Como usar

Ao iniciar a applicação são criados 5 usuários para testes, todos com a senha `123mudar`, são eles: `admin, user1, user2, user3, user4`.

Usando ferramentas como cURL, Postman ou Insomnia, você pode realizar as requisições para API

`POST: http://localhost:3333/api/login`

`{
	"username":"user2",
	"password":"123mudar"
}`

Resposta: 

`{
  "message": "User has been authenticated!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ1c2VyMiIsInBhc3N3b3JkIjoiJDJiJDEwJC5CdjVwL2RobjZ6eWZnM3NHWWR4N3VZQUEvNkk4NEZhQ29ldGNaOVRhVTR5Nm52YkV3bzUuIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MTIxNjEyNzksImV4cCI6MTYxMjI0NzY3OX0.2bldwg3FA3fsfrtL2lRxQgJNzASsPzVyYiRcOuSO7eM"
}`

#### Importe o arquivo para o Postman e Insomnia e teste o restante das funcionalidade. :smile:	
