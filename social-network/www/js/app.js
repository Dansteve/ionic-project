//Developer : Dansteve Adekanbi
//copyright : Dansteve Adekanbi
//year : 2016

angular.module('starter', ['ionic','ionic.cloud', 'ion-floating-menu','starter.controllers', 'starter.services','starter.filter'])

.config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "9ddc1f42"
    }
  });
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
//      StatusBar.styleDefault();
//        StatusBar.overlaysWebView(true);
      StatusBar.style(1); //Light
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the log directive
    .state('log', {
    url: '/log',
    abstract: true,
    templateUrl: 'templates/log.html'
  })

    .state('log.login', {
    url: '/login',
    views: {
      'log-login': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

// setup an abstract state for the tabs directive

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'AccountCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.child-detail', {
      url: '/dash/:childId',
      views: {
        'tab-dash': {
          templateUrl: 'templates/child-detail.html',
          controller: 'ChildDetailCtrl'
        }
      }
    })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

  .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
//        controller: 'AccountCtrl'
      }
    }
  })

// setup an abstract state for the other directive

    .state('other', {
        url: '/other',
        abstract: true,
        templateUrl: 'templates/other.html',
        controller: 'OtherCtrl'
      })
    .state('other.promote', {
        url: '/promote',
        views: {
          'other': {
            templateUrl: 'templates/other-promote.html',
            controller: 'OtherCtrl'
          }
        }
      })
    .state('other.coins', {
        url: '/coins',
        views: {
          'other': {
            templateUrl: 'templates/other-coins.html',
            controller: 'OtherCtrl'
          }
        }
      })
      .state('other.coins-detail', {
      url: '/coins/:socialId',
      views: {
        'other': {
          templateUrl: 'templates/other-coins-view.html',
          controller: 'coinsDetailCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/log/login');
//  $urlRouterProvider.otherwise('/tab/dash');

});
