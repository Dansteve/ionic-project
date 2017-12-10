//Developer : Dansteve Adekanbi
//copyright : Dansteve Adekanbi
//year : 2016

angular.module('starter.services', [])
    .factory('Promotelists', function () {
        // Might use a resource here that returns a JSON array
        var promotelists = [{
            coins: 300,
            description: "Oracle",
            name: "joshua",
            link: 'https://m.facebook.com/Oracle/photos/a.275770478765.144945.113897213765/10155737645173766/?type=3&source=54',
            social: "facebook",
            title: "Oracle"
}, {
            coins: 300,
            description: "Oracle",
            name: "joshua",
            link: 'https://m.facebook.com/Oracle/photos/a.275770478765.144945.113897213765/10155706345123766/?type=3&source=54',
            social: "facebook",
            title: "Oracle"
}, {
            coins: 300,
            description: "Amazon",
            name: "joshua",
            link: 'https://m.facebook.com/amazonwebservices/photos/a.213630065341033.45590.153063591397681/1436818349688859/?type=3&source=54',
            social: "facebook",
            title: "Amazon"
}, {
            coins: 300,
            description: "NetBeans",
            name: "joshua",
            link: 'https://m.facebook.com/NetBeans/photos/a.438798692901609.1073741825.115822851865863/1434434356671366/?type=3&source=54',
            social: "facebook",
            title: "NetBeans"
}, {
            coins: 300,
            description: "Javascript",
            name: "joshua",
            link: 'https://mobile.twitter.com/javascript',
            social: "twitter",
            title: "Javascript"
}, {
            coins: 300,
            description: "Java",
            name: "joshua",
            link: 'https://mobile.twitter.com/java',
            social: "twitter",
            title: "Java"
},{
            coins: 300,
            description: "Oracle",
            name: "joshua",
            link: 'https://mobile.twitter.com/oracle',
            social: "twitter",
            title: "Oracle"
},{
            coins: 300,
            description: "netbeans",
            name: "joshua",
            link: 'https://mobile.twitter.com/netbeans',
            social: "twitter",
            title: "netbeans"
}, {
            coins: 300,
            description: "Cisco Service Provider",
            name: "joshua",
            link: 'https://www.linkedin.com/mwlite/company/3543671',
            social: "linkedin",
            title: "Cisco Service Provider"
},{
            coins: 300,
            description: "Weststar Associates Limited",
            name: "joshua",
            link: 'https://www.linkedin.com/mwlite/company/11148745',
            social: "linkedin",
            title: "Weststar Associates Limited"
},{
            coins: 300,
            description: "LinkedIn Marketing Solutions",
            name: "joshua",
            link: 'https://www.linkedin.com/mwlite/company/4973896',
            social: "linkedin",
            title: "LinkedIn Marketing Solutions"
},{
            coins: 300,
            description: "Wenzhou Rockwill Electric Co.,Ltd.",
            name: "joshua",
            link: 'https://www.linkedin.com/mwlite/company/3994067',
            social: "linkedin",
            title: "Wenzhou"
}, {
            coins: 300,
            description: "javascript",
            name: "joshua",
            link: 'https://www.instagram.com/p/BaRlXoSFV7y/',
            social: "instagram",
            title: "javascript"
}, {
            coins: 300,
            description: "Html",
            name: "joshua",
            link: 'https://www.instagram.com/p/BaRljNxnUbM/',
            social: "instagram",
            title: "Html"
}, {
            coins: 300,
            description: "Parksy_95",
            name: "joshua",
            link: 'https://www.instagram.com/p/BaRMI5UAn4-/',
            social: "instagram",
            title: "Parksy_95"
}, {
            coins: 300,
            description: "imagically.creative",
            name: "joshua",
            link: 'https://www.instagram.com/p/BaTANS6je22/',
            social: "instagram",
            title: "imagically.creative"
}, {
            coins: 300,
            description: "MY Dashboard",
            name: "joshua",
            link: 'https://www.tumblr.com/dashboard',
            social: "tumblr",
            title: "Unstable Fragment"
}, {
            coins: 300,
            description: "Unstable Fragment",
            name: "joshua",
            link: 'https://www.tumblr.com/dashboard',
            social: "tumblr",
            title: "Unstable Fragment"
},{
            coins: 300,
            description: "Java",
            name: "joshua",
            link: 'https://m.youtube.com/watch?v=uWYPVz_i7W4',
            social: "youtube",
            title: "Java"
},{
            coins: 300,
            description: "Java 2",
            name: "joshua",
            link: 'https://m.youtube.com/watch?v=aqHhpahguVY',
            social: "youtube",
            title: "Java 2"
},{
            coins: 300,
            description: "CSS 3",
            name: "joshua",
            link: 'https://m.youtube.com/watch?v=yfoY53QXEnI',
            social: "youtube",
            title: "CSS 3"
},{
            coins: 300,
            description: "Flexbox 3",
            name: "joshua",
            link: 'https://m.youtube.com/watch?v=JJSoEo8JSnc',
            social: "youtube",
            title: "Flexbox 3"
},{
            coins: 300,
            description: "Company",
            name: "joshua",
            link: 'https://plus.google.com/+JorgeAlbertoHern%C3%A1ndezC/posts/ESZpD69NwCR',
            social: "google+",
            title: "Company"
},{
            coins: 300,
            description: "Demo content",
            name: "joshua",
            link: 'https://www.pinterest.com/',
            social: "pinterest",
            title: "Demo"
}];
        return {
            all: function () {
                return promotelists;
            },
            remove: function (promotelist) {
                promotelists.splice(promotelists.indexOf(promotelist), 1);
            },
            add: function (val) {
                promotelists.push(val)
            },
            get: function (promotelistId) {
                for (var i = 0; i < promotelists.length; i++) {
                    if (promotelists[i].id === parseInt(promotelistId)) {
                        return promotelists[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('Socials', function () {
        // Might use a resource here that returns a JSON array
        var socials = [{
            id: 1,
            name: 'linkedin'
        }, {
            id: 3,
            name: 'instagram'
        }, {
            id: 4,
            name: 'facebook'
        }, {
            id: 5,
            name: 'twitter'
        },  {
            id: 2,
            name: 'tumblr'
        },{
            id: 6,
            name: 'pinterest'
        }, {
            id: 7,
            name: 'youtube'
        }, {
            id: 8,
            name: 'google+'
        }, {
            id: 9,
            name: 'blogger'
        }];
        return {
            all: function () {
                return socials;
            },
            remove: function (social) {
                socials.splice(socials.indexOf(social), 1);
            },
            get: function (socialId) {
                for (var i = 0; i < socials.length; i++) {
                    if (socials[i].id === parseInt(socialId)) {
                        return socials[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('Feeds', function () {
        // Might use a resource here that returns a JSON array
        var feeds = [{
            id: 1,
            mypicture: 'img/max.png',
            from: {
                name: 'John Doe',
            },
            created_time: '23 September at 20:31',
            message: {
                text: 'Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
                video: '',
                poster: '',
                img: '',
            },
            likes: {
                data: {
                    length: 10,
                },
            },
            comments: {
                data: {
                    length: 20,
                },
            }
  }, {
            id: 2,
            mypicture: 'img/user.png',
            from: {
                name: 'John Doe',
            },
            created_time: '23 September at 20:31',
            message: {
                text: 'Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
                video: '',
                poster: '',
                img: 'img/s1.png',
            },
            likes: {
                data: {
                    length: 10,
                },
            },
            comments: {
                data: {
                    length: 20,
                },
            }
  }, {
            id: 3,
            mypicture: 'img/mike.png',
            from: {
                name: 'John Doe',
            },
            created_time: '23 September at 20:31',
            message: {
                text: 'Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
                video: 'https://www.youtube.com/embed/vr0Gfvp5v1A?ecver=2',
                poster: 'img/video.png',
                img: '',
            },
            likes: {
                data: {
                    length: 10,
                },
            },
            comments: {
                data: {
                    length: 20,
                },
            }
  }, ];
        return {
            all: function () {
                return feeds;
            },
            remove: function (feed) {
                feeds.splice(feeds.indexOf(feed), 1);
            },
            get: function (feedId) {
                for (var i = 0; i < feeds.length; i++) {
                    if (feeds[i].id === parseInt(feedId)) {
                        return feeds[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('$localstorage', ['$http', function ($http) {
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
