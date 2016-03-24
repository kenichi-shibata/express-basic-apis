var User = require('./../models/user');

exports.login = function login(req,res){
    User.findOne({userName:req.body.username}, function(err,user){
			if(err || !user)
				res.redirect('/loginPage?valid=false');
		    else if(user){
				user.comparePasswords(req.body.password, function(err,isMatch){
					if(err || !isMatch){
						res.redirect('/loginPage?valid=false');
					}
					else if(isMatch){
            req.user = user;
            delete req.user.password;
            res.locals.user = user;
            req.session.user = user;
						res.redirect('dashboard');
					}
				});
			}
		});
};

exports.dashboard = function dashboard(req,res){
  if(!req.session.user)
    res.redirect('/loginPage?loggedIn=false');
  else if(req.session.user)
	  res.render('dashboard',{name: req.session.user.fullName});
  else
    res.send('error!');
};

exports.logout = function logout(req,res){
  req.session.reset();
  res.redirect('/');
};

exports.display = function display(req,res){
	res.send('this displays all the currently registered user');
};

exports.changePassword = function changePassword(req,res){
	res.send('changePassword');
};

exports.forgotPassword = function forgotPassword(req,res){
	res.send('forgotPassword');
};
