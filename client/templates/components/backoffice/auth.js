Template.Auth_Step_1.onCreated(() => {

  let template = Template.instance()
  Session.setDefault('email_signup', '')

  template.autorun(() => {
    template.subscribe('Invites', () => {
      let invite = FlowRouter.getParam('inviteId')
      if (invite) {
        let emailInvite = Invites.findOne({_id: invite}).email
        let nameInvite = Invites.findOne({_id: invite}).name
        Session.set('email_signup', emailInvite)
        Session.set('name_signup', nameInvite)
      }
    })
  })

})

Template.Auth_Step_2.onCreated(() => {

  let template = Template.instance()
  Session.setDefault('name_signup', '')

  template.autorun(() => {
    template.subscribe('Invites', () => {
      let invite = FlowRouter.getParam('inviteId')
      if (invite) {
        let nameInvite = Invites.findOne({_id: invite}).name
        let firmName = Invites.findOne({_id: invite}).firm_name
         Session.set('firm_name', firmName)
        Session.set('name_signup', nameInvite)
      }
    })
  })

})

Template.Auth_Step_2.helpers({
  name() {
    return Session.get('name_signup')
  },
  firmName() {
    return Session.get('firm_name')
  }
})

Template.Auth_Step_1.helpers({
  email() {
    return Session.get('email_signup')
  }
})


Template.Auth_Step_1.events({
  'click .signup'(e, t) {
    let email = t.find('[name="email"]').value
    Session.set('email_signup', email)
    let inviteId = FlowRouter.getParam('inviteId')
    if (inviteId) {
      FlowRouter.go('/auth_2/' + inviteId)
    } else {
      FlowRouter.go('/auth_2/')
    }
  }
})

Template.Auth_Step_2.events({
  'submit form'(e, t) {
    e.preventDefault()

    let data = {
        firm_name: t.find('[name="firm_name"]').value,
        first_name: t.find('[name="first_name"]').value,
        last_name: t.find('[name="last_name"]').value,
        email: Session.get('email_signup'),
        phone_number: t.find('[name="phone_number"]').value,
        password: t.find('[name="password"]').value,
        inviteId: FlowRouter.getParam('inviteId')
    }

    if (data.firm_name !== "" && data.first_name !== "" && data.last_name !== "" && data.email !== "" && data.phone_number !== "" && data.password !== "") {
      if (data.password.length >= 8) {
        Meteor.call('signup', data, (err) => {
          if (err) {
              Bert.alert( err, 'danger', 'growl-top-right' );
          } else {
            Meteor.loginWithPassword(data.email, data.password, (err) => {
              if (err) {
                Bert.alert( err, 'danger', 'growl-top-right' );
              } else {
                  FlowRouter.go('/home')
              }
            })

          }
        })
      } else {
        Bert.alert('The password must have minimun 8 characters', 'warning')
      }

    } else {
      Bert.alert( 'Complete your details', 'warning', 'growl-top-right' );
    }

  }
})
