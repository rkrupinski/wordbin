(function () {
  'use strict';

  function UserNavCtrl(auth, user) {
    this._auth = auth;
    this._user = user;

    this.isLoggedIn = auth.isLoggedIn();

    this._loadUserData();
  }

  UserNavCtrl.prototype._loadUserData = function () {
    var self = this;

    this._user.get().then(function (data) {
      self.userData = data;
    });
  };

  UserNavCtrl.prototype.login = function (e) {
    e.preventDefault();

    this._auth.login();
  };

  UserNavCtrl.prototype.logout = function (e) {
    e.preventDefault();

    this._auth.logout();
  };

  UserNavCtrl.$inject = [
    'auth',
    'user'
  ];

  function userNav() {

    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'views/userNav.html',
      controller: UserNavCtrl,
      controllerAs: 'ctrl'
    };
  }

  userNav.$inject = [];

  angular.module('wordbin.directives')

      .directive('userNav', userNav);

}());
