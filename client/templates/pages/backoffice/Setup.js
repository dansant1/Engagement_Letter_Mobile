Template.Setup.events({
  'click [name="add_member_team"]'(e, t) {
    let data = {
      name: t.find('[name="name_member"]').value,
      email: t.find('[name="team_email"]').value
    }

    if (data.email !== "" && data.name !== "") {
      Meteor.call('InviteMember', data, (err) => {
        if (err) {
          Bert.alert( err, 'danger', 'growl-top-right' );
          t.find('[name="name_member"]').value = ""
          t.find('[name="team_email"]').value = ""
        } else {
          Bert.alert('Invite Sended', 'success', 'growl-top-right' );
          t.find('[name="name_member"]').value = ""
          t.find('[name="team_email"]').value = ""
        }
      })
    } else {
      Bert.alert('Complete his details', 'warning', 'growl-top-right' );
    }
  },
  'click [name="add_conflict_email"]'(e, t) {
    let conflict = t.find('[name="conflict_email_alias"]').value;

    if (conflict !== "") {
      Meteor.call('saveConflictAlias', conflict, (err) => {
        if (err) {
            Bert.alert( err, 'danger', 'growl-top-right' );
            t.find('[name="conflict_email_alias"]').value = ""
        } else {
          t.find('[name="conflict_email_alias"]').value = ""
          Bert.alert('Conflict Alias Saved', 'success', 'growl-top-right' );
        }
      })
    } else {
        Bert.alert('Complete th email', 'warning', 'growl-top-right' );
    }
  }
})
