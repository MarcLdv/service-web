const { gql } = require('apollo-server');

const typeDefs = gql`
    type Slots {
        time: String
        date: String
    }

    type Query {
        availableSlots(date: String!, terrain: String!): [Slots]
    }
`;

module.exports = typeDefs;
