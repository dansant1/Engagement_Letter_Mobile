import Remoto from '../../../../both/conexion'

import { Clients, Templates, Parties } from '../../../../both/conexion'

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
  	}
})