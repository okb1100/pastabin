var express = require('express');
var bodyParser = require('body-parser');
// TODO: change the id method later
var requestId = require('express-request-id');

var databaseHelper = require('./dbHelper');
const dbUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGODB_URI.split("/").pop() || 'pastabin';
const collectionName = 'docs';

var path = require('path');
var app = express();

app.port = process.env.PORT || 3000;
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
    // Get the data from database and render it.
    databaseHelper(dbUrl,dbName,collectionName,'getOne',{id: req.params.id}, (err, obj) => {
    	if (obj) res.render('pasta', obj);
    	else res.sendStatus(404);
    });
});

app.get('/u/:author', (req,res) =>{
	databaseHelper(dbUrl, dbName, collectionName, 'list', {uploader: req.params.author}, (err,obj) => {
		if (obj) 
			res.render('list', {list: obj});
		else res.sendStatus(404);
	})
})


app.get('/download/:id', (req,res) => {
	databaseHelper(dbUrl, dbName, collectionName, 'getOne', {id: req.params.id}, (err,obj) => {
		if (obj){
			if(obj.title.length < 1){
				obj.title = obj.id + '.txt';
			}
			res.set({
				'Content-Type': 'application/octet-stream',
				'Content-Disposition': 'attachment; filename=' + obj.title		
			})
			res.send(obj.content);
		}
		else res.sendStatus(404);
	})
})
app.post('/api/uploadPasta', (req, res) => {
    req.body.id = req.id.slice(0, 8);
    req.body.date = Date.now();

    databaseHelper(dbUrl, dbName, collectionName, 'insert', req.body, (err) => {
    	if (err) throw err;
		else res.send(req.body.id);
    });
});
app.listen(app.port, () => {
    console.log('Running on port:', app.port);
});