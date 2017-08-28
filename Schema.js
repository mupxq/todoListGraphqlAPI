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

import {
    todoList,
    todoListsQuery,
    createTodoList
} from './GraphQL/operation/todoListOperations'

let query = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'RootQueryType',
    fields: () => ({
        userQuery,
        todoListsQuery
    })
});

let mutation = new GraphQLObjectType({
    name: 'mutation',
    description: 'mutation',
    fields: () => ({
        signup,
        userLogin,
        todoList,
        createTodoList
    })
});

const Schema = new GraphQLSchema({
    query,
    mutation
});

export default Schema;