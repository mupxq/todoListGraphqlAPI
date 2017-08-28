/**
 * Created by mupxq on 8/26/17.
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

import User from '../../models/userModel';
import UserType from '../Type/objectType/userType';

export const userQuery = {
    type: UserType,
    description: 'user info',
    resolve: (obj, args, source, fieldASTs) => {
        let res = new Promise((resolve, reject) => {
            let _user = fieldASTs.rootValue.session.user;
            User.findOne({userEmail: _user.userEmail}, (err, doc) => {
                err ? reject(err) : resolve(doc);
            });
        });
        return res;
    }
};

export const signup = {
    type: UserType,
    description: 'create user',
    args: {
        userEmail: {
            name: 'userEmail',
            type: GraphQLString,
        },
        password: {
            name: 'password',
            type: GraphQLString
        }
    },
    resolve: (obj, args, source, fieldASTs) => {
        let res = new Promise((resolve, reject) => {
            // console.log(_user);
            User.findOne({userEmail: args.userEmail}, (err, doc) => {
                if (err){
                    reject(err)
                }
                if (doc){
                    reject('You already have a account')
                }else {
                    let user = new User();
                    user.userEmail = args.userEmail;
                    user.userPwd = args.password;
                    user.save((err, userInfo) => {
                        let userSession = {
                            _id: userInfo._id,
                            userEmail: userInfo.userEmail
                        };
                        fieldASTs.rootValue.session.user = userSession;
                        resolve(userInfo);
                    })
                }
            });
        });
        return res;
    }
};

export const userLogin = {
    type: UserType,
    args: {
        userEmail: {
            name: 'userEmail',
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            name: 'user password',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    description: 'user login',
    resolve: (obj, args, source, fieldASTs) => {
        "use strict";

        let res = new Promise((resolve, reject) => {
            User.findOne(
                {userEmail: args.userEmail},
                (err, doc) => {
                    if (err){
                        return new Error(err);
                    }
                    if (doc){
                        doc.comparePassword(args.password, (err, isMatch) => {
                            if (err) {
                                return new Error(err);
                            }

                            if (isMatch) {

                                let user = {
                                    _id: doc._id,
                                    userEmail: doc.userEmail
                                };
                                fieldASTs.rootValue.session.user = user;
                                resolve(doc);
                            } else {
                                reject('not match');
                            }
                        });
                    }
                }
            );
        });

        return res;

    }
};