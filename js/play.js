requirejs.config({
  baseUrl: '../js',

  paths: {
    jquery:   'vendor/jquery-2.1.1.min',
    jqueryui: 'vendor/jquery-ui-1.10.4.min',
    underscore: 'vendor/underscore'
  },

  deps: ['underscore', 'jquery', 'jqueryui', 'play/main']
});
