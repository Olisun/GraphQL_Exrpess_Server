// setting up express server
import express from 'express';
import expressGraphQL from 'express-graphql';
import schema from './schema';

const app = express();

// entry point for any client that wants to interact with graphql
app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}));

app.listen(8000, () => {
  console.log('Server up and running on port 8000');
});