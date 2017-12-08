var IonicApp = angular.module('starter.services', ['firebase']);

IonicApp.factory("Auth", function ($firebaseAuth) {
    var usersRef = new Firebase("https://pickup-dropoff.firebaseio.com/");
    return $firebaseAuth(usersRef);
})

IonicApp.factory("Feeds", function ($firebaseArray) {
    var itemsRef = new Firebase("https://pickup-dropoff.firebaseio.com/feed");
    var feed = $firebaseArray(itemsRef);
    return {
        all: function () {
            return feed;
        },
        remove: function (feed) {
            feed.splice(feed.indexOf(feed), 1);
        },
        get: function (feedId) {
            for (var i = 0; i < feed.length; i++) {
                if (feed[i].$id === feedId) {
                    return feed[i];
                }
            }
            return null;
        }
    };
})

IonicApp.factory("Days", function () {
    var feed = [{
        id: 1,
        name: 'monday',
        status: false,
        pickup: '',
        dropoff: '',
   }, {
        id: 2,
        name: 'tuesday',
        status: false,
        pickup: '',
        dropoff: '',
   }, {
        id: 3,
        name: 'wednesday',
        status: false,
        pickup: '',
        dropoff: '',
   }, {
        id: 4,
        name: 'thursday',
        status: false,
        pickup: '',
        dropoff: '',
   }, {
        id: 5,
        name: 'friday',
        status: false,
        pickup: '',
        dropoff: '',
   }, ]
    return {
        all: function () {
            return feed;
        },
        remove: function (feed) {
            feed.splice(feed.indexOf(feed), 1);
        },
        get: function (feedId) {
            for (var i = 0; i < feed.length; i++) {
                if (feed[i].$id === feedId) {
                    return feed[i];
                }
            }
            return null;
        }
    };
})

IonicApp.factory('Parents', function ($firebaseArray, $firebase) {
    // Might use a resource here that returns a JSON array
    var item = new Firebase("https://pickup-dropoff.firebaseio.com/drivers");
    // Some fake testing data
    var childs = $firebaseArray(item);
    return {
        all: function () {
            return childs;
        },
        remove: function (child) {
            childs.splice(childs.indexOf(chat), 1);
        },
        get: function (childId) {
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].email === childId) {
                    return childs[i];
                }
            }
            return null;
        },
        get2: function (childId) {
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].email2 === childId) {
                    return childs[i];
                }
            }
            return null;
        },
        //      update: function(){
        //          var ref = $firebaseArray.ref("https://pickup-dropoff.firebaseio.com/").child('schools');
        //          ref.once("value")
        //            .then(function(snapshot) {
        //            var key = snapshot.key; // "ada"
        //            var name = snapshot.child("name").val();
        //              return name;
        //            });
        //      }
    };
})

IonicApp.factory('Schools', function ($firebaseArray) {
    // Might use a resource here that returns a JSON array
    var item = new Firebase("https://pickup-dropoff.firebaseio.com/schools");
    // Some fake testing data
    var childs = $firebaseArray(item);
    return {
        all: function () {
            return childs;
        },
        remove: function (child) {
            childs.splice(childs.indexOf(chat), 1);
        },
        get: function (schoolId) {
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].$id === schoolId) {
                    return childs[i];
                }
            }
            return null;
        },
        getName: function (id) {
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].id === id) {
                    return childs[i];
                }
            }
            return null;
        }
    };
})

IonicApp.factory('Childs', function ($firebaseArray) {
    // Might use a resource here that returns a JSON array
    var item = new Firebase("https://pickup-dropoff.firebaseio.com/childs");
    // Some fake testing data
    var childs = $firebaseArray(item);
    return {
        all: function () {
            return childs;
        },
        remove: function (child) {
            childs.splice(childs.indexOf(chat), 1);
        },
        get: function (childId) {
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].$id === childId) {
                    return childs[i];
                }
            }
            return null;
        },
         add: function (a,b) {
            var url = "https://pickup-dropoff.firebaseio.com/childs/"+a+"/location";
            var eventRef = new Firebase(url);
            var eventInfo = $firebaseArray(eventRef);
            return eventInfo.$add(b);
        }
    };
})

IonicApp.factory('Drivers', function ($firebaseArray) {
    // Might use a resource here that returns a JSON array
    var item = new Firebase("https://pickup-dropoff.firebaseio.com/drivers");
    // Some fake testing data
    var childs = $firebaseArray(item);
    return {
        all: function () {
            return childs;
        },
        remove: function (child) {
            childs.splice(childs.indexOf(chat), 1);
        },
        get: function (schoolId) {
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].$id === schoolId) {
                    return childs[i];
                }
            }
            return null;
        },
        add: function (a,b) {
            var url = "https://pickup-dropoff.firebaseio.com/drivers/"+a+"/location";
            var eventRef = new Firebase(url);
            var eventInfo = $firebaseArray(eventRef);
            return eventInfo.$add(b);
        }
    };
})

IonicApp.factory('Vendors', function ($firebaseArray, $firebase) {
    // Might use a resource here that returns a JSON array
    var item = new Firebase("https://pickup-dropoff.firebaseio.com/vendors");
    // Some fake testing data
    var vendors = $firebaseArray(item);
    return {
        all: function () {
            return vendors;
        },
        remove: function (vendor) {
            vendor.splice(vendors.indexOf(chat), 1);
        },
        get: function (schoolId) {
            for (var i = 0; i < vendors.length; i++) {
                if (vendors[i].id === schoolId) {
                    return vendors[i];
                }
            }
            return null;
        }
    };
})

IonicApp.factory('$localstorage', ['$http', function ($http) {
    return {
        set: function (key, value) {
            return localStorage.setItem(key, JSON.stringify(value));
        },
        get: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },
        destroy: function (key) {
            return localStorage.removeItem(key);
        },
    };
}])
