// define(['router','SocialNetSockets'], function(router, socket) {
define(['router','ve/ve','NavigationSly','models/ContactCollection','VeSockets'], 
  function(router,VE,NavigationSly,ContactCollection,Socket) {
  var initialize = function() {
    // VE.init();
    Socket.initialize(router.socketEvents);
    checkLogin(runApplication);
    };
  var contactsCollection = new ContactCollection();
  var checkLogin = function(callback) {
      $.ajax("/account/authenticated", {
        method: "GET",
        success: function(data) {
          // router.socketEvents.trigger('app:loggedin', data);
          $('#logout').fadeIn();
          $('#search').fadeIn();
          $('#register').fadeOut();
          $('#contacts').fadeIn();
          switch(sessionStorage.role) {
            case 'vistor':
              $('#exhibitor').fadeOut();
              $('#organizer').fadeOut();
              break;
            case 'exhibitor':
              $('#vistor').fadeOut();
              $('#organizer').fadeOut();
              break;
            case 'organizer':
              $('#vistor').fadeOut();
              $('#exhibitor').fadeOut();
              break;
            default:
              break;
          }
          contactsCollection.url = '/accounts/me/contacts';
          // this.changeView(new ContactsView({
          //   collection: contactsCollection
          // }));
          contactsCollection.on('reset',addNavContacts, this);
          contactsCollection.fetch();
          return callback(true);
        },
        error: function(data) {
          return callback(false);
        }
      });
    };
  var runApplication = function(authenticated) {
      if(!authenticated) {
        window.location.hash = 'message';
      } else {
        window.location.hash = 'index';
      }
      Backbone.history.start();
    };
  var addNavContacts = function(data){
    contactsCollection.each(function(item){
      var contact = item.toJSON();
      NavigationSly.add('<li id=' + contact.accountId + ' class=contact' + '>' + contact.name.first + '</li>');
    });
  };
  return {
    initialize: initialize
  };
});