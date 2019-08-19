const db = require('./db/goblinshark-aws');
const resolvers = {};
 
resolvers.stateResolver = async (parent, args) => {
  const dosageQuery = 
  `SELECT SUM(dosage_unit) FROM county_annual 
  WHERE buyer_state = $1`

  const manufacturedQuery =
  `SELECT SUM(dosage_unit::decimal) FROM mastertable 
  WHERE dosage_unit ~ E'^\\\\d+.\\\\d+$'
  AND reporter_bus_act = 'MANUFACTURER' 
  AND buyer_state = $1`;

  // queries database for total_dosage on the state level
  const stateDosage = await db.query(dosageQuery, [args.state]);
  // queries database for total_manufactured pills on the state level
  const stateManufactured = await db.query(manufacturedQuery, [args.state]);
  console.log('stateManufactured: ', stateManufactured);

  // console.log('myData: ',  BigInt(myData.rows[0].sum));
    // return res.rows;

  return ({
    name: args.state,
    total_dosage: BigInt(stateDosage.rows[0].sum),
    total_manufactured: parseInt(stateManufactured.rows[0].sum),
    counties: [{
      name: 'Los Angeles',
      total_dosage: 14,
      total_manufactured: 1200
    }],
    year: {
      total_dosage: 100,
      total_manufactured: 8932,
      month: {
        total_dosage: 21,
        total_manufactured: 455,
      }
    },
    month: {
      total_dosage: 44,
      total_manufactured: 622,
    }
  })
};

resolvers.countyResolver = async (parent, args) => {
  const dosageQuery = 
  `SELECT SUM(dosage_unit) FROM county_annual 
   WHERE LOWER(buyer_county) = LOWER($1) 
   AND LOWER(buyer_state) = LOWER($2)`;
   
  const manufacturedQuery =
  `SELECT SUM(dosage_unit::decimal) FROM mastertable
  WHERE dosage_unit ~ E'^\\\\d+.\\\\d+$'
  AND reporter_bus_act = 'MANUFACTURER'
  AND LOWER(buyer_county) = LOWER($1)
  AND LOWER(buyer_state) = LOWER($2)`;

  const countyDosage = await db.query(dosageQuery, [args.county, parent.name]);
  const countyManufactured = await db.query(manufacturedQuery, [args.county, parent.name]);
  // need logic for total_manufactured for a single county

  return ({
    name: args.county,
    total_dosage: BigInt(countyDosage.rows[0].sum),
    total_manufactured: parseInt(countyManufactured.rows[0].sum)
  })
}

module.exports = resolvers;