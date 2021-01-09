# Bernard Consulting Task

This app is built on Express/Node in the backend and VueJS on the frontend. It is also using Sequelize ORM to do all the database queries.

## Get started

### Installing

To install the packages and specially NPS, run

```
npm install
```

Then cd into the client directory
to install the client side

```
npm install
```

You need to cd back after this for the rest of the steps.

### Database

Run the migrations and seeds all at once with

```
npm start populate
```

Or, you can run the migrations and seeds yourself. More about the scripts in the package-scripts.js file

### Running the dev server

You can run the frontend and backend together with

```
npm start dev
```

Or start server and client sides separately. More about the scripts in the package-scripts.js file

### Testing

You can test the endpoints of the app with

```
npm start test.watch
```

and the client side with

```
npm start client.test
```
