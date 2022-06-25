const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');

// initializations
const app = express();

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
//Middleweares Son mas que todo los procesos que van haciendose en el cliente por diferentes usuarios
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); //para mandar y recibir .json

//Global varaibles
app.use((req, res, next)=>{
    next();
});
//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

//Public
app.use(express.static(path.join(__dirname, 'public')));
//Satarting Server
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});