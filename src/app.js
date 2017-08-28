const express = require('express');
const  path = require('path');
const  favicon = require('serve-favicon');
const  logger = require('morgan');
const session = require('express-session');

const  cookieParser = require('cookie-parser');
const  bodyParser = require('body-parser');
const mongoose = require('mongoose');
const  index = require('./../routes/index');
const  users = require('./../routes/users');
const mongoStore = require('connect-mongo')(session);
const cors = require('cors');

const credentials = require('./credentials.js');
import graphqlHTTP from 'express-graphql';
import schema from './Schema'

const  app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// set the server port
app.set('port', process.env.PORT || 8880);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('cookie-parser')(credentials.cookieSecret));

//MongoDB setup

mongoose.Promise = global.Promise;
const options = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
let mlabUrl = '';
switch (app.get('env')) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, options);
        mlabUrl = credentials.mongo.development.connectionString;
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, options);
        mlabUrl = credentials.mongo.production.connectionString;
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}

app.use(session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: credentials.cookieSecret,
    cookie:{
        // maxAge:1000*60*30
    },
    store: new mongoStore({
        url: credentials.mongo.development.connectionString,
        collection: 'sessions'
    })
}));

//setup cors
const corsOptions = {
    origin: 'http://192.168.1.104:3001',
    credentials: true,
};

app.use(cors(corsOptions));


app.use('/graphql', graphqlHTTP (req => ({
    schema,
    rootValue: { session: req.session },
    graphiql:true
})));

module.exports = app;

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});
