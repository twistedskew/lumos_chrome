var require = {
  baseUrl: '../js',

  paths: {
    jquery:   'vendor/jquery-2.1.1.min',
    jqueryui: 'vendor/jquery-ui-1.10.4.min',
    underscore: 'vendor/underscore'
  },

  shim: {
    jqueryui: {
      deps: ['jquery']
    }
  },

  deps: ['underscore', 'jquery']
};
