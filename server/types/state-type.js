const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const resolvers = require('../resolvers');
const CountyType = require('./county-type');
const BigInt = require('graphql-bigint');

const StateType = new GraphQLObjectType({
  name: 'State',
  fields: () => ({
    name: { type: GraphQLString },
    total_dosage: { type: BigInt },
    total_manufactured: { type: GraphQLInt },
    counties: { 
      type: CountyType,
      args: { county: { type: GraphQLString } },
      resolve(parent, args) {
        return resolvers.countyResolver(parent, args);
      }
    },
    // year: { type: YearInfoType },
    // month: { type: InfoType }
  }),
});

module.exports = StateType;