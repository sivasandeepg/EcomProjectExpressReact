const passport = require('passport');

exports.googleLogin = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

exports.googleCallback = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/login' }, (err, user, info) => {
    if (err) {
      console.error('Error during Google authentication:', err);
      return next(err);
    }
    if (!user) {
      console.error('No user found during Google authentication');
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error during user login:', err);
        return next(err);
      }
      res.redirect('http://localhost:3000/');
    });
  })(req, res, next);
};

exports.currentUser = (req, res) => {
  res.send(req.user);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return next(err);
    }
    res.redirect('/');
  });
};
  