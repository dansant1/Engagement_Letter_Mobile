import Remoto from '../../../../both/conexion'

Template.Mobile_Login.events({
	'click [name="login"]'(e, t) {
		let email = t.find("[name='email']").value
		let password = t.find("[name='password']").value

		if (email !== "" && password !== "") {
      
      		DDP.loginWithPassword(Remoto, { email }, password, (error, result) => {

		        if (error) {
		          alert(error);
		        } else {
		          
		          	Meteor._localStorage.setItem(
		            	"remote.userId",
		            	result.id
		          	)

		          	console.log(result.token)

		          	console.log(result.id)

		        	Session.setPersistent('_storedLoginToken', result.token)
		        	Remoto.setUserId(result.id)

		    
		          	console.log(Remoto.userId());
		        	FlowRouter.go('/mobile');
		        }

      		})

  		}
	}
})