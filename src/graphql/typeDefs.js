const { gql } = require('apollo-server');

const typeDefs = gql`
    type Slots {
        time: String
        isAvailable: Boolean
    }

    type Query {
        availableSlots(date: String!, terrain: String!): [Slots]
    }
`;

module.exports = typeDefs;
