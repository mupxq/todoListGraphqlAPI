/**
 * Created by mupxq on 8/27/17.
 */
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql/type');

const TodoListItemType = new GraphQLObjectType({
    name: 'TodoListItem',
    description: 'todo list item',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'The id of the todo List item',
            resolve: obj => obj.id
        },
        text: {
            type: GraphQLString,
            description: 'The todo list item text',
            resolve: obj => obj.text
        },
        completed: {
            type: GraphQLBoolean,
            description: 'completed status of todo list item',
            resolve: obj => obj.completed
        }
    })
});


const TodoListType = new GraphQLObjectType({
    name: 'TodoList',
    description: 'todo list',
    fields: () => ({
        listId: {
            type: GraphQLString,
            description: 'The id of the todo List',
            resolve: obj => obj._id
        },
        todoList: {
            type: new GraphQLList(TodoListItemType),
            description: 'The todo list',
            resolve: obj => obj.todoList

        }
    })
});

export default TodoListType;