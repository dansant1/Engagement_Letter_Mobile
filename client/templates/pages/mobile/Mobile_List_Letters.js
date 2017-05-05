import Remoto from '../../../../both/conexion'

import { Letters, Clients } from '../../../../both/conexion'

Template.Mobile_List_Letters.onCreated(() => {
	let template = Template.instance()

	template.autorun(() => {
		Remoto.subscribe('Letters')
		Remoto.subscribe('Clients')
	})
})

Template.Mobile_List_Letters.helpers({
	letters() {
		return Letters.find({}, {sort: { createdAt: -1}})
	},
	client() {
		return Clients.findOne({_id: this.engagement_client}).company_name
	}
})

Template.Mobile_List_Letters.events({
	'click #remove_letter'(e, t) {
		Remoto.call('remove_letter', this._id, (err) => {
	      if (!err) { 
	        Bert.alert('Engagement Letter Removed', 'success')
	      } else {  
	        Bert.alert(err, 'danger')
	      }
    	})
	}
})