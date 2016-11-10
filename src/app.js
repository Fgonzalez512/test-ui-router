var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider) {

  var homeState = {
    name: 'home',
    url: '/home',
    template: '<h3>We are on the home screen</h3>'
  }

  var userState = {
    url: '/users',
    templateUrl: 'partials/users.html',
    controller: 'UserListController'
  }

  var userDetailState = {
    url: '/:user_name',
    parent: userState,
    templateUrl: 'partials/userDetail.html',
    controller: 'UserDetailController'
  }

  var userFoodState = {
    url: '/:food',
    parent: userState,
    templateUrl: 'partials/userDetail.html',
    controller: 'UserDetailController'
  }

  $stateProvider.state(homeState);
  $stateProvider.state('users', userState);
  $stateProvider.state('users.detail', userDetailState);
  $stateProvider.state('users.food', userFoodState);
});

app.service('CurrentUserService', function() {
  this.currentUser = {};
  this.setCurrentUser = function(user) {
    this.currentUser = user;
  }
});

app.controller('UserListController', ['$scope', 'CurrentUserService', function($scope, currentUserService) {

  $scope.CurrentUserService = currentUserService;

  $scope.users = [{
    name: 'Louis',
    favoriteCookie: 'Chocolate Chip'
  }, {
    name: 'Zubair',
    favoriteCookie: 'White Chocolate Chip'
  }, {
    name: 'Nicole',
    favoriteCookie: 'Oatmeal Raisin'
  }, {
    name: 'Marc',
    favoriteCookie: 'Chocolate Chip'
  }, {
    name: 'Joey',
    favoriteCookie: 'All of them'
  }, {
    name: 'Frank',
    favoriteCookie: 'Anything but garbage'
  },{
    name: 'Taylor',
    favoriteCookie: 'I don\'t like cookies'
  }]
}]);

app.controller('UserDetailController', ['$scope', '$stateParams', '$state', 'CurrentUserService', function($scope, $stateParams, $state, currentUserService) {

  $scope.user = currentUserService.currentUser;

  $scope.closeButtonPressed = function() {
    $state.go('users');
  }
}]);
