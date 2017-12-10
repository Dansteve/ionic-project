//Developer : Dansteve Adekanbi
//copyright : Dansteve Adekanbi
//year : 2016

angular.module('starter.controllers', ['ngSanitize'])
    .controller('DashCtrl', function ($scope, Feeds, $http, $sce) {
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }
        $scope.feedData = Feeds.all();
        $scope.doRefresh = function () {
            $http.get('/new-items')
                .success(function (newItems) {
                    //$scope.childs = Childs.all();
                }).finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
    })
    .controller('AccountCtrl', function ($scope, $state, $ionicModal, $ionicAuth, $ionicUser, $ionicPopup, $localstorage, $http) {

        $scope.doRefresh = function () {
            $http.get('/new-items')
                .success(function (newItems) {
                    //$scope.childs = Childs.all();
                }).finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
        $scope.logout = function () {
            $ionicAuth.logout();
            $state.go('log.login');
        };
        $localstorage.set('user-name', 'demo');
        if ($localstorage.get('facebook') === 'undefined') {
            $localstorage.set('facebook', false);
        }
        if ($localstorage.get('twitter') === 'undefined') {
            $localstorage.set('twitter', false);
        }
        if ($localstorage.get('instagram') === 'undefined') {
            $localstorage.set('instagram', false);
        }
        if ($localstorage.get('linkedin') === 'undefined') {
            $localstorage.set('linkedin', false);
        }
        $scope.settings = {
            enableFacebook: $localstorage.get('facebook'),
            enableTwitter: $localstorage.get('twitter'),
            enableInstagram: $localstorage.get('instagram'),
            enableLinkedin: $localstorage.get('linkedin'),
        };
        $scope.logout = function () {
            $ionicAuth.logout();
            $state.go('log.login');
        };
        $scope.loading = true;
        $scope.signInlinkedin = function () {
            $scope.loading = false;
            console.log($scope.loading);
            $ionicAuth.login('linkedin').then(function (value) {
                $scope.loading = true;
                $scope.full_name = $ionicUser.social.linkedin.data.full_name;
                if ($localstorage.get('user-name') === 'demo') {
                    var d = $scope.full_name.replace(/\s/g, '');
                    $localstorage.set('user-name', d);
                }
                $scope.profile_picture = $ionicUser.social.linkedin.data.profile_picture;
                $ionicPopup.show({
                    template: '',
                    title: 'Linkedin Successfull',
                    subTitle: $scope.full_name,
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>Okay</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                $localstorage.set('name', $scope.full_name);
                                $localstorage.set('image', $scope.profile_picture);
                                $localstorage.set('linkedin', true);
                                $scope.settings.enableLinkedin = $localstorage.get('linkedin');
                            }
                        }
                    ]
                });
            })
        };
        $scope.signIninstagram = function () {
            $scope.loading = false;
            console.log($scope.loading);
            $ionicAuth.login('instagram').then(function (value) {
                $scope.loading = true;
                $scope.full_name = $ionicUser.social.instagram.data.full_name;
                $scope.profile_picture = $ionicUser.social.instagram.data.profile_picture;
                $ionicPopup.show({
                    template: '',
                    title: 'Instagram Successfull',
                    subTitle: $scope.full_name,
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>Okay</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                $localstorage.set('name', $scope.full_name);
                                $localstorage.set('image', $scope.profile_picture);
                                $localstorage.set('instagram', true);
                                $scope.settings.enableInstagram = $localstorage.get('instagram');
                            }
                        }
                    ]
                });
            })
        };
        $scope.signIntwitter = function () {
            $scope.loading = false;
            console.log($scope.loading);
            $ionicAuth.login('twitter').then(function (value) {
                $scope.loading = true;
                $scope.full_name = $ionicUser.social.twitter.data.full_name;
                $scope.profile_picture = $ionicUser.social.twitter.data.profile_picture;
                $ionicPopup.show({
                    template: '',
                    title: 'Twitter Successfull',
                    subTitle: $scope.full_name,
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>Okay</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                $localstorage.set('name', $scope.full_name);
                                $localstorage.set('image', $scope.profile_picture);
                                $localstorage.set('twitter', true);
                                $scope.settings.enableTwitter = $localstorage.get('twitter');
                            }
                        }
                    ]
                });
            })
        };
        $scope.signInfacebook = function () {
            $scope.loading = false;
            console.log($scope.loading);
            $ionicAuth.login('facebook').then(function (value) {
                $scope.loading = true;
                $scope.full_name = $ionicUser.social.facebook.data.full_name;
                $scope.profile_picture = $ionicUser.social.facebook.data.profile_picture;
                $ionicPopup.show({
                    template: '',
                    title: 'Facebook Successfull',
                    subTitle: $scope.full_name,
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>Okay</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                $localstorage.set('name', $scope.full_name);
                                $localstorage.set('image', $scope.profile_picture);
                                $localstorage.set('facebook', true);
                                $scope.settings.enableFacebook = $localstorage.get('facebook');
                            }
                        }
                    ]
                });
            })
        };
    })
    .controller('LoginCtrl', function ($scope, $state, $ionicModal, $ionicPopup, $ionicAuth, $ionicUser, $http) {

        $scope.doRefresh = function () {
            $http.get('/new-items')
                .success(function (newItems) {
                    //$scope.childs = Childs.all();
                }).finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
        $scope.loading = true;
        $scope.user = {
            username: '',
            password: '',
            coins: 100,
        }
        $scope.signIn = function () {
            $scope.loading = false;
            if ($scope.user.username === 'Demo' && $scope.user.password === 'demo') {
                setTimeout(function () {
                    $scope.loading = true;
                    $ionicPopup.show({
                        template: '',
                        title: 'Welcome',
                        subTitle: 'Demo user',
                        scope: $scope,
                        buttons: [

                            {
                                text: '<b>Okay</b>',
                                type: 'button-positive',
                                onTap: function (e) {
                                    $state.go('tab.dash');
                                    $scope.loading = true;
                                }
                        }
                    ]
                    });
                }, 1000);
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
                }, 1000);
            }
        };
        $scope.signInlinkedin = function () {
            $scope.loading = false;
            console.log($scope.loading);
            $ionicAuth.login('linkedin').then(function (value) {
                $scope.loading = true;
                $scope.full_name = $ionicUser.social.linkedin.data.full_name;
                $scope.profile_picture = $ionicUser.social.linkedin.data.profile_picture;
                $ionicPopup.show({
                    template: '',
                    title: 'Welcome',
                    subTitle: $scope.full_name,
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>Okay</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                $state.go('tab.dash');
                            }
                        }
                    ]
                });
            })
        };
        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.options = {
            loop: false,
            showpager: true,
        }
        $scope.showpager = true;
        $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
            $scope.slider = data.slider;
        });
        $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
            console.log('Slide change is beginning');
        });
        $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
            // note: the indexes are 0-based
            $scope.activeIndex = data.slider.activeIndex;
            $scope.previousIndex = data.slider.previousIndex;
        });
    })
    .controller('OtherCtrl', function ($scope, $state, $stateParams, $ionicModal, $ionicPopup, $ionicAuth, $ionicUser, $localstorage, Promotelists, Socials, $http) {

        $scope.doRefresh = function () {
            $http.get('/new-items')
                .success(function (newItems) {
                    //$scope.childs = Childs.all();
                }).finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
        $scope.logout = function () {
            $ionicAuth.logout();
            $state.go('log.login');
        };
        $scope.socialLists = Socials.all();
        $scope.loading = true;
        $ionicModal.fromTemplateUrl('templates/promote-form.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.options = {
            loop: false
        }
        $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
            $scope.slider = data.slider;
        });
        $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
            console.log('Slide change is beginning');
        });
        $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
            // note: the indexes are 0-based
            $scope.activeIndex = data.slider.activeIndex;
            $scope.previousIndex = data.slider.previousIndex;
        });
        $scope.promotelist = Promotelists.all();
        $scope.promotelistnumber = $scope.promotelist.length;
        $scope.promoteAdd = function (title, description, social, link, coins) {
            $scope.promote = {
                name: $localstorage.get('user-name'),
                title: title,
                description: description,
                social: social,
                link: link,
                coins: coins,
            }
            Promotelists.add($scope.promote)
            console.log($scope.promotelist);
            $scope.modal.hide();
        }
        $scope.shouldShowDelete = false;
        $scope.shouldShowReorder = false;
        $scope.listCanSwipe = true
    })
    .controller('coinsDetailCtrl', function ($scope, $stateParams, Socials, Promotelists, $http, $ionicPopup) {

            $scope.doRefresh = function () {
                $http.get('https://www.google.com.ng/')
                    .success(function (newItems) {
                        //$scope.childs = Childs.all();
                    }).finally(function () {
                        // Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            };

            $scope.loading = true;
            $scope.logout = function () {
                $ionicAuth.logout();
                $state.go('log.login');
            };
            $scope.socials = Socials.get($stateParams.socialId);
            $scope.promotelist = Promotelists.all();

                $scope.cahns = function () {
                    setTimeout(function () {
                    $scope.loading = false;
                    console.log($scope.loading);
                    },400);
                };

                $scope.cahns2 = function () {
                    setTimeout(function () {
                    $scope.loading = true;
                    $scope.loading = true;
                    console.log($scope.loading);
                    },450);
                };
            $scope.viewlink = function (link) {
                $scope.cahns();$scope.cahns2();
                // Open cordova webview if the url is in the whitelist otherwise opens in app browser
                var win = window.open(link, "_blank");

                win.addEventListener("loadstart", function (event) {
                  //alert('Loading start');
                    win.executeScript({
                        code: `var node = document.createElement("div");
                            node.setAttribute("id", "load");
                            document.body.appendChild(node);`

                    });
                    win.insertCSS({
                        code: `#load {
                                height: calc(100% + 70%);
                                width: 100%;
                                position: absolute;
                                top: 0;
                                z-index: 10036;
                                background: url(https://www.creditmutuel.fr/cmne/fr/banques/webservices/nswr/images/loading.gif) no-repeat center center rgba(0,0,0,0.25);
                            }`
                    });
                })
                win.addEventListener("loadstop", function (event) {
                    alert('Loading completed');
                    win.executeScript({
                        code: `setTimeout(function(){}, 500);`
                    });
                    win.executeScript({
                        code: `
var twitterElements = document.querySelectorAll('div.RQ5ECnGZ');
var twitterConnectElements = document.querySelectorAll('._1_FMKzvm');
var twitterReplyElements = document.querySelectorAll('.MmJh82_T');
var linkedinFollowElements = document.querySelectorAll('.buttons.follow-btn');
var linkedinElements = document.querySelectorAll('.control-action');
var linkedinConnectElements = document.querySelectorAll('.primary-link.medium-inverse');
var instagramElements = document.querySelectorAll('a span._8scx2');
var instagramPostElements = document.querySelectorAll('._55p7a');
var facebookPostElements = document.querySelectorAll('button._54k8');
var facebookElements = document.querySelectorAll('div._52jj._15kl a');
var youtubeElements = document.querySelectorAll('a._mjb');
var pinterestElements = document.querySelectorAll('div._0._25._2p button');
var tumblrElements = document.querySelectorAll('.mh_post_foot_control');

twitterElements.forEach(function (element) {element.onclick = function() {alert(element.dataset.testid + ' clicked'); window.location ='#close-win'; return false; };})
twitterConnectElements.forEach(function (element) {element.onclick = function() {alert(element.textContent + ' clicked'); window.location ='#close-win'; return false; };});
twitterReplyElements.forEach(function (element) {element.onclick = function() {if(element.textContent === "Reply"){alert(element.textContent + ' Comfrimed');window.location ='#close-win'; return false; } };});
linkedinFollowElements.forEach(function (element) {element.onclick = function() {alert(element.textContent + ' clicked'); window.location ='#close-win'; return false; };});
linkedinElements.forEach(function (element) {element.onclick = function() {alert(element.getAttribute('data-feed-control') + ' clicked'); window.location ='#close-win'; return false; };});
linkedinConnectElements.forEach(function (element) {element.onclick = function() {alert(element.textContent + ' clicked');window.location ='#close-win'; return false; };});
instagramElements.forEach(function (element) {element.onclick = function() {alert(element.textContent + ' clicked'); window.location ='#close-win'; return false; };});
instagramPostElements.forEach(function (element) {element.onclick = function() {if(element.textContent === "Post"){alert(element.textContent + ' Comfirmed');window.location ='#close-win'; return false; } };});
facebookElements.forEach(function (element) {element.onclick = function() {alert(element.textContent + ' clicked'); window.location ='#close-win'; return false; };});
tumblrElements.forEach(function (element) {element.onclick = function() {alert(element.text + ' clicked'); window.location ='#close-win'; return false; };});
facebookPostElements.forEach(function (element) {element.onclick = function() {if(element.textContent === "Post"){alert(element.textContent + ' Comfrimed');window.location ='#close-win'; return false; } };});
youtubeElements.forEach(function (element) {element.onclick = function() {alert(element.title + ' clicked'); window.location ='#close-win'; return false; };});
pinterestElements.forEach(function (element) {element.onclick = function() {alert(element.textContent + ' clicked'); window.location ='#close-win'; return false; };})`
                    });
                    win.insertCSS({
                        code: `#load {
                                height: 0;
                                width: 0%;
                                position: absolute;
                                top: 0;
                                z-index: 0;
                                background:'';
                            }`
                    });
                    function closer() {
                    if (event.url.match("#close-win")) {
                        win.close();
                        $scope.loading = true;
                        $ionicPopup.show({
                            template: '',
                            title: 'Click',
                            subTitle: "Successfull",
                            scope: $scope,
                            buttons: [
                                {
                                    text: '<b>Okay</b>',
                                    type: 'button-positive',
                                    onTap: function (e) {}
                                    }
                                ]
                        });
                    };
                };
                    closer();
            });

    }
})
