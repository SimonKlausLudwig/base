const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
let fs = require('fs');
let path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const mongoose = require('mongoose');
const cors = require('cors');

const {loginRouter} = require("./routes/login");
const {moviesRouter} = require("./routes/movies");
const {usersRouter} = require("./routes/users");

const app = express();
const port = process.env.PORT || 8080;
const dsnConnection = process.env.CONNECTION_URI || 'mongodb://localhost:27017/test';



// CONNECT DATABASE AND REST API
mongoose.connect(dsnConnection, {useNewUrlParser: true, useUnifiedTopology: true});


// LOGGING
const accessLogStream = fs.createWriteStream(path.join(__dirname, './middleware/log.txt'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));


// DOCUMENTATION
const swaggerDocument = YAML.load('./middleware/swagger.yaml');
app.use('/documentation.html', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// BODY PARSER
app.use(bodyParser.json());


// CORS MIDDLEWARE (SELECTION OF ALLOWED ORIGINS)
app.use(cors());


// PASSPORT
require('./middleware/passport');


// ROUTES
app.get('/', (req, res) => {
    res.send(`<html>
        Benutzer anlegen:

        curl -XPOST -H "Content-type: application/json" -d '{
            "Name": "Simon",
            "Password": "Simon123",
            "Email": "simon@simon-ludwig.de",
            "Birthday": "01-12-1995"
          }' 'https://8080-simonklausludwig-base-kf7z0cnonlc.ws-eu80.gitpod.io/users'


          curl -XPOST -H 'Content-Type: application/json' -d '{
            "Name": "Simon",
            "Password": "Simon123"
          }' 'https://8080-simonklausludwig-base-kf7z0cnonlc.ws-eu80.gitpod.io/login'

          curl -XGET -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2I0Njg5ZGYzNTcyMjNjMjAzN2Q5ZmYiLCJOYW1lIjoiU2ltb24iLCJQYXNzd29yZCI6IiQyYiQxMCROdm5aeXlJaXhhU3h6STZ3aXdEbE11d2VjUTNZd1ZPR3pYNDlVUm1QdWd2NmpIZGlKNWNQZSIsIkVtYWlsIjoic2ltb25Ac2ltb24tbHVkd2lnLmRlIiwiQmlydGhkYXkiOiIxOTk1LTAxLTEyVDAwOjAwOjAwLjAwMFoiLCJGYXZvcml0ZU1vdmllcyI6W10sIl9fdiI6MCwiaWF0IjoxNjcyNzY4MTcyLCJleHAiOjE2NzMzNzI5NzIsInN1YiI6IlNpbW9uIn0.i8PBr_ch-ojOH1gl3qP2YXboIEPEKkTSjpx8_Q1hVQc' 'https://8080-simonklausludwig-base-kf7z0cnonlc.ws-eu80.gitpod.io/movies'


    </html>`)
});

app.use(loginRouter);
app.use(moviesRouter);
app.use(usersRouter);


// CUSTOM ERROR FUNCTION
app.use((err, request, res, next) => {
    console.error(err);
    res.status(500).send('Something is broken!');
});


// LISTEN FOR REQUESTS
app.listen(port, '0.0.0.0',() => {
    console.log('Listening on Port ' + port);
});
