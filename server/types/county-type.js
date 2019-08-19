const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const BigInt = require('graphql-bigint');

const CountyType = new GraphQLObjectType({
  name: 'County',
  fields: () => ({
    name: { type: GraphQLString },
    total_dosage: { type: BigInt },
    total_manufactured: { type: GraphQLInt }
  })
});

module.exports = CountyType;