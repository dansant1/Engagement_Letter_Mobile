import Remoto from '../../../../both/conexion'

import { Letters } from '../../../../both/conexion'

Template.Mobile_Layout.onCreated(() => {
	let template = Template.instance()

	template.autorun( () => {
		Remoto.subscribe('user')
		Remoto.subscribe('Letters')
	})
})

Template.Mobile_Layout.helpers({
	name() {
		return Meteor.users.findOne().profile.first_name
	}
})

Template.Mobile_Home.helpers({
	completing() {

		let completing

		let filter = {
			status: 'completing'
		}

		let letters = Letters.find(filter).fetch().length

		completing = letters ? letters : 0

		return completing

	},
	pendingSignatures() {
		let pendingSignatures 
		
		let filter = {
			status: 'pending_signature'
		}

		let letters = Letters.find(filter).fetch().length

		pendingSignatures = letters ? letters : 0

		return pendingSignatures

	},
	pendingPayment() {
		let pendingPayment

		let filter = {
			status: 'pending_payment'
		}
		
		let letters = Letters.find(filter).fetch().length 
		
		pendingPayment = letters ? letters : 0

		return pendingPayment
	}
})