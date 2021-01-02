module.exports = {
  scripts: {
    default: 'node index.js',
    server: {
      script: 'nodemon index.js',
      description: 'Express server with live reload which also connects to DB',
    },
    migrate: {
      script: 'sequelize db:migrate',
      description: 'Creates tables in the DB for the exisitng models',
      undo: {
        script: 'sequelize db:migrate:undo',
        description: 'Undo last migration',
        all: {
          script: 'sequelize db:migrate:undo:all',
          description: 'Undo all migrations. Deletes all the tables',
        },
      },
    },
    seed: {
      script: 'sequelize db:seed:all',
      description: 'Inserts default data into the tables',
      undo: {
        all: {
          script: 'sequelize db:seed:undo:all',
          description: 'Removes all the seeds that were inserted in the tables',
        },
      },
    },
  },
}
