/**
 * Created by mupxq on 8/26/17.
 */
import{
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql/type';

import {
    userQuery,
    signup,
    userLogin
} from './GraphQL/operation/userOperations';

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
        signup,
        userLogin
    })
});

const Schema = new GraphQLSchema({
    query,
    mutation
});

export default Schema;