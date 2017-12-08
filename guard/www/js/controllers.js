var IonicApp = angular.module('starter.controllers', ['firebase', 'ionic.cloud']);
IonicApp.controller('DashCtrl', function ($scope, $ionicPopup, $cordovaLocalNotification,$ionicPopup, $cordovaGeolocation, $http,$ionicModal,$state, $localstorage, $ionicPush, Childs, Schools, Parents) {

        if (!navigator.onLine) {
        console.log('false');
        $ionicPopup.show({
            template: '',
            title: 'Network Error',
            subTitle: 'Please check your network connection and try again.',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Okay</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.loading = true;
                    }
                        }
                    ]
        });
    };

    $scope.getschool = function (id) {
        $scope.temp = Schools.getName(id);
        if ($scope.temp !== null) {
            return $scope.temp.name;
        } else {
            return "Loading...";
        }
    }
    $state.reload().then(function (){
        console.log('true')
    });
    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.Loguser = $localstorage.get('LoginUser');
    console.log($scope.Loguser);
    $scope.childs = Childs.all();


    $scope.itemsPerPage = 4;
    $scope.currentPage = 0;
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    $scope.prevPageDisabled = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
    };
    $scope.pageCount = function () {
        return Math.ceil($scope.childs.length / $scope.itemsPerPage) - 1;
    };
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };
    $scope.nextPageDisabled = function () {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };
    console.log($scope.childs);
    $scope.add = function () {
        var alarmTime = new Date();
        alarmTime.setSeconds(alarmTime.getSeconds() + 5);
        $cordovaLocalNotification.add({
            id: "123334",
            date: alarmTime,
            message: "Welcome Back " + $scope.Loguser.lastname,
            autoCancel: true,
            title: "welcome",
            icon: "res://icon",
            smallIcon: "res://icon"
        }).then(function () {
            console.log("the notification was set");
        })
    };
    //$scope.add();
    $ionicPush.register().then(function (t) {
        alarm('done');
        alarm(t);
    })
    $scope.$on('cloud:push:notification', function (event, data) {
        var msg = data.message;
        alert(msg.title + ': ' + msg.text);
    });
    $scope.pickUp = function (id, putter, name) {;
        if (putter === 'pending') {
            $scope.DropPickPend = 'dropoff';
        } else {
            $scope.DropPickPend = 'PickUp';
        }
        $ionicPopup.show({
            template: '',
            title: 'Confirm ' + $scope.DropPickPend,
            subTitle: 'Are you sure you want to ' + $scope.DropPickPend + ' ' + name,
            scope: $scope,
            buttons: [{
                    text: '<b>Cancel</b>',
                },
                {
                    text: '<b>Okay</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.DriverAction(id, putter);
                    }
                        }
                    ]
        });
    }
    $scope.DriverAction = function (id, putter) {


            var options = {
                timeout: 10000,
                enableHighAccuracy: true
            };
            $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                $scope.positions = position;
                console.log($scope.positions);
        var finds = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + $scope.positions.coords.latitude + ',' + $scope.positions.coords.longitude + '&key=AIzaSyCeNLDm-PF5BAaSV6VxhqCBVEVs4v8Vne0'
//        console.log(finds);
        $http.get(finds)
            .success(function (newItems) {
                $scope.newItems = newItems.results[0].address_components;
                //console.log($scope.newItems);
                $scope.address2 = $scope.newItems[1].long_name + ' ' + $scope.newItems[3].long_name + ',' + $scope.newItems[4].long_name + ' ' + $scope.newItems[6].long_name
                console.log($scope.address2);
            }).then(function (){


        $scope.bucketListOne = new Firebase("https://pickup-dropoff.firebaseio.com/childs");
        $scope.bucketListOne.once('value', function (snapshot) {
            var data = snapshot.val();
            //    console.log(data);
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key === id) {
                        data[key].key = key;
                        //console.log(data[key].key)
                        var today = new Date();
                        var tTime = today.getHours() + ' : ' + today.getMinutes();
                        var itemRef = new Firebase("https://pickup-dropoff.firebaseio.com/childs" + '/' + data[key].key);
                        itemRef.update({
                            status: putter,
                            time: tTime,
                            currentAddress: $scope.address2
                        });
                    }
                }
            };

        });

            var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
            var today = new Date();
            var tTime = today.getHours() + ':' + today.getMinutes() + ' <br>' + today.getDate() + ' ,' + monthNames[today.getMonth()] + '<br>' + today.getFullYear();
            var d = new Date();
            var nite = 0 - d.getTime();
            var dtata = {
              "action" : $scope.DropPickPend,
              "location" : $scope.address2,
              "time" : tTime,
              "day" : nite,
            }
            $scope.doChild = Childs.add(id , dtata);
            console.log($scope.doChild);
          });
        })
    };
