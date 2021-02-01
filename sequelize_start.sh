mysql --user="thiago" --password="123Mudar@" --database="movie_api" --execute="DROP DATABASE movie_api;"

yarn sequelize db:create
yarn sequelize db:migrate
yarn sequelize db:seed:all
