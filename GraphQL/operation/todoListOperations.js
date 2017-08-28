/**
 * Created by mupxq on 8/27/17.
 */
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql/type');

//import the todoList model
import TodoList from '../../models/todoListModel'

//import the todoList type
import TodoListType from '../Type/objectType/todoListType'
import TodoListInputType from '../Type/InputType/TodoListInputType'
import ReponseMessageType from '../Type/objectType/reponseMessageType'

export const todoListsQuery = {
    type: new GraphQLList(TodoListType),
    description: "get user's all the todo List",
    resolve: (obj, args, source, fieldASTs) => {
        let res = new Promise((resolve, reject) => {
            let _user = fieldASTs.rootValue.session.user;
            TodoList.find({userEmail: _user.userEmail}, (err, doc) => {
                err ? reject(err) : resolve(doc);
            });
        });
        return res;
    }
};

export const todoList = {
    type: TodoListType,
    description: "get user's all the todo List",
    args: {
        todoListId: {
            name: 'The id of todo list',
            type: GraphQLString,
        }
    },
    resolve: (obj, args, source, fieldASTs) => {
        let res = new Promise((resolve, reject) => {
            let _user = fieldASTs.rootValue.session.user;
            TodoList.findOne({userEmail: _user.userEmail, _id: args.todoListId}, (err, doc) => {
                err ? reject(err) : resolve(doc);
            });
        });
        return res;
    }
};

export const createTodoList = {
    type: TodoListType,
    description: "create new todo list",
    args: {
        todoList: {
            name: 'The id of todo list',
            type: new GraphQLList(TodoListInputType),
        }
    },
    resolve: (obj, args, source, fieldASTs) => {
        let res = new Promise((resolve, reject) => {
            let _user = fieldASTs.rootValue.session.user;
            let todoList = {
                todoList: args.todoList
            };

            let newTodoList = new TodoList(todoList);
            newTodoList.save((err, doc) => {
                if (err){
                    reject(err)
                }
                if (doc){
                    resolve(doc)
                }
            })

        });
        return res;
    }
};

export const updateTodoList = {
    type: TodoListType,
    description: "update todo list",
    args: {
        todoListId: {
            name: 'todoListId',
            type: GraphQLString
        },
        todoList: {
            name: 'todoList',
            type: new GraphQLList(TodoListInputType),
        }
    },
    resolve: (obj, args, source, fieldASTs) => {
        let res = new Promise((resolve, reject) => {
            let _user = fieldASTs.rootValue.session.user;
            TodoList.findOne(
                {_id: args.todoListId, userEmail:_user.userEmail},
                (err, doc) => {
                    if (err){
                        reject(err)
                    }
                    if (doc){
                        doc.todoList = args.todoList;
                        doc.save((err, updatedTodoList) => {
                            if (err){
                                reject(err)
                            }
                            if (updatedTodoList){
                                resolve(updatedTodoList)
                            }else {
                                reject('update fail')
                            }
                        });
                    }else {
                        reject('can not find todo list')
                    }
                }
            );

        });
        return res;
    }
};

export const deleteTodoList = {
    type: ReponseMessageType,
    description: "create new todo list",
    args: {
        todoListId: {
            name: 'todoListId',
            type: GraphQLString
        }
    },
    resolve: (obj, args, source, fieldASTs) => {
        let res = new Promise((resolve, reject) => {
            let _user = fieldASTs.rootValue.session.user;

            TodoList.update(
                {_id: args.todoListId},
                {$set: {status: false}},
                (err, doc) => {
                    if (err){
                        reject(err)
                    }
                    if(doc){
                        let message = {
                            todoListId: args.todoListId,
                            status: 'SUCCESS',
                            message: 'Todo list delete success!'
                        };
                        resolve(message)
                    }
                }
            );

        });
        return res;
    }
};

