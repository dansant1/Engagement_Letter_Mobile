import Remoto from '../../../../both/conexion'

import { Letters, Clients, Templates, Parties, Default_Templates, Engagement_types } from '../../../../both/conexion'

Template.Mobile_New_Letter.onCreated(() => {

  let template = Template.instance();

  template.autorun( () => {
    Remoto.subscribe('Clients')
    Remoto.subscribe('Letters')
  })

})

Template.Mobile_New_Letter.helpers({
  clients() {
    return Clients.find()
  },
  edit() {
    if (FlowRouter.getParam('letterId')) {
      return true
    } else {
      return false
    }
  },
  client() {
    if (FlowRouter.getParam('letterId')) {
    
      return Clients.findOne({_id: Letters.findOne({_id: FlowRouter.getParam('letterId')}).engagement_client})
    } else {
      return 
    }
  }
})

Template.Mobile_New_Letter_2.events({

  'change [name="engagement_type"]'(e, t) {

      if (e.target.value !== "?" ) {

          let tipo = e.target.value
          
          if (  tipo !== "0" ) {

            if (tipo == "1") {
              t.find('[name="engagement"]').value = 'to represent you in connection with the dissolution of your entity, [name], and related tax issues. This letter confirms the terms on which we will represent you in this matter.'
              return
            } else if ( tipo == "2") {
              t.find('[name="engagement"]').value = ' [the formation of the company and its initial stock issuances].  [You will be responsible for applying for and obtaining all taxpayer identification numbers and business licenses and for making any tax elections (such as S Corporation elections).  Individual stockholders will be responsible for timely filing their own tax filings (as we do not represent them), such as 83(b) elections.]'
              return
            } 
          } else {
            t.find('[name="engagement"]').value = ''
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
  'click [name="next"]'(e, t){

    let client = $('[name="engagement_client"]').val()
    let letterId = FlowRouter.getParam('letterId')
    if (client !== "0") {
      Session.set('clientId', client)
      
      if ( letterId ) {
        client = Letters.findOne({_id: letterId}).engagement_client

        let data = {
          company_name: t.find("[name='name']").value,
          company_address: t.find("[name='address']").value,
          company_phone: t.find("[name='phone']").value,
          company_client_name: t.find("[name='client_name']").value,
          company_client_email: t.find("[name='client_email']").value,
        }

        console.log(data)

        Session.set('clientId', client)
        Session.set('clientData', data)
        
        FlowRouter.go('/mobile/new_letter/write_letter/' + letterId)    
      } else {
        FlowRouter.go('/mobile/new_letter/write_letter')  
      } 

    } else {
      if ( !letterId ) {

        let data = {
          company_name: t.find("[name='name']").value,
          company_address: t.find("[name='address']").value,
          company_phone: t.find("[name='phone']").value,
          company_client_name: t.find("[name='client_name']").value,
          company_client_email: t.find("[name='client_email']").value,
        }

        if (data.client_name !== "" && data.company_address !== "" && data.company_phone !== "" && data.company_client_name !== ""  && data.company_client_email !== "") {
          
          Remoto.call('add_client', data, (err, result) => {
            if (err) {
              alert(err)
            } else {
              t.find("[name='name']").value = ""
              t.find("[name='address']").value = ""
              t.find("[name='phone']").value = ""
              t.find("[name='client_name']").value = ""
              t.find("[name='client_email']").value = ""
              Session.set('clientId', result)

              FlowRouter.go('/mobile/new_letter/write_letter')
            }
          })

        } else {
          alert('Complete the Data of the Client')
        }

      } else {

        client = Letters.findOne({_id: letterId}).engagement_client

        let data = {
          company_name: t.find("[name='name']").value,
          company_address: t.find("[name='address']").value,
          company_phone: t.find("[name='phone']").value,
          company_client_name: t.find("[name='client_name']").value,
          company_client_email: t.find("[name='client_email']").value,
        }

        console.log(data)

         Session.set('clientId', client)
         Session.set('clientData', data)

          FlowRouter.go('/mobile/new_letter/write_letter/' + letterId) 

      }
      
    }
  }
})

Template.Mobile_New_Letter_2.onCreated(() => {

  let template = Template.instance();
  let letterId = FlowRouter.getParam('letterId')

  template.autorun(() => {
    Remoto.subscribe('Templates')
    Remoto.subscribe('Engagement_Types')
    Remoto.subscribe('defaultTemplates')
    if (letterId) {
      Remoto.subscribe('Letter', letterId)
    }


  })

})


Template.Mobile_New_Letter_2.helpers({
  defaultTemplates() {

    return Default_Templates.find()
  },
  engagement_types() {

    return Engagement_types.find()
  },
  engagement() {
    let letterId = FlowRouter.getParam('letterId')

    if (letterId) {
      console.log(Letters.findOne().engagement)
      return Letters.findOne().engagement
    } else {
      return ''
    }
  }
})

Template.Mobile_New_Letter_2.events({
  'click [name="next"]'(e, t) {
    let engagement = t.find("[name='engagement']").value
    let engagement_type = "1" //$('#engagement_type').val()
    let engagement_client = Session.get('clientId')
    let clientId = Session.get('clientId')
    let letterId = FlowRouter.getParam('letterId')
    if (engagement !== "" && engagement_type !== '0') {

      if (letterId) {
        engagement_client = Letters.findOne({_id: letterId}).engagement_client
        engagement_type  = Letters.findOne({_id: letterId}).engagement_type

        Remoto.call('client_update', Session.get('clientData'), Session.get('clientId'), (err) => {
            if (!err) {
              Remoto.call('editEngagementLetter1', FlowRouter.getParam('letterId'),  engagement_type, engagement_client, engagement, (err, result) => {
                if (err) {
                  Bert.alert(err, 'danger')
                } else {
                  FlowRouter.go('/mobile/new_letter/conflicts/' + letterId)
                 
                }
              })
            } else {
              Bert.alert(err, 'danger')
            }
        })
       

      } else {

        Remoto.call('createEngagementLetter1', engagement_type, engagement_client, engagement, clientId, (err, result) => {
          if (err) {
            alert(err)
          } else {
            FlowRouter.go('/mobile/new_letter/conflicts/' + result)
          }
        })
        
      }

      

    } else {

      if (letterId) {
        engagement_client = Letters.findOne().engagement_client
        engagement_type  = Letters.findOne().engagement_type

        Remoto.call('client_update', Session.get('clientData'), Session.get('clientId'), (err) => {
            if (!err) {
              Remoto.call('editEngagementLetter1', FlowRouter.getParam('letterId'),  engagement_type, engagement_client, engagement, (err, result) => {
                if (err) {
                  Bert.alert(err, 'danger')
                } else {
                  FlowRouter.go('/mobile/new_letter/conflicts/' + letterId)
                 
                }
              })
            } else {
              Bert.alert(err, 'danger')
            }
          })
        
        /*Remoto.call('editEngagementLetter1', letterId, engagement_type, engagement_client, engagement, clientId, (err, result) => {
          if (err) {
            alert(err)
          } else {
            FlowRouter.go('/mobile/new_letter/conflicts/' + letterId)
          }
        })*/

      } else {
         alert('Type the Letter')
      }
     
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
  'click .remove'(e, t) {
    Remoto.call('removeParty', this._id, (err) => {
      if (!err) {
        alert('Party Removed', 'success')
      } else {
        alert(err, 'danger') 
      }
    })
  },
  'click [name="add_party"]'(e, t) {
    let name = t.find('[name="partyname"]').value
    let letterId = FlowRouter.getParam('letterId')
    let type = "0";
   
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
  },
  'click [name="skip"]'(e, t) {
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
  template.deposit = new ReactiveVar()
  template.payment = new ReactiveVar([])
  template.discount = new ReactiveVar([])
  template.array = []
  template.secondTotal = new ReactiveVar(0)
  template.total = new ReactiveVar(0)


  template.autorun(() => {
  
    let letterId = FlowRouter.getParam('letterId')
    Remoto.subscribe('Letter', letterId, () => {
      if (Letters.findOne().secondTotal) {
        console.log(Letters.findOne().secondTotal)
         template.secondTotal.set(Letters.findOne().secondTotal) 
      }

      if (Letters.findOne().deposit) {
         template.deposit.set(Letters.findOne().deposit)
      }
    })
    Remoto.subscribe('Clients')
  
  })

})

Template.Mobile_New_Letter_5.helpers({
  deferral() {
    if (FlowRouter.getParam('letterId')) {
      return Letters.findOne().deferral
    } else {
      return ''
    }
  },
  deposit() {
    return Template.instance().deposit.get()  
  },
  isEdit() {
    if (Letters.findOne().payment[0]) {
      return true
    } else {
      return false
    }
  },
  checked() {
    let recurring = Letters.findOne().recurring
    if (recurring) {
      if (recurring === true) {
        return 'checked'  
      } else {
        return ''
      }
      
    } else {
      return ''
    }
  }
})

Template.Mobile_New_Letter_5.events({
  'keyup [name="deposit_amount"]'(e, t) {
    if (e.target.value !== "") {
      $('#checkbox1').prop('disabled', false)
    } else {
      $('#checkbox1').prop('disabled', true)
      $('#checkbox1').prop('checked', false)
    }
  },
  'click [name="next"]'(e, t) {
    
    let letterId = FlowRouter.getParam('letterId')
    let deposit_amount = t.find('[name="deposit_amount"]').value
    let deferral = t.find("[name='deferral']").value

    if ( deferral === "" ) {
      deferral = null
    } 
     
    if (deposit_amount === "") {
      deposit_amount = null
    }

    let type = $('[name="engagement_charge"]').val()

    let recurring = $('#checkbox1').is(":checked")

    Remoto.call('paymentEngagementLetter', type, recurring, deposit_amount, deferral, letterId, (err) => {

          if (err) {

            alert(err)

          } else {

            Remoto.call('sendLetterToClient', letterId, (err) => {
              if (!err) {
                FlowRouter.go('/mobile')
              } else {
                alert(err)
              }
            })
            
          }
    }) 


  }
})
