/**
 * Created by mupxq on 8/26/17.
 */
const {
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql/type');


let query = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'RootQueryType',
    fields: () => ({
        userQuery,
    })
});

let mutation = new GraphQLObjectType({
    name: 'mutation',
    description: 'mutation',
    fields: () => ({

    })
});

const Schema = new GraphQLSchema({
    query,
    mutation
});

export default Schema;