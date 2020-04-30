const axios = require('axios');

// bringing in graphql datatypes
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

// customer type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  })
});

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
      // resolve function fetching the data
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data)
      }
    },
    // getting all customers
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/customers`)
          .then(res => res.data);
      }
    }
  }
});

// Mutations for creating, updating and deleting
const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },  // <-- NNM makes it required
        email: { type: new GraphQLNonNull(GraphQLString) },  // <-- NNM makes it required
        age: { type: new GraphQLNonNull(GraphQLInt) },  // <-- NNM makes it required
      },
      resolve(parentValue, args) {
        return axios.post('http://localhost:3000/customers', {
          // passing these as the 2nd argument to the post function
          name: args.name,
          email: args.email,
          age: args.age
        })
          .then(res => res.data);
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return axios.delete(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data);
      }
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return axios.patch(`http://localhost:3000/customers/${args.id}`, args)
          .then(res => res.data);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});