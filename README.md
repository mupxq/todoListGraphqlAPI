### Todo list API project ###

provide the todo list project API

### deployment instructions ###

First, in the project src directory edit app.js
change the origin to you own frond-end project origin

```js
const corsOptions = {
    origin: 'http://192.168.1.104:3001',
    credentials: true,
};
```
Then in the project root directory
run command
```sh
npm install
npm run build
cd build
```
Builds the app for production to the build folder.

Then run command 

```sh
node app.js
```

the api server will run on localhost:8880



