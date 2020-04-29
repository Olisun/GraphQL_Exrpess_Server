// bringing in graphql datatypes
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

// hardcoded static data
const customers = [
  {
    id: '1',
    name: 'Oliver Sun',
    email: 'olisun@mac.com',
    age: 48
  },
  {
    id: '2',
    name: 'Taylor Sun',
    email: 'taylor@n@mac.com',
    age: 10
  },
  {
    id: '3',
    name: 'Crazy Kitty',
    email: 'crazy@mac.com',
    age: 9
  },
  {
    id: '4',
    name: 'User User',
    email: 'usern@mac.com',
    age: 22
  }
]

// customer type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

// creating root query.  need root query otherwise the server won't run
const RootQuery = new GraphQLObjectType({
  // all obj types need a name
  name: 'RootQueryType',
  // customer needs to be wrapped in a fields object
  fields: {
    // getting one customer by id 
    customer: {
      type: CustomerType,
      // to fetch the data with the id
      args: {
        id: { type: GraphQLString }
      },
      // resolve function fetching the data. looping through the customers array to find the id
      resolve(parentValue, args) {
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id === args.id) {
            // hit the database
            return customers[i];
          }
        }
      }
    },
    // getting all customers
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return customers;
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});