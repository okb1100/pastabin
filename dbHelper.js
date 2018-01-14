/* I don't think this is how it's done... */
const MongoClient = require('mongodb').MongoClient;

module.exports = (url,name,collection,method,data,callback) => {
	MongoClient.connect(url, (err,cli) => {
		const db = cli.db(name);
		const coll = db.collection(collection);

		if(method == 'getOne'){
			coll.findOne(data, (err,obj) =>{
				callback(err,obj);
			})
			cli.close();
		}
		else if(method == 'insert'){
			coll.insert(data,(err) => {
				callback(err);
			})
			cli.close();
		}
	})
}