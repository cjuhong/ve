require.config({
  paths: {
    jQuery: '/javascripts/libs/jquery',
    Underscore: '/javascripts/libs/underscore',
    Backbone: '/javascripts/libs/backbone',
    Sly: '/javascripts/libs/sly.min',
    text: '/javascripts/libs/text',
    templates: '../templates',
    Sockets: '/socket.io/socket.io',
    ThreeJs: '/javascripts/ve/three.min',
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
    'Sly': ['jQuery'],
    'Backbone': ['Underscore', 'jQuery'],
    'FirstPersonControls': ['ThreeJs'],
    'OBJLoader': ['ThreeJs'],
    'AxisHelper':  ['ThreeJs'],
    'CameraHelper': ['ThreeJs'],
    'VirtualExhibition': ['Backbone','FirstPersonControls','OBJLoader','AxisHelper','CameraHelper','Sly']
  }
});
require(['VirtualExhibition'], function(VirtualExhibition) {
  VirtualExhibition.initialize();
});