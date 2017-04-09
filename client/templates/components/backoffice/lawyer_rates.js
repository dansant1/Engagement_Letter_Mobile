Template.Lawyer_Rates.onCreated( () => {
  let template = Template.instance();

  template.texto = new ReactiveVar('Hourly')
  template.hourly = new ReactiveVar(true)
  template.payment = new ReactiveVar([])
  template.discount = new ReactiveVar([])
  template.array = []
  template.secondTotal = new ReactiveVar(0)
  template.total = new ReactiveVar(0)
  template.autorun(() => {
    template.subscribe('lawyers')
  })


})

Template.Lawyer_Rates.helpers({
  text() {
    return Template.instance().texto.get()
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
  }
})

Template.Lawyer_Rates.events({
  'change [name="engagement_charge"]'(e, t) {

    if (e.target.value === "1") {
      t.texto.set('Hourly')
      t.hourly.set(true)
      t.payment.set([])
      t.total.set(0)
      t.find('[name="amount"]').value = ""
      t.find('[name="discount"]').value = ""
      t.find('[name="project_estimate"]').value = ""
      t.find('[name="deposit_amount"]').value = ""


    } else if (e.target.value === "2" ) {
      t.texto.set('Montly Retainer')
      t.hourly.set(false)
      $('[name="lawyers"]').remove()
      t.payment.set([])
      t.total.set(0)
      t.find('[name="amount"]').value = ""
      t.find('[name="discount"]').value = ""
      t.find('[name="project_estimate"]').value = ""
      t.find('[name="deposit_amount"]').value = ""

    } else if (e.target.value === "3") {
      $('[name="lawyers"]').remove()
      t.hourly.set(false)
      t.texto.set('Project Estimate')
      t.total.set(0)
      t.payment.set([])
      t.find('[name="amount"]').value = ""
      t.find('[name="discount"]').value = ""
      t.find('[name="project_estimate"]').value = ""
      t.find('[name="deposit_amount"]').value = ""
    }

  },
  'click [name="add"]'(e, t) {
    let project_estimate = t.find('[name="amount"]').value
    let discount = t.find('[name="discount"]').value
    let deposit_amount = t.find('[name="deposit_amount"]').value
    if (project_estimate !== "") {
      if (discount !== "") {
        project_estimate = project_estimate - (project_estimate/100*discount)

      }

      if (deposit_amount !== "") {
        project_estimate = project_estimate - deposit_amount
      }
      let array = []
      array.push({
        lawyer: 'Dan Delgado',
        price: project_estimate
      })
      t.total.set(project_estimate)
      t.payment.set(array)
      t.find('[name="amount"]').value = ""
      t.find('[name="discount"]').value = ""
      t.find('[name="deposit_amount"]').value = ""
      t.find('[name="project_estimate"]').value = ""
    } else {
      Bert.alert('Complete the Data', 'warning')
    }
  },
  'click [name="add_associate"]'(e, t) {
    let price = t.find('[name="amount"]').value
    let discount = t.find('[name="discount"]').value
    let deposit_amount = t.find('[name="deposit_amount"]').value


    if (price !== "") {
      price = parseInt(price)

      if (discount !== "") {
        discount = parseInt(discount)

        price = price - (price/100*discount)
      }

      if (deposit_amount !== "") {
        deposit_amount = parseInt(deposit_amount)

        price = price - deposit_amount
      }


      let a = t.payment.get()
      console.log($('#lawyer_assigned').val());
      console.log($('#lawyer_assigned option:selected').text());
      a.push({
        lawyer: $('#lawyer_assigned option:selected').text(),
        lawyerId: $('#lawyer_assigned').val(),
        price: price
      })

      t.total.set(t.total.get() + price)
      t.payment.set(a)
      t.find('[name="amount"]').value = ""
      t.find('[name="discount"]').value = ""
      t.find('[name="deposit_amount"]').value = ""
      t.find('[name="project_estimate"]').value = ""

    } else {
      Bert.alert('Compelete the data', 'success')
    }
  },
  'keyup [name="discount"]'(e, t) {
    let amount = t.find('[name="amount"]').value
    let discount = t.find('[name="discount"]').value
    total = amount - (amount/100*discount)

    t.secondTotal.set(total)
  },
  'click [name="next"]'(e, t) {
    let letterId = FlowRouter.getParam('letterId')

    if (typeof t.payment.get() !== 'undefined' && t.payment.get().length > 0 && t.total.get() !== 0) {
      Meteor.call('paymentEngagementLetter', t.payment.get(), t.total.get(), t.hourly.get(), letterId, (err) => {
        if (err) {
          Bert.alert(err, 'danger')
        } else {
          FlowRouter.go('/new_letter/step_5/' + letterId)
        }
      })
    } else {
      Bert.alert('Complete the payment Information', 'success')

    }

  },
  'click [name="save"]'() {
    let letterId = FlowRouter.getParam('letterId')

    if (letterId) {
      Meteor.call('saveDraftLetter', letterId, (err) => {
        if (err) {
          Bert.alert(err, 'danger')
        } else {
          FlowRouter.go('/home')
        }
      })
    }
  }
})
