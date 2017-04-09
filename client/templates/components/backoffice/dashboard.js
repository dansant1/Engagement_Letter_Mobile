Template.Dashboard.onCreated(() => {
  let template = Template.instance()

  template.autorun( () => {
    template.subscribe('Feed')
  })

})

Template.Dashboard.helpers({
  feed() {
    return Feed.find()
  }
})
