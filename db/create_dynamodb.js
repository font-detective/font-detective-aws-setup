// Luke Mitchell
// 2016

var AWS = require('aws-sdk');
var async = require('async');

// Set location to Ireland
AWS.config.region = 'eu-west-1';

var dynamodb = new AWS.DynamoDB();

// Create a results table
function createResultsTable(callback) {
	var params = {
		AttributeDefinitions: [
			{
		      AttributeName: 'uid',
		      AttributeType: 'S'
		    }
		],
		KeySchema: [
		    {
		      AttributeName: 'uid',
		      KeyType: 'HASH'
		    }
	  	],
	  	TableName: 'results',
	  	ProvisionedThroughput: {
	        ReadCapacityUnits: 50,
	        WriteCapacityUnits: 5
	    }
	};

	dynamodb.createTable(params, function(err, data) {
	  	if (err) console.log(err, err.stack);
	 	else     console.log(data);
	 	callback();
	});
};

// Create a classifiers table
function createClassifiersTable(callback) {
	var params = {
		AttributeDefinitions: [
			{
		      AttributeName: 'filename',
		      AttributeType: 'S'
		    }
		],
		KeySchema: [
		    {
		      AttributeName: 'filename',
		      KeyType: 'HASH'
		    }
	  	],
	  	TableName: 'classifiers',
	  	ProvisionedThroughput: {
	        ReadCapacityUnits: 50,
	        WriteCapacityUnits: 5
	    }
	};

	dynamodb.createTable(params, function(err, data) {
	  	if (err) console.log(err, err.stack);
	 	else     console.log(data);
	 	callback();
	});
};

// Populate the classifiers table!
function populateClassifiersTable(callback) {
	var params = [
	{
		Item: {
		  	name: {
		  		S: 'face'
		    },
		    filename: {
		    	S: 'haarcascade_frontalface_default.xml'
		    },
		    description: {
		    	S: 'front-facing human faces'
		    }
		},
		TableName: 'classifiers'
	},
	{
		Item: {
		  	name: {
		  		S: 'banana'
		    },
		    filename: {
		    	S: 'haarcascade_banana.xml'
		    },
		    description: {
		    	S: 'single bananas'
		    }
		},
		TableName: 'classifiers'
	}
	];

	async.forEach(params, function (p, next) {
		console.log(p);
		dynamodb.putItem(p, function(err, data) {
			if (err) console.log(err, err.stack);
			else     console.log(data);
			next();
		});
	}, function(err) {
		if (err) {
			return console.error(err.message);
		}
		callback();
	});
};

// Do it!
async.series([
	function(next) { createResultsTable(next); },
	function(next) { createClassifiersTable(next); },
	function(next) { populateClassifiersTable(next); }
	], function (err) {
		if (err) {
			return console.error(err.message);
		}
		console.log('Done!');
	});