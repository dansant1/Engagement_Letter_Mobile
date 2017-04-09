Template.Mobile_New_Letter_5.onCreated( () => {
  let template = Template.instance();

  template.texto = new ReactiveVar('Hourly')
})

Template.Mobile_New_Letter_5.helpers({
  text() {
    return Template.instance().texto.get()
  }
})

Template.Mobile_New_Letter_5.events({
  'change [name="engagement_charge"]'(e, t) {

    if (e.target.value === "1") {
      t.texto.set('Hourly')
    } else if (e.target.value === "2" ) {
      t.texto.set('Montly Retainer')
    } else if (e.target.value === "3") {
      t.texto.set('Project Estimate')
    } else {
      t.texto.set('Type of Charge')
    }

  }
})
