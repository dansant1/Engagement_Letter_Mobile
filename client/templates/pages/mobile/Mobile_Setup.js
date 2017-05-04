import Remoto from '../../../../both/conexion'

import { Clients, Templates, Parties } from '../../../../both/conexion'

Template.Mobile_Setup.onRendered( () => {
	let template = Template.instance()

	template.autorun( () => {

		Remoto.subscribe('user')

	})
})

Template.Mobile_Setup.events({
	'click [name="add_member"]'(e, t) {

		let data = {
      		name: t.find('[name="name_member"]').value,
      		email: t.find('[name="team_email"]').value
    	}

    	if (data.email !== "" && data.name !== "") {
      		
      		Remoto.call('InviteMember', data, (err) => {
		        if (err) {
		          alert( err);
		          t.find('[name="name_member"]').value = ""
		          t.find('[name="team_email"]').value = ""
		        } else {
		          alert('Invite Sended');
		          t.find('[name="name_member"]').value = ""
		          t.find('[name="team_email"]').value = ""
		        }
     		})

    	} else {
      		alert('Complete his details');
    	}
	
	},
	'click [name="add_conflict_email"]'(e, t) {
	    let conflict = t.find('[name="conflict_email_alias"]').value;

	    if (conflict !== "") {
	      Remoto.call('saveConflictAlias', conflict, (err) => {
	        if (err) {
	            alert( err);
	            t.find('[name="conflict_email_alias"]').value = ""
	        } else {
	          t.find('[name="conflict_email_alias"]').value = ""
	          alert('Conflict Alias Saved');
	        }
	      })
	    } else {
	        alert('Complete the email');
	    }
  	},
  	'change [name="signature"]'(e, t) {

  		console.log('hollala')

  		let file = e.target.files[0]

  		let userId = Remoto.userId()

  		let data = {
  			email: Meteor.users.findOne({_id: userId}).emails[0].address 
  		}

  		let uploaderSignature = new Slingshot.Upload('Upload', data)

  		uploaderSignature.send( file, ( error, url ) => {
		    	
		    	if ( error ) {
		      		alert( error.message)
		      		
		    	} else {

		    		Remoto.call( "StoreUrlOfSignature", url, ( error ) => {
					    if ( error ) {
					    	alert( error.reason, "warning" )
					    	return false
					    } else {
					      	alert( "Signature Saved!", "success" )
					      	FlowRouter.go('/mobile')
					      	return true
					    }
	  				})	 

		    	}
	  	})	
  	},
  	'change [name="logo"]'(e, t) {

  		let file = e.target.files[0]

  		let userId = Remoto.userId()

  		let data = {
  			firmId: Meteor.users.findOne({_id: userId}).profile.firmId
  		}

  		let uploaderLogo = new Slingshot.Upload('UploadLogos', data)

  		uploaderLogo.send( file, ( error, url ) => {
		    	
		    	if ( error ) {
		      		alert( error.message)
		      		
		    	} else {

		    		Remoto.call( "StoreUrlOfLogo", url, ( error ) => {
					    if ( error ) {
					    	alert( error.reason, "warning" )
					    	return false
					    } else {
					      	alert( "Logo Saved!", "success" )
					      	FlowRouter.go('/mobile')
					      	return true
					    }
	  				})	 

		    	}
	  	})
  	}
})