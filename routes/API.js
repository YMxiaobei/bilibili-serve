var express = require('express');
var mongoClient = require( 'mongodb' ).MongoClient;
var db_users_conn = 'mongodb://localhost:27017/bilibili';
var router = express.Router();

function insertData ( db, collection_name, data, callback ) {
	var collection = db.collection ( collection_name );

	collection.insert ( data, function ( err, result ) {
		if ( err ) {
			console.log ( 'insert fail Erro:' + err );
			callback ( null, err );
			return;
		}
		else {
			callback ( result );
		}
	} )
}

function updateData ( db, collection_name, SELECTIOIN_CRITERIA, UPDATED_DATA, callback ) {
	var collection = db.collection ( collection_name );

	colletion.update ( SELECTIOIN_CRITERIA, UPDATED_DATA, function ( err, result ) {
		if ( err ) {
			console.log ( 'update fail Erro:' + err );
			callback ( null, err );
			return;
		}
		else {
			callback ( result );
		}
	} )
}

function selectData ( db, collection_name, SELECTIOIN_CRITERIA, callback ) {
	var collection = db.collection ( collection_name );

	collection.find ( SELECTIOIN_CRITERIA ).toArray ( function ( err, result ) {
		if ( err ) {
			console.log ( 'select fail Erro:' + err );
			callback ( null, err );
			return;
		}
		else {
			callback ( result );
		}
	} )
}

function getUserId () {
	return 'u123456';
}

/* GET home page. */
router.get('/contribute/video', function(req, res, next) {
  
});

router.post('/sign-up', function(req, res, next) {
	var userInfo = req.body;

	userInfo.id = getUserId ();

	mongoClient.connect ( db_users_conn, function ( err, db ) {
		selectData ( db, 'users', {username: userInfo.username}, function ( result ) {
			if ( result && result.length > 0 ) {
				res.send ( "username exit" );
			}
			else {
				insertData ( db, "users", userInfo, function ( result, err ) {
					if ( result && !err ) {
						console.log ( result );
						res.send ( 'sign-up success' );
					}
					else if ( err ) {
						res.send ( 'sign-up fail Erro:' + err );
					}
				} )
			}
		} )
	} ) 
});

module.exports = router;