var IonicApp = angular.module('starter.filter', []);

IonicApp.filter('numKeys', function() {
    return function(json) {
        var keys = Object.keys(json)
        return keys.length;
    }
})

IonicApp.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

IonicApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});


IonicApp.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});
