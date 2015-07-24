(function () {
  'use strict';

  function UserWidgetCtrl($q, userRef) {
    var self = this;

    this._q = $q;
    this._userRef = userRef;

    this.loading = true;
    this.errored = false;

    this._fetchData(this.uid)

        .then(function (data) {
          if (!data) {
            self.errored = true;
          }

          self.data = data;
        })

        .catch(function (err) {
          // TODO
          console.log(err);
        })

        .finally(function () {
          self.loading = false;
        });
  }

  UserWidgetCtrl.prototype._fetchData = function (uid) {
    var defer = this._q.defer();

    this._userRef(uid).once('value', function (snap) {
      defer.resolve(snap.val());
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  UserWidgetCtrl.$inject = [
    '$q',
    'userRef'
  ];

  function userWidget() {

    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'views/userWidget.html',
      scope: true,
      controller: UserWidgetCtrl,
      controllerAs: 'ctrl',
      bindToController: {
        uid: '='
      }
    };
  }

  userWidget.$inject = [];

  angular.module('wordbin.directives')

      .directive('userWidget', userWidget);

}());
