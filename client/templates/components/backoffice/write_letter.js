Template.Write_Letter.onCreated( () => {
  let template = Template.instance()

  template.autorun( () => {
    template.subscribe('Clients')
    template.subscribe('Templates')
  })

})

Template.Write_Letter.helpers({
  clients() {
    return Clients.find()
  },
  templates() {
    return Templates.find()
  }
})

Template.Write_Letter.events({
  'change [name="engagement_template"]'(e, t) {
    console.log(e.target.value);
    if (e.target.value === "?" || e.target.value === "n") {
        if (e.target.value === "n") {
          Modal.show('NewTemplate')
        }
    } else {
      t.find('[name="engagement"]').value = e.target.value
    }

  },
  'click [name="add_client"]'(e, t) {
    let data = {
      company_name: t.find('[name="name"]').value,
      company_address: t.find('[name="address"]').value,
      company_phone: t.find('[name="phone"]').value,
      company_client_name: t.find('[name="client_name"]').value,
      company_client_email: t.find('[name="client_email"]').value,
    }

    if (data.company_name !== "" && data.company_address !== "" && data.company_phone !== "" && data.company_client_name !== "" && data.company_client_email !== "") {
      Meteor.call('add_client', data,  (err) => {
        if (err) {
          t.find('[name="name"]').value = ""
          t.find('[name="address"]').value = ""
          t.find('[name="phone"]').value = ""
          t.find('[name="client_name"]').value = ""
          t.find('[name="client_email"]').value = ""
          Bert.alert( err, 'danger', 'growl-top-right' );
        } else {
          t.find('[name="name"]').value = ""
          t.find('[name="address"]').value = ""
          t.find('[name="phone"]').value = ""
          t.find('[name="client_name"]').value = ""
          t.find('[name="client_email"]').value = ""
          Bert.alert( 'Client added', 'success', 'growl-top-right' );
        }
      })
    } else {
      Bert.alert( 'Complete the Details', 'warning', 'growl-top-right' );
    }
  },
  'click [name="next"]'(e, t) {

    let engagement_type;
    let engagement_client;
    let engagement;

    if ($('[name="engagement_type"]').val() === "0") {
      Bert.alert('Choose a Type', 'warning')
      return;
    } else{
      engagement_type = $('[name="engagement_type"]').val()
    }

    if ($('[name="engagement_client"]').val() === "0") {
      Bert.alert('Choose a Client', 'warning')
      return;
    } else {
      engagement_client = $('[name="engagement_client"]').val()
    }

    if ($('[name="engagement"]').val() === "0") {
      Bert.alert('Write a Engagement', 'warning')
      return;
    } else {
      engagement = $('[name="engagement"]').val()
    }

    Meteor.call('createEngagementLetter1', engagement_type, engagement_client, engagement, (err, result) => {
      if (err) {
        Bert.alert(err, 'danger')
      } else {
        FlowRouter.go('/new_letter/step_2/' + result)
      }
    })
  }
})
