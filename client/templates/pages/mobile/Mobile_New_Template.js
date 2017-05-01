import Remoto from '../../../../both/conexion'

Template.Mobile_New_Template.events({
	'click [name="save"]'(e, t) {
		let content = t.find('[name="engagement"]').value;
	    let name = t.find('[name="template_name"]').value;
	    if (content !== "") {
	    	Remoto.call('add_template', content, name, (err) => {
		        if (err) {
		        	alert(err)
		        } else {
		         	alert('Template Added')
		         	FlowRouter.go('/mobile/new_letter/write_letter')
		        }
	      	})
	    } else {
	      alert('Complete the Template')
	    }
	}
})