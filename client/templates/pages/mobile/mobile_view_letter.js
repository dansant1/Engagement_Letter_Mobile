import Remoto from '../../../../both/conexion';

import { Letters, Clients, Firms, Logos, Signatures } from '../../../../both/conexion';

Template.mobile_view_letter.onCreated(() => {
	let template = Template.instance()
	let letterId = FlowRouter.getParam('letterId')
	template.autorun( () => {
		
		Remoto.subscribe('Letter', letterId)
	})
})

Template.mobile_view_letter.helpers({
	letter() {
		
		return Letters.findOne({_id: FlowRouter.getParam('letterId')})
	},
	date() {
		
		let letter = Letters.findOne({_id: FlowRouter.getParam('letterId')})

		let date = letter.sendedAt ?  letter.sendedAt : letter.createdAt

		console.log(date)

		const monthNames = [
		    "January", "February", "March",
		    "April", "May", "June", "July",
		    "August", "September", "October",
		    "November", "December"
  		]

  		let day = date.getDate();
  		let monthIndex = date.getMonth();
  		let year = date.getFullYear();
		
		return day + ' ' + monthNames[monthIndex] + ' ' + year 
	},
	letterId() {
		return FlowRouter.getParam('letterId')
	},
	client() {
		console.log(Clients.findOne({_id: this.engagement_client}).company_client_name)
		return Clients.findOne({_id: this.engagement_client}).company_client_name
	},
	lawyer() {
		let user = Meteor.users.findOne().profile

		return  user.first_name + ' ' + user.last_name
	}, 
	estatus() {
		switch (this.status) {
			case 'draft':
				return 'Draft'
			break;
			case 'pending_signature': 
				return 'Pending Signature'
			break;
			case 'pending_payment': 
				return 'Pending Payment'
			break;
			case 'completing': 
				return 'Completed'
			break;
			default:
				return '--'
			break
		}
	}
})

Template.Preview.helpers({
	letterId() {
		return FlowRouter.getParam('letterId')
	}
})

Template.frameLetter.onCreated( () => {
	let template = Template.instance()

	template.autorun( () =>  {
		template.letterId = FlowRouter.getParam('letterId')

		Remoto.subscribe('Letter', template.letterId)


	})
})

Template.frameLetter.helpers({
	letter() {
		return Letters.findOne()
	},
	firmName() {
	 	return Firms.findOne().name
	},
	susan() {
		if (this.engagement_type === "1") {
			return true
		}

		return false
	},
	joe() {
		if (this.engagement_type === "2") {
			return true
		}

		return false
	},
	date() {

		let letter = Letters.findOne()

		let date = letter.sendedAt ?  letter.sendedAt : new Date()

		const monthNames = [
		    "January", "February", "March",
		    "April", "May", "June", "July",
		    "August", "September", "October",
		    "November", "December"
  		]

  		let day = date.getDate();
  		let monthIndex = date.getMonth();
  		let year = date.getFullYear();

		return day + ' ' + monthNames[monthIndex] + ' ' + year
	},
	clientName() {
		return Clients.findOne().company_client_name
	},
	clientCompany() {
		return Clients.findOne().company_name
	},
	clientAddress() {
		return Clients.findOne().company_address
	},
	lawyer() {
		let user = Meteor.users.findOne().profile
		return  user.first_name + ' ' + user.last_name
	},
	signature() {
		return Signatures.findOne()
	},
	project() {
		if ( this.payment[0].type === 'Project' ) {
			return true
		}
	},
	hourly() {
		if ( this.payment[0].type === 'Hourly' ) {
			return true
		}

		return false
	},
	retainer() {
		if ( this.payment[0].type === 'Retainer' ) {
			return true
		}

		return false
	},
	logo() {
		return Logos.findOne()
	}
})
