import Remoto from '../../../../both/conexion'

import { Letters } from '../../../../both/conexion'

Template.Mobile_List_Letters.onCreated(() => {
	let template = Template.instance()

	template.autorun(() => {
		Remoto.subscribe('Letters')
	})
})

Template.Mobile_List_Letters.helpers({
	letters() {
		return Letters.find()
	}
})