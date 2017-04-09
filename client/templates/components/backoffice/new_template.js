Template.NewTemplate.events({
  'click [name="add_template"]'(e, t) {
    let content = t.find('[name="engagement"]').value;
    let name = t.find('[name="template_name"]').value;
    if (content !== "") {
      Meteor.call('add_template', content, name, (err) => {
        if (err) {
          Bert.alert(err, 'danger')
        } else {
          Modal.hide('NewTemplate')
          Bert.alert('Template Added', 'success')
        }
      })
    } else {
      Bert.alert('Complete', 'warning')
    }
  }
})


Template.NewExclusionTemplate.events({
  'click [name="add_template"]'(e, t) {
    let content = t.find('[name="engagement"]').value;
    let name = t.find('[name="template_name"]').value;
    if (content !== "") {
      Meteor.call('add_exclusion_template', content, name, (err) => {
        if (err) {
          Bert.alert(err, 'danger')
        } else {
          Modal.hide('NewExclusionTemplate')
          Bert.alert('Template Added', 'success')
        }
      })
    } else {
      Bert.alert('Complete', 'warning')
    }
  }
})
