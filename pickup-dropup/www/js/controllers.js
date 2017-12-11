var IonicApp = angular.module('starter.controllers', ['firebase', 'ionic.cloud']);

IonicApp.controller('DashCtrl', function ($scope, $cordovaLocalNotification, $ionicPopup, $localstorage, $ionicAuth, $ionicPush, Schools, Childs, Parents) {
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

    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;

    //     $scope.range = function() {
    //    var rangeSize = 5;
    //    var ret = [];
    //    var start;
    //
    //    start = $scope.currentPage;
    //    if ( start > $scope.pageCount()-rangeSize ) {
    //      start = $scope.pageCount()-rangeSize;
    //    }
    //
    //    for (var i=start; i<start+rangeSize; i++) {
    //      ret.push(i);
    //    }
    //    return ret;
    //  };



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

    //      $scope.setPage = function(n) {
    //    if (n > 0 && n < $scope.pageCount()) {
    //      $scope.currentPage = n;
    //    }
    //  };

    //  $scope.$watch("currentPage", function(newValue, oldValue) {
    //    $scope.pagedItems = Item.get(newValue*$scope.itemsPerPage, $scope.itemsPerPage);
    //    $scope.total = Item.total();
    //  });


    $scope.Loguser = $localstorage.get('LoginUser');
    console.log($scope.Loguser);
    $scope.childs = Childs.all();
    console.log($scope.childs);
    $scope.add = function () {
        var alarmTime = new Date();
        alarmTime.setSeconds(alarmTime.getSeconds() + 3);
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
                $scope.add();
})

IonicApp.controller('ChildDetailCtrl', function ($scope, $stateParams, Childs, $ionicPopup, $ionicModal, $ionicLoading, $compile, $ionicPopup, $http, $cordovaGeolocation, Parents, Drivers) {

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
    //    setInterval(function () {
    //
    //        if (!navigator.onLine) {
    //            console.log('false');
    //            $ionicPopup.show({
    //                template: '',
    //                title: 'Network Error',
    //                subTitle: 'Please check your network connection and try again.',
    //                scope: $scope,
    //                buttons: [
    //                    {
    //                        text: '<b>Okay</b>',
    //                        type: 'button-positive',
    //                        onTap: function (e) {
    //                            $scope.loading = true;
    //                        }
    //                        }
    //                    ]
    //            });
    //        };
    //
    //    }, 22000);

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.parent = Parents.all();

    $scope.child = Childs.get($stateParams.childId);

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
                    coords.push([startPos[0], startPos[1]]);

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

                $scope.dev = Drivers.all();

                //    setTimeout(function ()
                //                var dever = Drivers.get($scope.child.driver)
                //                console.log(dever);
                //                $scope.coloo = dever.location || 0;
                //                console.log($scope.coloo);
                //
                //                                $scope.getloct = function () {
                //                                    for (let i in $scope.coloo) {
                //                                        console.log([$scope.coloo[i]]);
                //                                        $scope.loChange.push([$scope.coloo[i]]);
                //                                    }
                //                                };
                //                                $scope.getloct();

                $scope.loChange = [[position.coords.latitude, position.coords.longitude],
                                  [position.coords.latitude, position.coords.longitude], ];
                console.log($scope.loChange);

                google.maps.event.addListenerOnce(map, 'idle', function () {
                    animateMarker(marker, $scope.loChange, speed);
                });

                var mapOptions = {
                    center: $scope.myLatlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("map"), mapOptions);


                map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: "My Location"
                });


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
        //        var finds = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + $scope.positions.coords.latitude + ',' + $scope.positions.coords.longitude + '&location_type=ROOFTOP&result_type=street_address&key=AIzaSyCeNLDm-PF5BAaSV6VxhqCBVEVs4v8Vne0'
        var finds = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + $scope.positions.coords.latitude + ',' + $scope.positions.coords.longitude + '&key=AIzaSyCeNLDm-PF5BAaSV6VxhqCBVEVs4v8Vne0'
        console.log(finds);
        $http.get(finds)
            .success(function (newItems) {
                $scope.newItems = newItems.results[0].address_components;
                //                    console.log($scope.newItems);
                $scope.address = $scope.newItems[0].long_name + ' , ' + $scope.newItems[1].long_name + ' , ' + $scope.newItems[2].long_name + ' , ' + $scope.newItems[3].long_name + ' , ' + $scope.newItems[4].long_name + ' , ' + $scope.newItems[5].long_name || ''
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

IonicApp.controller('BroadcastsCtrl', function ($scope, Feeds, $http, $ionicPopup, $sce, Feeds, Childs, Parents) {

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

    $scope.parent = Parents.all();
    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }
    $scope.feedData = Feeds.all();

    //    var f = Feeds.sorted();
    //
    //    console.log(f);

    $scope.likedised = 0
    $scope.disliked = 0
    console.log($scope.feedData);
    $scope.like = function (d) {
        if ($scope.likedised === 0) {
            var c = d
            console.log(c);
            $scope.currentfeed = Feeds.get(d);
            $scope.currentfeed.like += 1;
            $scope.currentfeed.dislike -= 1;

            if ($scope.currentfeed.dislike < 0) {
                $scope.currentfeed.dislike = 0;
            }
            console.log($scope.currentfeed);
            $scope.likedised = 1;
            $scope.disliked = 0;
        }
    }
    $scope.dislike = function (d) {
        if (!$scope.disliked) {
            var c = d
            console.log(c);
            $scope.currentfeed = Feeds.get(d);
            $scope.currentfeed.dislike += 1;
            $scope.currentfeed.like -= 1;
            if ($scope.currentfeed.like < 0) {
                $scope.currentfeed.like = 0;
            }
            console.log($scope.currentfeed);
            $scope.likedised = 0;
            $scope.disliked = 1;
        }
    }
    $scope.doRefresh = function () {
        $http.get('/new-items')
            .success(function (newItems) {
                $scope.childs = Childs.all();
            })
            .finally(function () {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    };
})

IonicApp.controller('BroadcastDetailCtrl', function ($scope, $stateParams, $ionicPopup, Feeds, Parents) {

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

    $scope.parent = Parents.all();
    $scope.feed = Feeds.get($stateParams.feedId);
})

IonicApp.controller('SideCtrl', function ($scope, $state, $ionicPush, $ionicPopup, $stateParams, Feeds, Childs, Parents, Parents, $localstorage, $ionicAuth, Days) {

    $scope.days = Days.all();
    $ionicPush.register().then(function (t) {
        alarm('done');
    })
    $scope.$on('cloud:push:notification', function (event, data) {
        var msg = data.message;
        alert(msg.title + ': ' + msg.text);
    });

    $scope.Loguser = $localstorage.get('LoginUser')
    $scope.email = $scope.Loguser.email;
    console.log($scope.email);
    $scope.parent = Parents.all();
    $scope.childs = Childs.all();
    $scope.login = function () {
        $ionicPush.unregister();
        console.log('working');
        $localstorage.destroy('LoginUser')
        $localstorage.destroy('level');
        $ionicAuth.logout();
        $localstorage.destroy('level');
        $state.go('log.login');
    };
})

IonicApp.controller('AccountCtrl', function ($scope, Parents, $localstorage, $ionicPopup, $ionicModal, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet, $ionicLoading) {

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

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
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

    $scope.leveler = $localstorage.get('level');

    console.log($scope.leveler);

    $scope.image = null;

    $scope.showAlert = function (title, msg) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: msg
        });
    };

    // Present Actionsheet for switch beteen Camera / Library
    $scope.loadImage = function (inp) {
        $scope.picked = inp
        console.log($scope.picked)
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

    $scope.uploadImage2 = function () {
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
        $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
            $scope.changeimg();
        });
    }

    $scope.changeimg = function () {
        $scope.bucketListOne = new Firebase("https://pickup-dropoff.firebaseio.com/parents");
        $scope.bucketListOne.once('value', function (snapshot) {
            var data = snapshot.val();
            console.log(data);
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (data[key].email === $scope.the.email) {
                        data[key].key = key;
                        console.log(data[key].key)
                        var itemRef = new Firebase("https://pickup-dropoff.firebaseio.com/parents" + '/' + data[key].key);
                        if ($scope.leveler === '1') {
                            itemRef.update({
                                img: 'http://pudoworld.com/moblie/uploads/' + $scope.image,
                            })
                        } else {
                            itemRef.update({
                                img2: 'http://pudoworld.com/moblie/uploads/' + $scope.image,
                            })
                        }
                    }
                }
            };
            $scope.image = null;
            $state.reload();
        });
    };

    $scope.the = $localstorage.get('LoginUser');

    $scope.second = {
        email: $scope.the.email2,
        name: $scope.the.name2,
        phone: $scope.the.phone2,
        img: $scope.the.img2,
        password: $scope.the.password2
    };

    $scope.secondsave = function () {
        console.log($scope.second);
        $scope.bucketListRef = new Firebase("https://pickup-dropoff.firebaseio.com/parents");
        $scope.bucketListRef.once('value', function (snapshot) {
            var data = snapshot.val();
            console.log(data);
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (data[key].email === $scope.the.email) {
                        data[key].key = key;
                        console.log(data[key].key)
                        var itemRef = new Firebase("https://pickup-dropoff.firebaseio.com/parents" + '/' + data[key].key);
                        itemRef.update({
                            name2: $scope.second.name,
                            email2: $scope.second.email,
                            phone2: $scope.second.phone,
                            password2: $scope.second.password
                        });

                        $ionicPopup.show({
                            template: '',
                            title: 'Second Account',
                            subTitle: 'Linked Successful',
                            scope: $scope,
                            buttons: [
                                {
                                    text: '<b>Okay</b>',
                                    type: 'button-positive',
                                    onTap: function (e) {}
                        }
                    ]
                        });
                        $scope.uploadImage2();
                    }
                }
            }
        })
    };

    $scope.onesave = function () {
        console.log($scope.second);
        $ionicPopup.show({
            template: '',
            title: 'Warning',
            subTitle: 'Account will be suspended pending Approval',
            scope: $scope,
            buttons: [{
                    text: '<b>Cancel</b>',
            },
                {
                    text: '<b>Okay</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.bucketListRef = new Firebase("https://pickup-dropoff.firebaseio.com/parents");
                        $scope.bucketListRef2 = new Firebase("https://pickup-dropoff.firebaseio.com/childs");
                        $scope.bucketListRef.once('value', function (snapshot) {
                            var data = snapshot.val();
                            console.log(data);
                            for (var key in data) {
                                if (data.hasOwnProperty(key)) {
                                    if (data[key].email === $scope.the.email) {
                                        data[key].key = key;
                                        console.log(data[key].key)
                                        var itemRef = new Firebase("https://pickup-dropoff.firebaseio.com/parents" + '/' + data[key].key);
                                        itemRef.update({
                                            email: $scope.the.email,
                                            phone: $scope.the.phone
                                        });
                                    }
                                }
                            }
                        })
                        $scope.bucketListRef2.once('value', function (snapshot) {
                            var data = snapshot.val();
                            console.log(data);
                            for (var key in data) {
                                if (data.hasOwnProperty(key)) {
                                    if (data[key].parent === $scope.the.email) {
                                        data[key].key = key;
                                        console.log(data[key].key)
                                        var itemRef = new Firebase("https://pickup-dropoff.firebaseio.com/childs" + '/' + data[key].key);
                                        itemRef.update({
                                            approve: false,
                                            parent: $scope.the.email,
                                        });
                                    }
                                }
                            }
                        })
                        $localstorage.set('LoginUser', $scope.the);
                    }
                        }
                    ]
        });

    };
    $scope.Loguser = $localstorage.get('LoginUser')
    $scope.email = $scope.Loguser.email;
    console.log($scope.email);
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