//    $scope.dropOff = function (id) {
//        $scope.bucketListOff = new Firebase("https://pickup-dropoff.firebaseio.com/childs");
//        $scope.bucketListOff.on('value', function (snapshot) {
//            var data = snapshot.val();
//            //    console.log(data);
//            for (var key in data) {
//                if (data.hasOwnProperty(key)) {
//                    if (key === id) {
//                        data[key].key = key;
//                        //console.log(data[key].key)
//                        var today = new Date();
//                        var tTime = today.getHours() + ' : ' + today.getMinutes();
//                        birthday.getSeconds();
//                        var itemRef = new Firebase("https://pickup-dropoff.firebaseio.com/childs" + '/' + data[key].key);
//                        itemRef.update({
//                            status: 'pickup',
//                            time: 'f'
//                        });
//                    }
//                } else {
//                    return 'done';
//                }
//            };
//        });
//    };
//
//    setInterval(function () {
//        $scope.Mydays = new Date();
//        $scope.hour = $scope.Mydays.getHours();
////        if ($scope.hour === 12 || $scope.hour === 0) {
//        if ($scope.hour === 0) {
//            $scope.bucketListOne = new Firebase("https://pickup-dropoff.firebaseio.com/childs");
//            $scope.bucketListOne.once('value', function (snapshot) {
//                var data = snapshot.val();
//                //console.log(data);
//                for (var key in data) {
//                    if (data.hasOwnProperty(key)) {
//                        data[key].key = key;
//                        //console.log(data[key].key)
//                        var today = new Date();
//                        var tTime = today.getHours() + ' : ' + today.getMinutes();
//                        var itemRef = new Firebase("https://pickup-dropoff.firebaseio.com/childs" + '/' + data[key].key);
//                        itemRef.update({
//                            status: "pickup",
//                        });
//                    }
//                };
//            });
//        }
//    }, 2000);


    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    $scope.today = new Date();
    var sds = $scope.today.getDay();
    $scope.sru = weekday[sds].toLowerCase();


$scope.filter2 = function(p){
    if ($scope.hour < 12 ){
    if (p.route[$scope.sru].pickup.address === ''){
        return false;
    } else{
        return true;
    }
    }else{
      if (p.route[$scope.sru].dropoff.address === ''){
        return false;
    } else{
        return true;
    }
    }
};


})


IonicApp.controller('SideCtrl', function ($scope, $state, $ionicPush, $stateParams, Childs, $localstorage, $ionicAuth, $http, $sce, $ionicLoading, $compile, $ionicPopup, $http, $cordovaGeolocation, $ionicLoading, $compile, Vendors, $ionicPopup, $http, $cordovaGeolocation, Parents) {

           if (!navigator.onLine) {
        console.log('false');
        $ionicPopup.show({
            template: '',
            title: 'Network Error',
            subTitle: 'Please check your network connection and try again.',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Okay</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.loading = true;
                    }
                        }
                    ]
        });
    };

    $scope.Loguser = $localstorage.get('LoginUser')
    $scope.the = $localstorage.get('LoginUser')
    $scope.email = $scope.Loguser.email;
    console.log($scope.email);
    $scope.parent = Parents.all();
    $scope.childs = Childs.all();
    $scope.login = function () {
        $ionicPush.unregister()
        console.log('working');
        $ionicAuth.logout();
        $localstorage.destroy('LoginUser');
        $localstorage.destroy('LoginUser');
        $state.go('log.login');
    };
})

