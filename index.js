const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);

//extract style and script from subpages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(session({
    name : 'Codeial',
    // TODO => change secret before deployment into production
    secret : 'blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());


app.listen(port, function(err){
    if(err){
        // console.log("Error in running the server : ", err);
        // alternative to the above code
        console.log(`Error in running the server : ${err}`);
        return;
    }
    else{
        console.log(`Server is running on port : ${port}`);
    }
});