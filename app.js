const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const {mongoDBUrl, PORT} = require('./config/configuration');

const app = express();

//configure mongoose database
mongoose.connect(mongoDBUrl, {useNewUrlParser: true,  useUnifiedTopology: true })
    .then( response => {
        console.log('MongoDB connected successfully!');
    }).catch(err => {
        console.log('Database connection failed', err);
});


/* Configure express */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


//Setup View Engine (express-handlebars)
app.engine('handlebars', hbs({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');



/* Routes configuration */
app.use('/', (req, res) => {
    res.render('default/index');
});



app.listen(PORT, () => {
   console.log('Server is up and running on port ' + PORT + '!');
});