IonicApp.controller('AccountCtrl', function ($scope, $state, Parents, $localstorage, Vendors,$ionicPopup, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet, $ionicLoading) {

           if (!navigator.onLine) {
        console.log('false');
        $ionicPopup.show({
            template: '',
            title: 'Network Error',
            subTitle: 'Please check your network connection and try again.',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Okay</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.loading = true;
                    }
                        }
                    ]
        });
    };

    $scope.showloader = function () {
        $ionicLoading.show({
            template: 'Loading...',
        }).then(function () {
            console.log("The loading indicator is now displayed");
        });
    };
    $scope.hideloader = function () {
        $ionicLoading.hide().then(function () {
            console.log("The loading indicator is now hidden");
        });
    };
    $scope.the = $localstorage.get('LoginUser');
    $scope.image = null;
    $scope.showAlert = function (title, msg) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: msg
        });
    };
    // Present Actionsheet for switch beteen Camera / Library
    $scope.loadImage = function () {
        var options = {
            title: 'Select Image Source',
            buttonLabels: ['Load from Library', 'Use Camera'],
            addCancelButtonWithLabel: 'Cancel',
            androidEnableCancelButton: true,
        };
        $cordovaActionSheet.show(options).then(function (btnIndex) {
            var type = null;
            if (btnIndex === 1) {
                type = Camera.PictureSourceType.PHOTOLIBRARY;
            } else if (btnIndex === 2) {
                type = Camera.PictureSourceType.CAMERA;
            }
            if (type !== null) {
                $scope.selectPicture(type);
            }
        });
    };
    // Take image with the camera or from library and store it inside the app folder
    // Image will not be saved to users Library.
    $scope.selectPicture = function (sourceType) {
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: sourceType,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function (imagePath) {
                // Grab the file name of the photo in the temporary directory
                var currentName = imagePath.replace(/^.*[\\\/]/, '');
                //Create a new name for the photo
                var d = new Date(),
                    n = d.getTime(),
                    newFileName = n + ".jpg";
                // If you are trying to load image from the gallery on Android we need special treatment!
                if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
                    window.FilePath.resolveNativePath(imagePath, function (entry) {
                        window.resolveLocalFileSystemURL(entry, success, fail);

                        function fail(e) {
                            console.error('Error: ', e);
                        }

                        function success(fileEntry) {
                            var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
                            // Only copy because of access rights
                            $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function (success) {
                                $scope.image = newFileName;
                            }, function (error) {
                                $scope.showAlert('Error', error.exception);
                            });
                        };
                    });
                } else {
                    var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    // Move the file to permanent storage
                    $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
                        $scope.image = newFileName;
                    }, function (error) {
                        $scope.showAlert('Error', error.exception);
                    });
                }
            },
            function (err) {
                // Not always an error, maybe cancel was pressed...
            })
    };
    // Returns the local path inside the app for an image
    $scope.pathForImage = function (image) {
        if (image === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + image;
        }
    };
    $scope.uploadImage = function () {
        // Destination URL
        var url = "http://pudoworld.com/moblie/upload.php";
        // File for Upload
        var targetPath = $scope.pathForImage($scope.image);
        // File name only
        var filename = $scope.image;
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: {
                'fileName': filename,
            }
        };
        $scope.showloader();
        $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
            $scope.hideloader();
            $scope.showAlert('Success', 'Image upload finished. Pending approver');
            $scope.changeimg();
        });
    }
    $scope.changeimg = function () {
        $scope.bucketListOne = new Firebase("https://pickup-dropoff.firebaseio.com/drivers");
        $scope.bucketListOne.once('value', function (snapshot) {
            var data = snapshot.val();
            //    console.log(data);
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (data[key].email === $scope.the.email) {
                        data[key].key = key;
                        //console.log(data[key].key)
                        var itemRef = new Firebase("https://pickup-dropoff.firebaseio.com/drivers" + '/' + data[key].key);
                        itemRef.update({
                            img: 'http://pudoworld.com/moblie/uploads/' + $scope.image,
                        });
                    }
                }
            };
            $scope.image = null;
            $state.reload();
        });
    };
    $scope.second = {
        email: $scope.the.email2,
        name: $scope.the.name2,
        phone: $scope.the.phone2,
        img: $scope.the.img2,
        password: $scope.the.password2
    }
    $scope.secondsave = function () {
        console.log($scope.second);
        $scope.bucketListRef = new Firebase("https://pickup-dropoff.firebaseio.com/parents");
        $scope.bucketListRef.on('value', function (snapshot) {
            var data = snapshot.val();
            //    console.log(data);
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (data[key].email === $scope.the.email) {
                        data[key].key = key;
                        //console.log(data[key].key)
                        var itemRef = new Firebase("https://pickup-dropoff.firebaseio.com/parents" + '/' + data[key].key);
                        itemRef.update({
                            name2: $scope.second.name,
                            email2: $scope.second.email,
                            phone2: $scope.second.phone,
                            img2: $scope.second.img,
                            password2: $scope.second.password
                        });
                    }
                }
            }
        })
    };
    $scope.Loguser = $localstorage.get('LoginUser')
    console.log($scope.Loguser.vendor);
    $scope.vendor = Vendors.get($scope.Loguser.vendor);
    console.log(Vendors.get($scope.Loguser.vendor));
    $scope.email = $scope.Loguser.email;
    $scope.parent = Parents.all();
    $scope.settings = {
        enableFriends: $localstorage.get('enableFriends'),
        enableTrack: $localstorage.get('enableTrack')
    };
    $scope.enabletrack = function () {
        $localstorage.set('enableTrack', $scope.settings.enableTrack);
        console.log($localstorage.get('enableTrack'));
    };
    $scope.enablefriends = function () {
        $localstorage.set('enableFriends', $scope.settings.enableFriends);
        console.log($localstorage.get('enableFriends'));
    }
})


