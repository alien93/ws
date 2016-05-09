Use this folder to store .js files that contain services

Example:

'use strict';

angular.module('mean.sg').factory('Sg', [ '$rootScope', '$http', '$location', '$stateParams', '$cookies', '$q', '$timeout', '$cookieStore',
  function($rootScope, $http, $location, $stateParams, $cookies, $q, $timeout, $cookieStore) {

    var self;

    function escape(html) {
      return String(html)
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
    }

    function b64_to_utf8( str ) {
      return decodeURIComponent(escape(window.atob( str )));
    }

    function SgKlass(){
      this.name = 'users';
      this.user = {};
      this.registerForm = false;
      this.loggedin = false;
      this.isAdmin = false;
      this.loginError = 0;
      this.usernameError = null;
      this.registerError = null;
      this.resetpassworderror = null;
      this.validationError = null;
      $http.get('/api/sg/users/me').success(this.onIdentity.bind(this));
      self = this;
    }

    SgKlass.prototype.checkAdmin = function() {
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/api/sg/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0' && user.roles.indexOf('admin') !== -1) $timeout(deferred.resolve);

        // Not Authenticated or not Admin
        else {
          $timeout(deferred.reject);
          $location.url('/');
        }
      });

      return deferred.promise;
    };

    return Sg;
  }
]);

