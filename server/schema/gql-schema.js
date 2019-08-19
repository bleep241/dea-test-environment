const { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLList,
  GraphQLID,
  GraphQLFloat
} = require('graphql');
const db = require('../db/goblinshark-aws');
const resolvers = require('../resolvers');
const BigInt = require('graphql-bigint');
const StateType = require('../types/state-type');
const CountyType = require('../types/county-type');

// const StateType = new GraphQLObjectType({
//   name: 'State',
//   fields: () => ({
//     name: { type: GraphQLString },
//     total_dosage: { type: BigInt },
//     total_manufactured: { type: GraphQLInt },
//     counties: { type: new GraphQLList(CountyType) },
//     year: { type: YearInfoType },
//     month: { type: InfoType }
//   })
// });

// const CountyType = new GraphQLObjectType({
//   name: 'County',
//   fields: () => ({
//     name: { type: GraphQLString },
//     total_dosage: { type: GraphQLInt },
//     total_manufactured: { type: GraphQLInt }
//   })
// });

const YearInfoType = new GraphQLObjectType({
  name: 'YearInfo',
  fields: () => ({
    total_dosage: { type: GraphQLInt },
    total_manufactured: { type: GraphQLInt },
    month: { type: InfoType },
  })
});

const InfoType = new GraphQLObjectType({
  name: 'InfoType',
  fields: () => ({
    total_dosage: { type: GraphQLInt },
    total_manufactured: { type: GraphQLInt },
  })
}) 

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    state: {
      type: StateType,
      args: { state: { type: GraphQLString } },
      resolve(parent, args) {
        return resolvers.stateResolver(parent, args);
      }
    },
    county: {
      type: CountyType,
      args: { county: { type: GraphQLString } },
      resolve(parent, args) {
        return resolvers.countyResolver(parent, args);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
