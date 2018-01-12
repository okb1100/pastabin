var express = require('express');
var bodyParser = require('body-parser');
var requestId = require('express-request-id');
var fs = require('fs');
var path = require('path');
var app = express();

app.port = 3000;
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(requestId());
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/:id', (req, res) => {
    // read {pastaId}.json and send it
    fs.readFile('files/' + req.params.id + '.json', (e, data) => {
        if (e) {
            // no such file error code
            if (e.errno == -4058) res.sendStatus(404);
        } else res.render('pasta', JSON.parse(data));
    });
});

app.post('/api/uploadPasta', (req, res) => {
    req.body.id = req.id.slice(0, 8);
    req.body.date = Date.now();
    //create an id and store the pasta as {id}.json for now.
    // req.body -> title, content
    fs.writeFile(
        'files/' + req.body.id + '.json',
        JSON.stringify(req.body),
        e => {
            if (!e) {
                res.send(req.body.id);
            } else {
                console.error(e.message);
            }
        }
    );
});

app.listen(app.port, () => {
    console.log('Running on port:', app.port);
});
