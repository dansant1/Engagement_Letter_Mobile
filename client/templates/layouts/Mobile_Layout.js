import Remoto from '../../../both/conexion'

Template.Mobile_Layout.events({
  'click .segundo'() {
    $(".primero").removeClass('activo')
    $(".segundo").addClass('activo')
  },
  'click .primero'() {
    $(".segundo").removeClass('activo')
    $(".primero").addClass('activo')
  },
  'click #logout'() {
  	Remoto.setUserId(undefined)
  	
  	FlowRouter.go('/mobile/login')
  }
})
