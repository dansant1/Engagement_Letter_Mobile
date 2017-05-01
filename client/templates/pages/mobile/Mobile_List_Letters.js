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