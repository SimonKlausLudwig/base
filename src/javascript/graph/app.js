const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const app = express();

let employees = [
    { id: "1", firstname: "Ludwig", lastname: "Ludwig" },
    { id: "2", firstname: "Fritz", lastname: "Mustermann" },
]

const typeDefs = `

    type Employee {
        firstname: String!
        lastname: String!
        id: String!
    }

    type Query{
        employees: [Employee!]!
        employee(id: ID!): Employee
    }

    type Mutation {
        createEmployee(name: String!): Employee!
    }
`;
const resolvers = {
    Query: {
        employees: () => employees,
        employee: (parent, args) => employees.filter(a => a.id === args.id)[0]
    },
    Mutation: {
        createEmployee: (parent, args) => {
            const newEm = { id: "3", firstname: args.name, lastname: "Mu" };
            employees.push(newEm);
            return newEm;
        }
    }
};
let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();

app.listen(4000, function () {
    console.log(`server running on port 4000`);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
});