IonicApp.controller('LoginCtrl', function ($scope, $state, $ionicModal, $ionicPopup, Schools, Childs, $ionicSlideBoxDelegate, Parents, Schools, Days, $localstorage, $firebase, $ionicAuth, $ionicPush, $ionicUser, $http) {


    $scope.passrest='';

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

    $scope.passwordReset = function (passrest) {
        var demail = passrest;
//        console.log(d);
        $http({
            method: 'GET',
            url: 'https://pudoworld.com/view/resetpass.php?email='+demail,
        }).then(function successCallback(response) {
           $scope.passrest ='';
            $ionicPopup.show({
            template: '',
            title: 'Password Reset Successful',
            subTitle: 'Please check your email.',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Okay</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.modal.hide();
                        $scope.modal2.hide();
                    }
                        }
                    ]
        });
        }, function errorCallback(response) {
            $scope.passrest ='';
            $ionicPopup.show({
            template: '',
            title: 'Password Reset Successful',
            subTitle: 'Please check your email.',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Okay</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.modal.hide();
                        $scope.modal2.hide();
                    }
                        }
                    ]
        });
        });
    }

    $scope.days = Days.all();
    $scope.demogender = 'Male';

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        for (var i = 0; i < 8; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    $state.reload();
    $scope.loading = true;
    $scope.access = function () {
        $scope.Loguser = $localstorage.get('LoginUser');
        $state.go('log.access');
    };
    $scope.register = {
        parent: {
            img: "https://png.icons8.com/guardian/dusk/400",
            img2: "-",
            email2: "email",
            name2: "name",
            password2: "password",
            phone2: "phone",
            id: 'P-' + makeid(),

        },
        student: {
            address: {
                dropoff: {
                    address1: "",
                    address2: "",
                },
                pickup: {
                    address1: "",
                    address2: "",
                },
            }
        },
        status: 'unused',
    }
    $scope.print = function () {
        if (navigator.onLine) {
            setTimeout(function () {
                $scope.loading = false;
                console.log($scope.register);
                $scope.datas = Parents.all();
                var details = {
                    'email': $scope.register.parent.email,
                    'password': $scope.register.parent.password,
                    'image': '',
                    'name': $scope.register.parent.first_name + ' ' + $scope.register.parent.lastname
                };
                console.log(details);
                $ionicAuth.signup(details).then(function () {
                    // `$ionicUser` is now registered
                    $scope.addItem = function () {
                        $scope.datas.$add($scope.register.parent);
                    };

                    $scope.addItem();

                    $http({
                        method: 'GET',
                        url: 'https://pudoworld.com/view/mailing.php?name=' + details.name + '&email=' + $scope.register.parent.email + '&phone=' + $scope.register.parent.phone + '&userid=' + $scope.register.parent.id,
                    }).then(function successCallback(response) {
                        console.log("msg sent!");
                    }, function errorCallback(response) {
                        console.log("error with sending a msg");
                    });

                    $scope.datas2 = Childs.all();
                    $scope.addItem2 = function () {
                        if ($scope.register.student.gender === $scope.demogender) {
                            $scope.register.student.face = "img/boy.png";
                        } else {
                            $scope.register.student.face = "img/girl.png";
                        }
                        $scope.datas2.$add({
                            "address": {
                                "dropoff": {
                                    "address1": "$scope.register.",
                                    "address2": "afterschool"
                                },
                                "pickup": {
                                    "address1": "home1",
                                    "address2": "home2"
                                }
                            },
                            "approve": false,
                            "class": $scope.register.student.class,
                            "gender": $scope.register.student.gender,
                            "face": $scope.register.student.face,
                            "location": [],
                            "name": $scope.register.student.name,
                            "parent": $scope.register.parent.email,
                            "route": {
                                "monday": {
                                    "id": 0,
                                    "late": $scope.days[0].late,
                                    "status": $scope.days[0].status,
                                    "dropoff": {
                                        "address": $scope.days[0].dropoff,
                                        "status": true
                                    },
                                    "pickup": {
                                        "address": $scope.days[0].pickup,
                                        "status": true
                                    }
                                },
                                "tuesday": {
                                    "id": 1,
                                    "late": $scope.days[1].late,
                                    "status": $scope.days[1].status,
                                    "dropoff": {
                                        "address": $scope.days[1].dropoff,
                                        "status": true
                                    },
                                    "pickup": {
                                        "address": $scope.days[1].pickup,
                                        "status": true
                                    }
                                },
                                "wednesday": {
                                    "id": 2,
                                    "late": $scope.days[2].late,
                                    "status": $scope.days[2].status,
                                    "dropoff": {
                                        "address": $scope.days[2].dropoff,
                                        "status": true
                                    },
                                    "pickup": {
                                        "address": $scope.days[2].pickup,
                                        "status": true
                                    }
                                },
                                "thursday": {
                                    "id": 3,
                                    "late": $scope.days[3].late,
                                    "status": $scope.days[3].status,
                                    "dropoff": {
                                        "address": $scope.days[3].dropoff,
                                        "status": true
                                    },
                                    "pickup": {
                                        "address": $scope.days[3].pickup,
                                        "status": true
                                    }
                                },
                                "friday": {
                                    "id": 4,
                                    "late": $scope.days[4].late,
                                    "status": $scope.days[4].status,
                                    "dropoff": {
                                        "address": $scope.days[4].dropoff,
                                        "status": true
                                    },
                                    "pickup": {
                                        "address": $scope.days[4].pickup,
                                        "status": true
                                    }
                                },
                                "saturday": {
                                    "id": 5,
                                    "late": $scope.days[5].late,
                                    "status": $scope.days[5].status,
                                    "dropoff": {
                                        "address": $scope.days[5].dropoff,
                                        "status": true
                                    },
                                    "pickup": {
                                        "address": $scope.days[5].pickup,
                                        "status": true
                                    }
                                },
                                "sunday": {
                                    "id": 6,
                                    "late": '',
                                    "status": '',
                                    "dropoff": {
                                        "address": '',
                                        "status": ''
                                    },
                                    "pickup": {
                                        "address": '',
                                        "status": ''
                                    }
                                },

                            },
                            "school": $scope.register.student.school,
                            "status": "Awaiting Approval",
                            "vendor": "none",
                            "driver": "none",
                            "time": 'none',
                            "id": 'C-' + makeid(),
                        });
                    }
                    $scope.addItem2();
                    $scope.loading = true;
                    $ionicPopup.show({
                        template: '',
                        title: 'Registration completed ',
                        subTitle: 'Verification pending;',
                        scope: $scope,
                        buttons: [
                            {
                                text: '<b>Okay</b>',
                                type: 'button-positive',
                                onTap: function (e) {
                                    $scope.loading = true;
                                    $scope.prevSlide();
                                }
                        }
                    ]
                    });
                }, function (err) {
                    for (var e of err.details) {
                        if (e === 'conflict_email') {
                            $scope.loading = true;

                            $ionicPopup.show({
                                template: '',
                                title: 'conflict email',
                                subTitle: 'Email already exists..',
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
                        } else {
                            // handle other errors
                        }
                    }
                });
            })
        } else {
            console.log('false');
            $scope.loading = true;

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
        }
    }
    $scope.print2 = function () {
        if (navigator.onLine) {
            $scope.parent = Parents.get($scope.register.parent.email);
            console.log(parent);
            if ($scope.parent === null) {
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
            } else {
                $scope.loading = false;
                if ($scope.register.parent.password === $scope.parent.password) {
                    setTimeout(function () {
                        $scope.loading = true;
                        $scope.datas3 = Childs.all();
                        $scope.addItem3 = function () {
                            if ($scope.register.student.gender === $scope.demogender) {
                                $scope.register.student.face = "img/boy.png";
                            } else {
                                $scope.register.student.face = "img/girl.png";
                            }
                            $scope.datas3.$add({
                                "address": {
                                    "dropoff": {
                                        "address1": $scope.register.student.address.dropoff.address1 || "",
                                        "address2": $scope.register.student.address.dropoff.address2 || ""
                                    },
                                    "pickup": {
                                        "address1": $scope.register.student.address.pickup.address1 || "",
                                        "address2": $scope.register.student.address.pickup.address2 || ""
                                    }
                                },
                                "approve": false,
                                "class": $scope.register.student.class,
                                "gender": $scope.register.student.gender,
                                "face": $scope.register.student.face,
                                "location": [],
                                "name": $scope.register.student.name,
                                "parent": $scope.register.parent.email,
                                "route": {
                                    "monday": {
                                        "id": 0,
                                        "late": $scope.days[0].late,
                                        "status": $scope.days[0].status,
                                        "dropoff": {
                                            "address": $scope.days[0].dropoff,
                                            "status": true
                                        },
                                        "pickup": {
                                            "address": $scope.days[0].pickup,
                                            "status": true
                                        }
                                    },
                                    "tuesday": {
                                        "id": 1,
                                        "late": $scope.days[1].late,
                                        "status": $scope.days[1].status,
                                        "dropoff": {
                                            "address": $scope.days[1].dropoff,
                                            "status": true
                                        },
                                        "pickup": {
                                            "address": $scope.days[1].pickup,
                                            "status": true
                                        }
                                    },
                                    "wednesday": {
                                        "id": 2,
                                        "late": $scope.days[2].late,
                                        "status": $scope.days[2].status,
                                        "dropoff": {
                                            "address": $scope.days[2].dropoff,
                                            "status": true
                                        },
                                        "pickup": {
                                            "address": $scope.days[2].pickup,
                                            "status": true
                                        }
                                    },
                                    "thursday": {
                                        "id": 3,
                                        "late": $scope.days[3].late,
                                        "status": $scope.days[3].status,
                                        "dropoff": {
                                            "address": $scope.days[3].dropoff,
                                            "status": true
                                        },
                                        "pickup": {
                                            "address": $scope.days[3].pickup,
                                            "status": true
                                        }
                                    },
                                    "friday": {
                                        "id": 4,
                                        "late": $scope.days[4].late,
                                        "status": $scope.days[4].status,
                                        "dropoff": {
                                            "address": $scope.days[4].dropoff,
                                            "status": true,
                                        },
                                        "pickup": {
                                            "address": $scope.days[4].pickup,
                                            "status": true
                                        }
                                    },
                                    "saturday": {
                                        "id": 5,
                                        "late": $scope.days[5].late,
                                        "status": $scope.days[5].status,
                                        "dropoff": {
                                            "address": $scope.days[5].dropoff,
                                            "status": true
                                        },
                                        "pickup": {
                                            "address": $scope.days[5].pickup,
                                            "status": true
                                        }
                                    },
                                    "sunday": {
                                        "id": 6,
                                        "late": '',
                                        "status": '',
                                        "dropoff": {
                                            "address": '',
                                            "status": ''
                                        },
                                        "pickup": {
                                            "address": '',
                                            "status": ''
                                        }
                                    },

                                },
                                "school": $scope.register.student.school,
                                "status": "Awaiting Approval",
                                "vendor": "none",
                                "driver": "none",
                                "time": 'none',
                                "id": 'C-' + makeid(),
                            });
                        }
                        $scope.addItem3();
                        $ionicPopup.show({
                            template: '',
                            title: 'Registration completed ',
                            subTitle: 'Verification pending ;',
                            scope: $scope,
                            buttons: [{
                                    text: '<b>Okay</b>',
                                    type: 'button-positive',
                                    onTap: function (e) {
                                        $scope.loading = true;
                                        //                                        $scope.register = {
                                        //                                            parent: {
                                        //                                                img: "https://png.icons8.com/guardian/dusk/400",
                                        //                                                img2: "-",
                                        //                                                email2: "email",
                                        //                                                name2: "name",
                                        //                                                password2: "password",
                                        //                                                phone2: "phone"
                                        //                                            },
                                        //                                            student: {
                                        //                                                address: {
                                        //                                                    dropoff: {
                                        //                                                        address1: "",
                                        //                                                        address2: "",
                                        //                                                    },
                                        //                                                    pickup: {
                                        //                                                        address1: "",
                                        //                                                        address2: "",
                                        //                                                    },
                                        //                                                }
                                        //                                            },
                                        //                                            status: 'unused',
                                        //                                        }
                                        //
                                        //                                        $scope.modal2.hide();

                                    }
                        }
                    ]
                        });
                    }, 700);
                } else {
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
            }
        } else {
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
        }
    };
    console.log($scope.register);
    $scope.schools = Schools.all();

    //    setInterval(function () {
    //        console.log($scope.days[0].pickup);
    //    }, 3000);

    $scope.user = {
        email: '',
        password: '',
    }
    $scope.signIn = function () {
        if (navigator.onLine) {
            console.log(parent);
            $scope.parent = Parents.get($scope.user.email);
            $scope.parent2 = Parents.get2($scope.user.email);
            console.log($scope.parent2);
            $scope.loading = false;
            if ($scope.parent !== null) {
                $scope.loading = false;
                if ($scope.user.password === $scope.parent.password) {
                    setTimeout(function () {
                        var details = {
                            'email': $scope.parent.email,
                            'password': $scope.parent.password
                        };
                        $ionicAuth.login('basic', details).then(function () {
                            $ionicPush.register().then(function (t) {
                                alarm('done');
                                alarm(t);
                            })
                            $scope.$on('cloud:push:notification', function (event, data) {
                                var msg = data.message;
                                alert(msg.title + ': ' + msg.text);
                            });
                            console.log($ionicUser.details.name);
                        });
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
                                        $localstorage.set('AccessUser', $scope.parent);
                                        $localstorage.set('level', '1');
                                        console.log($localstorage.get('LoginUser'));
                                        $scope.user = {
                                            email: '',
                                            password: '',
                                        }
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
            } else {
                if ($scope.parent2 !== null) {
                    $scope.loading = false;
                    if ($scope.user.password === $scope.parent2.password2) {
                        setTimeout(function () {
                            $scope.loading = true;
                            $scope.logTow = {
                                email: $scope.parent2.email,
                                email2: $scope.parent2.email2,
                                first_name: $scope.parent2.name2,
                                lastname: $scope.parent2.name2,
                                img: $scope.parent2.img2,
                                img2: $scope.parent2.img2,
                                name: $scope.parent2.name2,
                                name2: $scope.parent2.name2,
                                password: $scope.parent2.password2,
                            };
                            $ionicPopup.show({
                                template: '',
                                title: 'Welcome',
                                subTitle: $scope.parent2.name2,
                                scope: $scope,
                                buttons: [
                                    {
                                        text: '<b>Okay</b>',
                                        type: 'button-positive',
                                        onTap: function (e) {
                                            $localstorage.destroy('LoginUser');
                                            $localstorage.set('LoginUser', $scope.logTow);
                                            $localstorage.set('AccessUser', $scope.logTow);
                                            $localstorage.set('level', '2');
                                            console.log($localstorage.get('LoginUser'));
                                            $scope.user = {
                                                email: '',
                                                password: '',
                                            }

                                            $scope.register = {
                                                parent: {
                                                    img: "https://png.icons8.com/guardian/dusk/400",
                                                    img2: "-",
                                                    email2: "email",
                                                    name2: "name",
                                                    password2: "password",
                                                    phone2: "phone"
                                                },
                                                student: {
                                                    address: {
                                                        dropoff: {
                                                            address1: "",
                                                            address2: "",
                                                        },
                                                        pickup: {
                                                            address1: "",
                                                            address2: "",
                                                        },
                                                    }
                                                },
                                                status: 'unused',
                                            }
                                            $state.go('tab.dash');
                                            $scope.loading = true;
                                        }
                        }
                    ]
                            });
                        }, 700);
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
                } else {
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
            }
        } else {
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
        }
    };

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modal2.html', {
        scope: $scope
    }).then(function (modal2) {
        $scope.modal2 = modal2;
    });
    $scope.options = {
        loop: false,
        //            effect: 'fade',
        //            speed: 500,
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

IonicApp.controller('AccessCtrl', function ($scope, $state, $ionicModal, $ionicPopup, Schools, Childs, $ionicSlideBoxDelegate, Parents, Schools, Days, $localstorage) {

    $scope.childs = Childs.all()
    $scope.backlogin = function () {
        $state.go('log.login');
    };
    $scope.access = function () {
        console.log($localstorage.get('AccessUser'));
        $scope.the = $localstorage.get('AccessUser');
        console.log($scope.the);
        $state.go('log.access');
    };
    $scope.access();

    $scope.school = Schools.all();

    console.log($scope.school);
    $scope.viewSchool = function () {
        $scope.bucketListOne = new Firebase("https://pickup-dropoff.firebaseio.com/childs");
        $scope.bucketListOne.once('value', function (snapshot) {
            var data = snapshot.val();
            console.log(data);
            $scope.viewsch = []
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (data[key].parent === $scope.the.email) {
                        console.log(data[key]['school'])
                        var d = Schools.getName(data[key]['school']);
                        if (d !== null) {
                            $scope.viewsch.push({
                                school: d
                            })
                        }
                    }
                }
            };
            console.log($scope.viewsch)
        })
    };
    $scope.viewSchool();
})

IonicApp.controller('AccessDetailCtrl', function ($scope, $state, $stateParams, $ionicModal, $ionicPopup, Schools, Childs, $ionicSlideBoxDelegate, Parents, Schools, Days, $localstorage) {

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modal2.html', {
        scope: $scope
    }).then(function (modal2) {
        $scope.modal2 = modal2;
    });
    $scope.getchild = function (vald) {

        $scope.mechild = Childs.get(vald);
        console.log(vald);
        $scope.modal2.show();
    }
    $scope.currentSch = Schools.get($stateParams.schoolId);
    $scope.childs = Childs.all()
    $scope.backlogin = function () {
        $state.go('log.access');
    };
    console.log($localstorage.get('AccessUser'));
    $scope.the = $localstorage.get('AccessUser');
    console.log($scope.the);
    $scope.parent = Parents.all();
    console.log($scope.currentSch);

})

IonicApp.controller('MapCtrl', function ($scope, $ionicPopup) {
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

    //
    //    $scope.initMap = function () {
    //        var center = new google.maps.LatLng(51.514032, -0.128383);
    //        var circle = new google.maps.Circle({
    //            center: center,
    //            radius: 50
    //        });
    //
    //        var options = {
    //            types: ['geocode']
    //        }
    //
    //        var input = document.getElementById('autocomplete');
    //        var autocomplete = new google.maps.places.Autocomplete(input, options);
    //        autocomplete.setBounds(circle.getBounds());
    //
    //        var input2 = document.getElementById('autocomplete2');
    //        var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
    //        autocomplete2.setBounds(circle.getBounds());
    //
    //        var input3 = document.getElementById('autocomplete3');
    //        var autocomplete3 = new google.maps.places.Autocomplete(input3, options);
    //        autocomplete3.setBounds(circle.getBounds());
    //
    //        var input4 = document.getElementById('autocomplete4');
    //        var autocomplete4 = new google.maps.places.Autocomplete(input4, options);
    //        autocomplete4.setBounds(circle.getBounds());
    //
    //    }
    //    var mapDiv = document.getElementById('addChild');
    //    google.maps.event.addDomListener(mapDiv, 'click', $scope.initMap);

});

IonicApp.controller('MapCtrled', function ($scope, $ionicPopup) {

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

    //
    //    $scope.initMap = function () {
    //        var center = new google.maps.LatLng(51.514032, -0.128383);
    //        var circle = new google.maps.Circle({
    //            center: center,
    //            radius: 50
    //        });
    //
    //        var options = {
    //            types: ['geocode']
    //        }
    //
    //        var input5 = document.getElementById('autocomplete5');
    //        var autocomplete5 = new google.maps.places.Autocomplete(input5, options);
    //        autocomplete5.setBounds(circle.getBounds());
    //
    //        var input6 = document.getElementById('autocomplete6');
    //        var autocomplete6 = new google.maps.places.Autocomplete(input6, options);
    //        autocomplete6.setBounds(circle.getBounds());
    //
    //        var input7 = document.getElementById('autocomplete7');
    //        var autocomplete7 = new google.maps.places.Autocomplete(input7, options);
    //        autocomplete7.setBounds(circle.getBounds());
    //
    //        var input8 = document.getElementById('autocomplete8');
    //        var autocomplete8 = new google.maps.places.Autocomplete(input8, options);
    //        autocomplete8.setBounds(circle.getBounds());
    //    }
    //    var mapDiv = document.getElementById('addParent');
    //    google.maps.event.addDomListener(mapDiv, 'click', $scope.initMap);

});
