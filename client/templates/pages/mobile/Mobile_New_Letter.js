import Remoto from '../../../../both/conexion'

import { Clients, Templates, Parties } from '../../../../both/conexion'


Template.Mobile_New_Letter.onCreated(() => {

  let template = Template.instance();

  template.autorun( () => {
    Remoto.subscribe('Clients')
  })

})

Template.Mobile_New_Letter.helpers({
  clients() {

    return Clients.find()
  }
})

Template.Mobile_New_Letter_2.events({

  'change [name="engagement_type"]'(e, t) {

      if (e.target.value === "?" ) {

          let tipo = e.target.value
          console.log(tipo)
          if (  tipo !== "0" ) {

            if (tipo == "1") {
              t.find('[name="engagement"]').value = 'to represent you in connection with the dissolution of your entity, [name], and related tax issues. This letter confirms the terms on which we will represent you in this matter.'
              return
            } else if ( tipo == "2") {
              t.find('[name="engagement"]').value = ' [the formation of the company and its initial stock issuances].  [You will be responsible for applying for and obtaining all taxpayer identification numbers and business licenses and for making any tax elections (such as S Corporation elections).  Individual stockholders will be responsible for timely filing their own tax filings (as we do not represent them), such as 83(b) elections.]'
              return
            }

          }

      } else {
        t.find('[name="engagement"]').value = e.target.value
      }

  }
})

Template.Mobile_New_Letter.events({
  
  'click [name="add_client"]'(e, t) {
    
    let data = {
      company_name: t.find("[name='name']").value,
      company_address: t.find("[name='address']").value,
      company_phone: t.find("[name='phone']").value,
      company_client_name: t.find("[name='client_name']").value,
      company_client_email: t.find("[name='client_email']").value,
    }

    if (data.client_name !== "" && data.company_address !== "" && data.company_phone !== "" && data.company_client_name !== ""  && data.company_client_email !== "") {
      
      Remoto.call('add_client', data, (err) => {
        if (err) {
          alert(err)
        } else {
          t.find("[name='name']").value = ""
          t.find("[name='address']").value = ""
          t.find("[name='phone']").value = ""
          t.find("[name='client_name']").value = ""
          t.find("[name='client_email']").value = ""
          alert('Client Added')
        }
      })

    } else {
      alert('Complete the Data')
    }

  },
  'click [name="next"]'(e, t) {
    let client = $('[name="engagement_client"]').val()

    if (client !== "0") {
      Session.set('clientId', client)
    
      FlowRouter.go('/mobile/new_letter/write_letter')

    } else {
      alert('Choose a Client')
    }
  }
})

Template.Mobile_New_Letter_2.onCreated(() => {

  let template = Template.instance();

  template.autorun(() => {
    Remoto.subscribe('Templates')
  })

})

Template.Mobile_New_Letter_2.events({
  'click [name="next"]'(e, t) {
    let engagement = t.find("[name='engagement']").value
    let engagement_type = $('#engagement_type').val()
    let engagement_client = Session.get('clientId')
    let clientId = Session.get('clientId')
    if (engagement !== "" && engagement_type !== '0') {

      Remoto.call('createEngagementLetter1', engagement_type, engagement_client, engagement, clientId, (err, result) => {
        if (err) {
          alert(err)
        } else {
          FlowRouter.go('/mobile/new_letter/conflicts/' + result)
        }
      })

    } else {
      alert('Type the Letter')
    }

  },
  'change #engagement_template'(e, t) {

    let template = e.target.value

    if (template !== '0') {
      t.find("[name='engagement']").value = template
    }


  }
})

Template.Mobile_New_Letter_4.onCreated(() => {
  
  let template = Template.instance();

  template.autorun(() => {
    let letterId = FlowRouter.getParam('letterId')
    Remoto.subscribe('Parties', letterId)
  })

})

Template.Mobile_New_Letter_4.events({
  'click [name="add_party"]'(e, t) {
    let name = t.find('[name="partyname"]').value
    let letterId = FlowRouter.getParam('letterId')
    let type = "0";
    console.log('name')
    if (name !== "") {
      Remoto.call('addParty', name, type, letterId, (err) => {
        if (err) {
          alert(err)
        } else {
          
          t.find('[name="partyname"]').value = ""

          $('[name="next"]').prop('disabled', false)

          alert('Party added')
        }
      })
    } else {
        alert('Complete the name')
    }

  },
  'click [name="add_oparty"]'(e, t) {
    let name = t.find('[name="opposingpartyname"]').value
    let letterId = FlowRouter.getParam('letterId')
    let type = "1";

    if (name !== "") {
      Remoto.call('addParty', name, type, letterId, (err) => {
        if (err) {
          alert(err)
        } else {
          t.find('[name="opposingpartyname"]').value = ""
          $('[name="next"]').prop('disabled', false)
          alert('Party added')
        }
      })
    } else {
        alert('Complete the name')
    }
  },
  'click [name="next"]'(e, t) {
    let letterId = FlowRouter.getParam('letterId')
    FlowRouter.go('/mobile/new_letter/payments/' + letterId)
  }
})

Template.Mobile_New_Letter_4.helpers({
  parties() {
    return Parties.find({type: 'party'})
  },
  opossingParties() {
    return Parties.find({type: 'opossing_party'})
  },
  disabled() {
    if (Parties.find({}).fetch().length > 0) {
      return ''
    } else {
      return 'disabled'
    }
  }
})



