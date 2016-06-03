var User = require('./../models/user');

exports.registration = function register(req,res){
	if(req.query.valid==='false')
		res.render('register',{invalid: 'Username is taken!'});
	else
		res.render('register');
};

exports.register = function register(req,res){
	// create a new user
	var testUser = new User({
	 fullName: req.body.fullname,
	 emailAddress: req.body.email,
	 userName: req.body.username,
	 password: req.body.password
	});
	// save a the userName
	testUser.save(function(err,response){
		if(err || !response) res.redirect('/registration?valid=false');
		else if(response)
		res.redirect('/login');
	});
};

exports.loginPage = function loginPage(req,res){
	if(!req.session.user){
		if(req.query.valid==='false')
			res.render('login',{invalid: 'Wrong Password!'});
		else if(req.query.loggedIn==='false')
			res.render('login',{invalid: 'Not Logged In!'});
		else
			res.render('login');
	}
	else if(req.session.user){
		res.redirect('/users/dashboard');
	}
};

exports.login = function login(req,res){
    User.findOne({userName:req.body.username}, function(err,user){
			if(err || !user)
				res.redirect('/login?valid=false');
		    else if(user){
				user.comparePasswords(req.body.password, function(err,isMatch){
					if(err || !isMatch){
						res.redirect('/login?valid=false');
					}
					else if(isMatch){
            req.user = user;
            delete req.user.password;
            res.locals.user = user;
            req.session.user = user;
						res.redirect('/users/dashboard');
					}
				});
			}
		});
		if(process.env.NODE_ENV!=='production')
			console.log(req.session.user);
};
