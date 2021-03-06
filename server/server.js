require('./config/config');
const express = require('express');
// Using Node.js `require()`
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//configuracion global de rutas
app.use(require('./routes/index'));


mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err)
        throw err;

    console.log('Base de datos online');
});



app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
})