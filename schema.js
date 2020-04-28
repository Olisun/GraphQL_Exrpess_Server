// bringing in graphql datatypes

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

// creating root query.  need root query otherwise the server won't run
const RootQuery = new GraphQLObjectType({
  // all obj types need a name
  name: 'RootQueryType',
  customer: {
    type: CustomerType
  }
})


module.exports = new GraphQLSchema({

});