IonicApp.controller('LoginCtrl', function ($scope, $state , $ionicPopup, $ionicModal, $ionicPopup, Childs, $ionicSlideBoxDelegate, Parents, Days, $localstorage, $firebase, $ionicAuth) {

    if (!navigator.onLine) {
        console.log('false');
        $ionicPopup.show({
            template: '',
            title: 'Network Error',
            subTitle: 'Please check your network connection and try again.',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Okay</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.loading = true;
                    }
                        }
                    ]
        });
    };

    $state.go('log.login');
    $scope.loading = true;
    $scope.days = Days.all();
    $scope.user = {
        email: '',
        password: '',
    }
    $scope.signIn = function () {
        console.log(parent);
        $scope.parent = Parents.get($scope.user.email);
        $scope.loading = false;
        if ($scope.parent !== null) {
            $scope.loading = false;
            if ($scope.user.password === $scope.parent.password) {
                setTimeout(function () {
                    var details = {
                        'email': $scope.user.email,
                        'password': $scope.user.password
                    };
                    $ionicAuth.login('basic', details);
                    $scope.loading = true;
                    $ionicPopup.show({
                        template: '',
                        title: 'Welcome',
                        subTitle: $scope.parent.lastname,
                        scope: $scope,
                        buttons: [{
                                text: '<b>Okay</b>',
                                type: 'button-positive',
                                onTap: function (e) {
                                    $localstorage.destroy('LoginUser');
                                    $localstorage.set('LoginUser', $scope.parent);
                                    console.log($localstorage.get('LoginUser'));
                                    $state.go('tab.dash');
                                    $scope.loading = true;
                                }
                        }
                    ]
                    });
                }, 700);
                $scope.user = {
                    email: '',
                    password: '',
                }
            } else {
                setTimeout(function () {
                    $scope.loading = true;
                    $ionicPopup.show({
                        template: '',
                        title: 'Login Error',
                        subTitle: 'Username or Password wrong ;',
                        scope: $scope,
                        buttons: [
                            {
                                text: '<b>Okay</b>',
                                type: 'button-positive',
                                onTap: function (e) {
                                    $scope.loading = true;
                                }
                        }
                    ]
                    });
                }, 700);
            }
        }
        if ($scope.parent === null) {
            $scope.loading = true;
            $ionicPopup.show({
                template: '',
                title: 'Login Error',
                subTitle: 'Username or Password wrong ;',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Okay</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            $scope.loading = true;
                        }
                        }
                    ]
            });
        }
    };
    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.options = {
        loop: false,
        //    effect: 'fade',
        //    speed: 500,
    }
    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
        // data.slider is the instance of Swiper
        $scope.slider = data.slider;
        console.log($scope.slider);
    });
    $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
        // note: the indexes are 0-based
        $scope.activeIndex = data.slider.activeIndex;
        $scope.previousIndex = data.slider.previousIndex;
    });
    $scope.nextSlide = function () {
        $scope.slider.slideNext();
        console.log('Next');
    }
    $scope.prevSlide = function () {
        $scope.slider.slidePrev();
        console.log('Next');
    }
})

