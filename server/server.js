const express = require('express');
const db = require("./db/goblinshark-aws.js");
const app = express();
const graphqlHTTP = require('express-graphql');
const myGraphQLSchema = require('./schema/gql-schema');
// require('dotenv').config();

app.use('/graphql', graphqlHTTP({
  schema: myGraphQLSchema,
  graphiql: true
}));


app.listen(4000, () => {
  console.log('Server is listening in port 4000...');
});