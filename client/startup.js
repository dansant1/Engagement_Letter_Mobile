import Remoto from '../both/conexion'

Meteor.startup( () => {

  Meteor.connection = Remoto;
  Accounts.connection = Meteor.connection;
  Meteor.users = new Meteor.Collection('users', {connection: Remoto});
  Meteor.connection.subscribe('usuarios');

  Tracker.autorun( () => {
    let token = Session.get('_storedLoginToken');

    if (token) {
      Meteor.loginWithToken(token, function(err) {
        
        if(!err) {
          console.log('loginWithToken ', token)
        } else {
          Session.set('ddpErrors', err);          
        } 

      })
    }

  })

  Tracker.autorun( () => {
      var user = Meteor.user()
      
      if (user) {
      
        Session.setPersistent('_storedLoginToken', Accounts._storedLoginToken());
      
      }
  })

})