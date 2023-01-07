const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {dbConnect} = require('./db');
const schema = require('./graphql/schema');
const authorization = require('./middlewares/auth');

dbConnect()
const app = express();

app.use(authorization)

app.get('/', (req, res) => {
  res.send("welcome 🙃"); 
});

app.use('/gql', graphqlHTTP({
  schema,
  graphiql: true, 
}))

app.listen(3000,()=> console.log("server on"))