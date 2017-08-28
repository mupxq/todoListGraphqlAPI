/**
 * Created by mupxq on 8/9/17.
 */
import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
} from 'graphql/type';

const responseMessageType = new GraphQLObjectType({
    name:"Response",
    description: "Response message",
    fields: () => ({
        todoListId: {
            type: GraphQLString,
            description: 'The id of object which is being acted',
            resolve: obj => obj.todoListId
        },
        status:{
            type: GraphQLString,
            description: 'The resulting status of action',
            resolve: obj => obj.status,
        },
        message:{
            type: GraphQLString,
            description: 'The response message of action',
            resolve: obj => obj.message,
        }
    })
});

export default responseMessageType