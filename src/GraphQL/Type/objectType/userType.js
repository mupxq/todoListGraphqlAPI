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

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User Creator',
    fields: () => ({
        userId: {
            type: GraphQLString,
            description: 'The id of the user',
            resolve: obj => obj._id
        },
        userEmail: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The email of the user',
            resolve: obj => obj.userEmail
        },
        userPwd: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The password of the user account',
            resolve: obj => obj.userPwd
        },
        userSex: {
            type: GraphQLString,
            description: 'The sex of the user',
            resolve: obj => obj.userSex
        },
        userFirstName: {
            type: GraphQLString,
            description: 'The first name of the user',
            resolve: obj => obj.userFirstName
        },
        userLastName: {
            type: GraphQLString,
            description: 'The last name of the user',
            resolve: obj => obj.userLastName
        }
    })
});

export default UserType;