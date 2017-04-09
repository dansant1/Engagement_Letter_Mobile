Template.letters.onCreated(() => {
  let template = Template.instance()

  template.autorun( () => {
    template.subscribe('Letters')
    template.subscribe('Clients')
    template.subscribe('Lawyers')
  })

})

Template.letters.helpers({
  letters() {
    return Letters.find()
  },
  client_name() {
    return Clients.findOne({_id: this.engagement_client}).company_name
  },
  lawyer() {
    return Meteor.users.findOne({_id: this.createdBy}).profile.first_name + Meteor.users.findOne({_id: this.createdBy}).profile.last_name
  }
})
