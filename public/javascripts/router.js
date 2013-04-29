// define(['views/index', 'views/register', 'views/login',
//   'views/forgotpassword', 'views/profile', 'views/contacts',
//   'views/addcontact', 'models/Account', 'models/StatusCollection',
//   'models/ContactCollection'],

// function(IndexView, RegisterView, LoginView, ForgotPasswordView, ProfileView,
// ContactsView, AddContactView, Account, StatusCollection,
// ContactCollection) {

define(['models/ContactCollection','views/contacts','views/addcontact','views/register','views/login','views/message','NavigationSly'],

function(ContactCollection,ContactsView,AddContactView,RegisterView,LoginView,Message,NavigationSly) {
	var navigationSly = NavigationSly;
	navigationSly.on('active',function(event,index){
		switch(index) {
			case 0:
				window.location.hash = 'vistor';
				break;
			case 1:
				window.location.hash = 'exhibitor';
				break;
			case 2:
				window.location.hash = 'organizer';
				break;
			case 3:
				window.location.hash = 'register';
				break;
			case 4:
				window.location.hash = 'logout';
				break;
      case 5:
        window.location.hash = 'addContact';
        break;
      case 6:
        window.location.hash = 'contacts/me';
        break;
			default:
				console.log("default");
        break;
		}
	});
  var SocialRouter = Backbone.Router.extend({
    currentView: null,
    navigationSly: NavigationSly,
    socketEvents: _.extend({}, Backbone.Events),
    routes: {
      'addcontact': 'addcontact',
      'index': 'index',
      'login': 'login',
      'logout': 'logout',
      'message': 'message',
      'vistor': 'vistor',
      'exhibitor': 'exhibitor',
      'organizer': 'organizer',
      'register': 'register',
      'forgotpassword': 'forgotpassword',
      'profile/:id': 'profile',
      'contacts/:id': 'contacts',
      'addContact': 'addContact',
      'manageContacts': 'manageContacts'
    },
    checkLogin: function(callback) {
        $.ajax("/account/authenticated", {
          method: "GET",
          success: function(data) {
            // router.socketEvents.trigger('app:loggedin', data);
            return callback(true);
          },
          error: function(data) {
            return callback(false);
          }
        });
      },
    runApplication:function(authenticated) {
        if(!authenticated) {
          window.location.hash = 'login';
        } else {
          window.location.hash = 'index';
        }
        // Backbone.history.start();
      },
    changeView: function(view) {
      if (null != this.currentView) {
        this.currentView.undelegateEvents();
      }
      this.currentView = view;
      this.currentView.render();
    },
    index: function() {
      // var statusCollection = new StatusCollection();
      // statusCollection.url = '/accounts/me/activity';
      // this.changeView(new IndexView({
      //   collection: statusCollection,
      //   socketEvents:this.socketEvents
      // }));
      // statusCollection.fetch();
      $.ajax("/account/authenticated", {
        method: "GET",
        success: function(data) {
          // router.socketEvents.trigger('app:loggedin', data);
          $('#interacts').fadeOut();
          // return callback(true);
        },
        error: function(data) {
          // return callback(false);
          return data;
        }
      });
      console.log("index");
    },
    addContact: function() {
      var that = this;
      this.changeView(new AddContactView({navigationSly : that.navigationSly}));
    },
    login: function() {
      this.changeView(new LoginView({socketEvents : this.socketEvents, navigationSly : this.navigationSly, contactsCollection: new ContactCollection()}));

      console.log("login");
    },
    logout: function() {
      // this.changeView(new LoginView({socketEvents : this.socketEvents, navigationSly : this.navigationSly}));
      $.ajax("/account/logout", {
        method: "GET",
        success: function(data) {
        	console.log("logout");
        	delete sessionStorage.role;
        	delete sessionStorage.userId;
        	window.location.reload();
        	return callback(true);
        },
        error: function(data) {
          return callback(false);
        }
      });
    },
    message: function() {
    	new Message({navigationSly:this.navigationSly}).render();
    },
    vistor: function() {
    	// var that = this;
      // this.changeView(new LoginView({socketEvents : this.socketEvents}));
      // new Message({navigationSly:that.navigationSly}).render();
      this.checkLogin(this.runApplication);
      console.log("vistor");
      // console.log(this.navigationSly);
    },
    exhibitor: function() {
      // this.changeView(new LoginView({socketEvents : this.socketEvents}));
      console.log("exhibitor");
      this.checkLogin(this.runApplication);
    },
    organizer: function() {
      // this.changeView(new LoginView({socketEvents : this.socketEvents}));
      console.log("organizer");
      this.checkLogin(this.runApplication);
    },
    forgotpassword: function() {
      this.changeView(new ForgotPasswordView());
    },
    register: function() {
      this.changeView(new RegisterView());
    },
    addContact: function() {
      this.changeView(new AddContactView());
    },
    manageContacts: function() {
      this.changeView(new ContactsView());
      console.log("manageContacts");
    },
    profile: function(id) {
      var model = new Account({
        id: id
      });
      this.changeView(new ProfileView({
        model: model,
        socketEvents:this.socketEvents
      }));
      model.fetch();
    },
    contacts: function(id) {
      var contactId = id ? id : 'me';
      var contactsCollection = new ContactCollection();
      contactsCollection.url = '/accounts/' + contactId + '/contacts';
      this.changeView(new ContactsView({
        collection: contactsCollection,
        navigationSly: NavigationSly
      }));
      contactsCollection.fetch();
    }
  });
  return new SocialRouter();
});
