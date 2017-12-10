var IonicApp = angular.module('starter.services', ['firebase']);

IonicApp.factory("Auth", function ($firebaseAuth) {
    var usersRef = new Firebase("https://pickup-dropoff.firebaseio.com/");
    return $firebaseAuth(usersRef);
})

IonicApp.factory("Feeds", function ($firebaseArray) {
            var itemsRef = new Firebase("https://pickup-dropoff.firebaseio.com/feed").orderByChild('dateme');
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
                },
//                sorted: function () {
//                    var topUserPostsRef = itemsRef.orderByChild('dateme');;
//                    var topUserPosts = $firebaseArray(topUserPostsRef);
//                    return topUserPosts;
//                }
            };
})

IonicApp.factory("Days", function () {
    var feed = [{
        id: 1,
        name: 'monday',
        status: false,
        pickup: '',
        dropoff: '',
        late: false
   }, {
        id: 2,
        name: 'tuesday',
        status: false,
        pickup: '',
        dropoff: '',
        late: false
   }, {
        id: 3,
        name: 'wednesday',
        status: false,
        pickup: '',
        dropoff: '',
        late: false
   }, {
        id: 4,
        name: 'thursday',
        status: false,
        pickup: '',
        dropoff: '',
        late: false
   }, {
        id: 5,
        name: 'friday',
        status: false,
        pickup: '',
        dropoff: '',
        late: false
   },{
        id: 6,
        name: 'saturday',
        status: false,
        pickup: '',
        dropoff: '',
        late: false
   },{
        id: 7,
        name: 'sunday',
        status: '',
        pickup: '',
        dropoff: '',
        late: ''
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
        }
    };
})

IonicApp.factory('Parents', function ($firebaseArray, $firebase) {
    // Might use a resource here that returns a JSON array
    var item = new Firebase("https://pickup-dropoff.firebaseio.com/parents");
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
                if (childs[i].id === schoolId) {
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
        },
//        loaction: function (aid) {
//            var url = "https://pickup-dropoff.firebaseio.com/drivers/"+aid;
//            var eventRef = new Firebase(url);
//            var eventInfo = $firebaseArray(eventRef);
//             for (var i = 0; i < eventInfo.length; i++) {
//                if (eventInfo[i].$id === aid) {
//                    return eventInfo[i];
//                }
//            }
//            return null;
//        }
    };
})

IonicApp.factory('Vendors', function ($firebaseArray) {
    // Might use a resource here that returns a JSON array
    var item = new Firebase("https://pickup-dropoff.firebaseio.com/vendors");
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
                if (childs[i].id === schoolId) {
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
