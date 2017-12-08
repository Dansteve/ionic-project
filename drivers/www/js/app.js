var IonicApp = angular.module('starter', ['ionic', 'ionic.cloud', 'starter.controllers', 'starter.services', 'starter.filter', 'ngCordova', 'firebase']);

IonicApp.config(function ($ionicCloudProvider) {
    $ionicCloudProvider.init({
        "core": {
            "app_id": "04f5c1c3"
  },
    "push": {
      "sender_id": "794270073021",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });
})

IonicApp.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});

IonicApp.config(function ($stateProvider, $urlRouterProvider) {

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
//        .state('log.access', {
//            url: '/access',
//            views: {
//                'log-access': {
//                    templateUrl: 'templates/access.html',
//                    controller: 'AccessCtrl'
//                }
//            }
//        })
//        .state('log.access-detail', {
//            url: '/access/:schoolId',
//            views: {
//                'log-access': {
//                    templateUrl: 'templates/access-detail.html',
//                    controller: 'AccessDetailCtrl'
//                }
//            }
//        })
        // setup an abstract state for the tabs directive
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html',
            controller: 'SideCtrl'
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

//        .state('tab.child-detail', {
//            url: '/dash/:childId',
//            views: {
//                'tab-dash': {
//                    templateUrl: 'templates/child-detail.html',
//                    controller: 'ChildDetailCtrl'
//                }
//            }
//        })
//
        .state('tab.map', {
            url: '/map',
            views: {
                'tab-map': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'MapsCtrl'
                }
            }
        })
//
//        .state('tab.chat-detail', {
//            url: '/chats/:chatId',
//            views: {
//                'tab-chats': {
//                    templateUrl: 'templates/chat-detail.html',
//                    controller: 'ChatDetailCtrl'
//                }
//            }
//        })

        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-account.html',
                    controller: 'AccountCtrl'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/log/login');
    //  $urlRouterProvider.otherwise('/tab/dash');

});
