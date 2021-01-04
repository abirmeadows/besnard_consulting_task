module.exports = {
  scripts: {
    default: 'node index.js',
    install: 'npm install && npm install --prefix client',
    server: {
      script: 'nodemon index.js',
      description: 'Express server with live reload which also connects to DB',
    },
    client: {
      script: 'npm run serve --prefix client',
      description: 'VueJS dev server',
    },
    dev: {
      script: 'concurrently "npm start server" "npm start client"',
      description: 'Runs both server and client together',
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
    populate: {
      script:
        'npm start migrate.undo.all && npm start migrate && npm start seed',
      description: 'Undo migrations, migrate and seed',
    },
    test: {
      script:
        'cross-env NODE_ENV=test npm start populate && jest --testTimeout=10000',
      description: 'Testing the endpoints',
      watch: {
        script:
          'cross-env NODE_ENV=test npm start populate && jest --watch --testTimeout=10000',
        description: 'Testing the endpoints with reload',
      },
    },
  },
}
