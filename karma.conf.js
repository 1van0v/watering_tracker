//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '',

    files: [
      'app/lib/firebase/firebase-app.js',
      'app/lib/firebase/firebase-database.js',
      'app/lib/angular/angular.js',
      'app/lib/angular-route/angular-route.js',
      'app/lib/angular-aria/angular-aria.js',
      'app/lib/angular-animate/angular-animate.js',
      'app/lib/angular-material/angular-material.js',
      'node_modules/mockfirebase/browser/mockfirebase.js',
      'app/lib/angularfire/dist/angularfire.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/*.js',
      'app/components/**/*.js',
      {
        pattern: '**/*.js.map',
        included: false
      }
    ],

    exclude: [
      'coverage/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'app/app.js': ['coverage'],
      'app/components/**/*[^.spec].js': ['coverage'] 
    }, 
    
    coverageReporter: {
      type: 'html',
      dir: 'coverage'
    },

    beforeMiddleware: ['firebase'],

    firebase: {
      port: 4500,
      data: {
        plants: [
          {
            "name": "Aloe Vera",
            "img": "assets\\img\\flowers\\8.svg",
            "last_watering": "2019-02-05T10:40:00",
            "status": "watered",
            "watering_interval": 5
          },
          {
            "name": "Parlor Palm",
            "img": "assets\\img\\flowers\\1.svg",
            "last_watering": "2019-02-05T10:40:00",
            "status": "watered",
            "watering_interval": 4
          },
          {
            "name": "Calathea",
            "img": "assets\\img\\flowers\\2.svg",
            "last_watering": "2019-02-05T10:40:00",
            "status": "watered",
            "watering_interval": 5
          }
        ]
      }
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-firebase'
    ]

  });
};
