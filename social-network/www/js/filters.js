//Developer : Dansteve Adekanbi
//copyright : Dansteve Adekanbi
//year : 2016

angular.module('starter.filter', [])

.filter('numKeys', function() {
    return function(json) {
        var keys = Object.keys(json)
        return keys.length;
    }
})

.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
