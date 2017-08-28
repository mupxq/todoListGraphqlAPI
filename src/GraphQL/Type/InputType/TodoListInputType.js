/**
 * Created by mupxq on 8/27/17.
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
    GraphQLInputObjectType
} from 'graphql/type';

const TodoListInputType = new GraphQLInputObjectType({
    name: 'todoListInputType',
    description: 'todo List input',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: "the id of todo list item",
        },
        text: {
            type: GraphQLString,
            description: "the text of todo list item",
        },
        completed: {
            type: GraphQLBoolean,
            description: "the completed status of todo list item"
        },

    })
});

export default TodoListInputType;