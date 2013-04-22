require.config({
  paths: {
    jQuery: '/javascripts/libs/jquery',
    Underscore: '/javascripts/libs/underscore',
    Backbone: '/javascripts/libs/backbone',
    text: '/javascripts/libs/text',
    templates: '../templates',
    Sockets: '/socket.io/socket.io',
    Three: '/javascripts/ve/three.min',
    FirstPersonControls: '/javascripts/ve/FirstPersonControls',
    OBJLoader: '/javascripts/ve/OBJLoader',
    AxisHelper: '/javascripts/ve/AxisHelper',
    CameraHelper: '/javascripts/ve/CameraHelper',
    Cufon: '/javascripts/ve/Blox_400.font',
    Detector: '/javascripts/ve/Detector',
    cufon_yui: '/javascripts/ve/cufon-yui',
    dat_gui: '/javascripts/ve/dat.gui.min',
    stats: '/javascripts/ve/stats.min'
  },
  shim: {
    'Backbone': ['Underscore', 'jQuery'],
    'VirtualExhibition': ['Backbone'],
    'FirstPersonControls': ['Three'],
    'OBJLoader': ['Three'],
    'AxisHelper':  ['Three'],
    'CameraHelper': ['Three']
  }
});
require(['VirtualExhibition'], function(VirtualExhibition) {
  VirtualExhibition.initialize();
});