IonicApp.controller('MapsCtrl', function ($scope, $stateParams, Childs, $ionicPopup, $ionicModal, $ionicLoading, $compile, $ionicPopup, $http, $cordovaGeolocation, Parents, Drivers, $localstorage) {

               if (!navigator.onLine) {
        console.log('false');
        $ionicPopup.show({
            template: '',
            title: 'Network Error',
            subTitle: 'Please check your network connection and try again.',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Okay</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.loading = true;
                    }
                        }
                    ]
        });
    };

    $scope.MyDriver = $localstorage.get('LoginUser');
    $scope.parent = Parents.all();
    $scope.children = Childs.all();
    console.log($scope.children);
    console.log($scope.children.$watch);
    console.log($scope.children.length);
    $scope.Dev = Drivers.all();
    var d = $scope.MyDriver.$id;
    $scope.addLocation = function (getlat, getlng) {
        var getlocation = [getlat, getlng];
        $scope.Dev = Drivers.add(d, getlocation);
        $scope.bucketListOne = new Firebase("https://pickup-dropoff.firebaseio.com/drivers");
        $scope.bucketListOne.once('value', function (snapshot) {
            var data = snapshot.val();
            //    console.log(data);
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (data[key].email === $scope.the.email) {
                        data[key].key = key;
                        //console.log(data[key].key)
                        var itemRef = new Firebase("https://pickup-dropoff.firebaseio.com/drivers" + '/' + data[key].key + '/location');
                        itemRef.once('value', function (snapshot) {
                            var data2 = snapshot.val();
                            var stores = []
                            var size = 0;
                            for (i in data2) {
                                size++
                                stores.push({
                                    i
                                })
                                //    console.log(stores);
                                //    console.log(i);
                                if (size > 4) {
                                    var itemRef2 = new Firebase("https://pickup-dropoff.firebaseio.com/drivers" + '/' + data[key].key + '/location/' + stores[0].i);
                                    itemRef2.remove();
                                }
                            }
                        })
                    }
                }
            };
        });
    };
    $scope.inition = function () {
        ionic.Platform.ready(function () {
            var options = {
                timeout: 10000,
                enableHighAccuracy: true
            };
            $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                $scope.positions = position;
                console.log($scope.positions);
                $scope.myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var startPos = [position.coords.latitude, position.coords.longitude];
                var speed = 60; // km/h
                var delay = 100;

                function animateMarker(marker, coords, km_h) {
                    var target = 0;
                    var km_h = km_h || 50;
                    //coords.push([startPos[0], startPos[1]]);
                    console.log(coords);

                    function goToPoint() {
                        var lat = marker.position.lat();
                        var lng = marker.position.lng();
                        var step = (km_h * 1000 * delay) / 3600000; // in meters
                        var dest = new google.maps.LatLng(
                            coords[target][0], coords[target][1]);
                        var distance =
                            google.maps.geometry.spherical.computeDistanceBetween(
                                dest, marker.position); // in meters
                        var numStep = distance / step;
                        var i = 0;
                        var deltaLat = (coords[target][0] - lat) / numStep;
                        var deltaLng = (coords[target][1] - lng) / numStep;

                        function moveMarker() {
                            lat += deltaLat;
                            lng += deltaLng;
                            i += step;
                            if (i < distance) {
                                marker.setPosition(new google.maps.LatLng(lat, lng));
                                setTimeout(moveMarker, delay);
                            } else {
                                marker.setPosition(dest);
                                target++;
                                if (target == coords.length) {
                                    target = 0;
                                }
                                setTimeout(goToPoint, delay);
                            }
                        }
                        moveMarker();
                        return true;
                    }
                    goToPoint();
                    return true;
                }
                var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var mapOptions = {
                    center: myLatlng,
                    zoom: 17,
                    center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(startPos[0], startPos[1]),
                    map: map,
                    animation: google.maps.Animation.DROP
                });
                $scope.loChange = [
                    [position.coords.latitude, position.coords.longitude],
            ];
                setInterval(function () {
                    var watchOptions = {
                        timeout: 10000,
                        enableHighAccuracy: false // may cause errors if true
                    };
                    //$cordovaGeolocation.watchPosition(watchOptions).then(function (position) { // casue i caount text it.
                    $cordovaGeolocation.getCurrentPosition(watchOptions).then(function (position) {
                        $scope.Newpositions = position;
                        $scope.loChange.push([
                                6.440788, 3.458758
                            ]);
                        $scope.addLocation($scope.Newpositions.coords.latitude, $scope.Newpositions.coords.longitude);
                        //console.log($scope.loChange);
                    })
                }, 10000);
                google.maps.event.addListenerOnce(map, 'idle', function () {
                    animateMarker(marker, $scope.loChange, speed);
                });
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    map: map,
                    travelMode: 'DRIVING',
                    animation: google.maps.Animation.DROP,
                    title: "My Location"
                });
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay
                directionsDisplay = new google.maps.DirectionsRenderer({
                    map: map
                });
                $scope.onChangeHandler = function () {
                    calculateAndDisplayRoute(directionsService, directionsDisplay);
                };
                $scope.waypts = [];
                var weekday = new Array(7);
                weekday[0] = "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";
                $scope.today = new Date();
                var sds = $scope.today.getDay();
                sru = weekday[sds].toLowerCase();
                //for (var i = 0; i < childs.length; i++) {
                //if (childs[i].email === childId) {
                //}
                //    }
                $scope.waypts.push({
                    location: 'ikeja , Lagos',
                    stopover: false
                })
                //console.log($scope.waypts);
                function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                    directionsService.route({
                        origin: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        destination: new google.maps.LatLng(6.440788, 3.458758),
                        waypoints: $scope.waypts,
                        optimizeWaypoints: true,
                        travelMode: google.maps.TravelMode.DRIVING
                    }, function (response, status) {
                        if (status === 'OK') {
                            directionsDisplay.setDirections(response);
                            //console.log(response);
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    });
                }
                var mapOptions = {
                    center: $scope.myLatlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                $scope.onChangeHandler();
                //Marker + infowindow + angularjs compiled ng-click
                var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
                var compiled = $compile(contentString)($scope);
                var infowindow = new google.maps.InfoWindow({
                    content: compiled[0]
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });
                $scope.map = map;
            });
        })
    }
    $scope.clickTest = function () {
        //var finds = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + $scope.positions.coords.latitude + ',' + $scope.positions.coords.longitude + '&location_type=ROOFTOP&result_type=street_address&key=AIzaSyCeNLDm-PF5BAaSV6VxhqCBVEVs4v8Vne0'
        var finds = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + $scope.positions.coords.latitude + ',' + $scope.positions.coords.longitude + '&key=AIzaSyCeNLDm-PF5BAaSV6VxhqCBVEVs4v8Vne0'
        console.log(finds);
        $http.get(finds)
            .success(function (newItems) {
                $scope.newItems = newItems.results[0].address_components;
                //console.log($scope.newItems);
                $scope.address = $scope.newItems[1].long_name + ' ' + $scope.newItems[3].long_name + ' ' + $scope.newItems[5].long_name + ' ' + $scope.newItems[6].long_name
                console.log($scope.address);
            }).then(function () {
                $ionicPopup.show({
                    template: '',
                    title: 'Location',
                    subTitle: $scope.address,
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>Okay</b>',
                            type: 'button-positive',
                            onTap: function (e) {}
                        }
                    ]
                });
            })
    };
})
