'use strict';

var express = require('express');
var path = process.cwd();
var router = express.Router();
var Twitter = require('node-twitter-api');
//var	secret = include('secret');

var twitter = new Twitter({
	//consumerKey: secret.twitter.consumerKey,
	consumerKey: 'ZoWcONjhp3v2AsLHf3zgUUNSJ',
	//consumerSecret: secret.twitter.consumerSecret,
	consumerSecret: 'fLgx35sZsGnaDT1rHkX29VQEj31lFB3oljF9w9g3BDM2ifZZGN',
	//callback: secret.twitter.callbackUrl
	callback: 'https://fcc-test-clementine-amac0428.c9users.io/user'
});

var _requestSecret;

router.get('/', function(req, res){
	res.render(path + '/public/index', 
	{
		name: 'Kevin Durant'
	});
});

//callback from successful twitter api auth
router.get('/user', function(req, res){
	var requestToken = req.query.oauth_token;
	var verifier = req.query.oauth_verifier;	
	twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
		if (err)
			res.status(500).send(err);
		else
            twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
            	if (err)
            		res.status(500).send(err);
            	else
            		//res.send(user);
            		var UID = user.id;
					res.render(path + '/public/user', {
						//message: JSON.stringify(req.query)
						message: JSON.stringify(user)
						//message: userName
						
					});            		
            });
	});
});

// init twitter auth
router.get('/request-token', function(req, res){
	twitter.getRequestToken(function(err, requestToken, requestSecret){
		if (err)
			res.status(500).send(err);
		else {
			_requestSecret = requestSecret;
			res.redirect('https://api.twitter.com/oauth/authenticate?oauth_token='+requestToken);
		}
	});
});

router.get('/access-token', function(req, res){

	//res.send(verifier);
	twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
		if (err)
            res.status(500).send(err);
        else
            twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
                if (err)
                    res.status(500).send(err);
                else
                    res.send(user);
            });
	});
	/*
	twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret){
		if (err)
			res.status(500).send(err);
		else{
			twitter.verifyCredentials(accessToken, accessSecret, function(err, user){
				if (err)
					res.status(500).send(err);
				else
					res.send.user;
			});
		}
	});
	*/
});

router.post('/post-name', function(req, res){
	const body = req.body;
	res.render(path + '/public/index', 
	{
		name: req.body.user
	});	
	//res.send('Here it is ' + req.body.user);
});

module.exports = router;

/*
var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.get('/user', function(req,res){
		res.render(path + '/public/user.pug');
	});

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};
*/