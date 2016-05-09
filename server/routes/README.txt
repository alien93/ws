Use this folder to store .js files that define routs (REST endpoints)

Example:

module.exports = function(MeanUser, app, auth, database, passport) {

  // User routes use users controller
  var users = require('../controllers/users')(MeanUser);

  app.route('/api/logout')
    .get(users.signout);
  app.route('/api/users/me')
    .get(users.me);

  // Setting up the userId param
  app.param('userId', users.user);

  // AngularJS route to check for authentication
  app.route('/api/loggedin')
    .get(function(req, res) {
      if (!req.isAuthenticated()) return res.send('0');
      auth.findUser(req.user._id, function(user) {
        res.send(user ? user : '0');
      });
    });


...