Template.Mobile_New_Letter_2.helpers({
  templates() {
    return Templates.find()
  }
})

Template.Mobile_New_Letter_5.onCreated( () => {
  let template = Template.instance();

  template.texto = new ReactiveVar('Rate')

  template.textBox = new ReactiveVar(false)
  template.hourly = new ReactiveVar(true)
  template.payment = new ReactiveVar([])
  template.discount = new ReactiveVar([])
  template.array = []
  template.secondTotal = new ReactiveVar(0)
  template.total = new ReactiveVar(0)


  template.autorun(() => {
    Remoto.subscribe('Clients')
  })

})

Template.Mobile_New_Letter_5.helpers({
  text() {
    return Template.instance().texto.get()
  },
  textBox() {
    return Template.instance().textBox.get()
  },
  lawyers() {
    return Meteor.users.find()
  },
  isHourly() {
    return Template.instance().hourly.get()
  },
  payment() {
    return Template.instance().payment.get()
  },
  discount() {
    return Template.instance().discount.get()
  },
  total() {
    return Template.instance().total.get()
  },
  estimate() {
    return Template.instance().secondTotal.get()
  },
  /*deferral() {
    if (FlowRouter.getParam('letterId')) {
      return Letters.findOne().deferral
    } else {
      return ''
    }
  }*/
})

Template.Mobile_New_Letter_5.events({
 'keyup [name="discount"]'(e, t) {
    let amount = t.find('[name="amount"]').value
    let discount = t.find('[name="discount"]').value
    total = amount - (amount/100*discount)

    t.secondTotal.set(total)
  },
  'keyup [name="amount"]'(e, t) {
    let amount = t.find('[name="amount"]').value
    let discount = t.find('[name="discount"]').value
    total = amount - (amount/100*discount)

    t.secondTotal.set(total)
  },
  'change [name="engagement_charge"]'(e, t) {

    if (e.target.value === "1") {
      t.texto.set('Rate')
      t.textBox.set(false)
      t.hourly.set(true)
      t.payment.set([])
      t.total.set(0)
      t.find('[name="amount"]').value = ""
      t.find('[name="discount"]').value = ""
      t.find('[name="project_estimate"]').value = ""
      t.secondTotal.set(0)
      t.find('[name="deposit_amount"]').value = ""


    } else if (e.target.value === "2" ) {
      t.texto.set('Montly Retainer')
      t.textBox.set(true)
      t.hourly.set(false)
      $('[name="lawyers"]').remove()
      t.payment.set([])
      t.total.set(0)
      t.find('[name="amount"]').value = ""
      t.find('[name="discount"]').value = ""
      t.find('[name="project_estimate"]').value = ""
      t.secondTotal.set(0)
      t.find('[name="deposit_amount"]').value = ""

    } else if (e.target.value === "3") {
      $('[name="lawyers"]').remove()
      t.hourly.set(false)
      t.texto.set('Project Estimate')
      t.textBox.set(true)
      t.total.set(0)
      t.payment.set([])
      t.find('[name="amount"]').value = ""
      t.find('[name="discount"]').value = ""
      t.find('[name="project_estimate"]').value = ""
      t.secondTotal.set(0)
      t.find('[name="deposit_amount"]').value = ""
    }

  },
  'click [name="next"]'(e, t) {
    let letterId = FlowRouter.getParam('letterId')
    let price = t.find('[name="amount"]').value
    let discount = t.find('[name="discount"]').value
    let deposit_amount = t.find('[name="deposit_amount"]').value
    let deferral = null

    if ( t.find('[name="deferral"]') ) {
      deferral = t.find('[name="deferral"]').value  
    }
     

    let a = t.payment.get()
    let array = []
    if (price !== "") {
      price = parseInt(price)

      if (discount !== "") {
        discount = parseInt(discount)

        price = price - (price/100*discount)
      }

      if (deposit_amount !== "") {
        deposit_amount = parseInt(deposit_amount)

        price = price - deposit_amount
      } else {
        deposit_amount = null
      }


      if (t.texto.get() === "Rate") {
        a.push({
          lawyer: null,
          type: "Hourly",
          price: price
        })

      } else if (t.texto.get() === "Project Estimate") {
          array.push({
            lawyer: null,
            type: "Project",
            price: price
          })

          a = array;

      } else if (t.texto.get() === "Montly Retainer") {
        array.push({
          lawyer: null,
          type: "Retainer",
          price: price
        })

        a = array;
      }



      t.total.set(price)
      t.payment.set(a)

      t.find('[name="amount"]').value = ""
      t.find('[name="discount"]').value = ""
      t.find('[name="deposit_amount"]').value = ""
      t.find('[name="project_estimate"]').value = ""

    } else {
      alert('Complete the data')
    }


    if (typeof t.payment.get() !== 'undefined' && t.payment.get().length > 0 && t.total.get() !== 0) {
        
      if (!deferral) {
        deferral = null
      }

    
      Remoto.call('paymentEngagementLetter', t.payment.get(), t.total.get(), t.hourly.get(), deposit_amount, deferral, letterId, t.secondTotal.get(), (err) => {
        if (err) {
          alert(err)
        } else {

          Remoto.call('sendLetterToClient', letterId)

          FlowRouter.go('/mobile')
        }
      })
    } else {
      alert('Complete the payment Information')

    }


  }
})
