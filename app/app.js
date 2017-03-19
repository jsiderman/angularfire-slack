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
          templateUrl: 'auth/login.html'
      })
      .state('register', {
          url: '/register',
          controller: 'AuthCtrl as authCtrl',
          templateUrl: 'auth/register.html'
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
