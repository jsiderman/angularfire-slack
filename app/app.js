'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
          url: '/',
          templateUrl: 'home/home.html'
      })
      .state('login', {
          url: '/login',
          controller: 'AuthCtrl as authCtrl',
          templateUrl: 'auth/login.html',
          resolve: {
              requireNoAuth: function($state, Auth){
                  return Auth.$requireSignIn().then(function(auth){
                      $state.go('home');
                  }, function(error){
                      return;
                  });
              }
          }
      })
      .state('register', {
          url: '/register',
          controller: 'AuthCtrl as authCtrl',
          templateUrl: 'auth/register.html',
          resolve: {
              requireNoAuth: function($state, Auth){
                  return Auth.$requireSignIn().then(function(auth){
                      $state.go('home');
                  }, function(error){
                      return;
                  });
              }
          }
      })
        .state('profile', {
            url: '/profile',
            controller: 'ProfileCtrl as profileCtrl',
            templateUrl: 'users/profile.html',
            resolve: {
                auth: function ($state, Users, Auth) {
                    return Auth.$requireSignIn().catch(function () {
                        $state.go('home');
                    });
                },
                profile: function (Users, Auth) {
                    return Auth.$requireSignIn().then(function (auth) {
                        return Users.getProfile(auth.uid).$loaded();
                    });
                }
            }
        });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://slack.firebaseio.com/')
    .config(function(){
        var config = {
            apiKey: "AIzaSyA23HwEYvHa39TkSfwEsGj5OUbKBGd5J6s",
            authDomain: "flack-9fe90.firebaseapp.com",
            databaseURL: "https://flack-9fe90.firebaseio.com",
            storageBucket: "flack-9fe90.appspot.com",
            messagingSenderId: "134057867614",
        };
        firebase.initializeApp(config);
    });
