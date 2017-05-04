import Remoto from '../../../../both/conexion'

Template.Mobile_Signup.events({
	'click [name="next"]'(e, t) {
		Session.set('email', t.find("[name='email']").value)
		console.log(Session.get('email'))
		FlowRouter.go("/mobile/signup/2")
	}
})

Template.Mobile_Signup_2.events({
	'click [name="signup"]'(e, t) {
		let data = {
	        firm_name: t.find('[name="firm_name"]').value,
	        first_name: t.find('[name="first_name"]').value,
	        last_name: t.find('[name="last_name"]').value,
	        email: Session.get('email'),
	        phone_number: t.find('[name="phone_number"]').value,
	        password: t.find('[name="password"]').value
    	}

    	let email = data.email
    	let password = data.password

		if (data.firm_name !== "" && data.first_name !== "" && data.last_name !== "" && data.email !== "" && data.phone_number !== "" && data.password !== "") {
			Remoto.call('signup', data, (err, result) =>{
				if (!err) {
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
					
				} else {
					alert(err)
				}
			})
		}
	}
})

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