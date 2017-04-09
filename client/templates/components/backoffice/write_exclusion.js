Template.Write_Exclusion.onCreated(() => {
  let template = Template.instance()

  template.autorun( () => {
    template.subscribe('Exclusion_Templates')
  })
})

Template.Write_Exclusion.helpers({
  templates() {
    return ExclusionTemplates.find()
  }
})

Template.Write_Exclusion.events({
  'change [name="engagement_template"]'(e, t) {
    if (e.target.value === "n") {
      Modal.show('NewExclusionTemplate')
      return;
    }

    if (e.target.value !== "0") {
      t.find('[name="engagement"]').value = e.target.value
    }
  },
  'click [name="next"]'(e, t) {
    let letterId = FlowRouter.getParam('letterId')

    let engagement = t.find('[name="engagement"]').value
    if (engagement !== "" ) {
      Meteor.call('createEngagementLetter2', engagement, letterId, (err) => {
        if (err) {
          Bert.alert(err, 'danger')
        } else {
          FlowRouter.go('/new_letter/step_3/' + letterId)
        }
      })
    }
  }
})
