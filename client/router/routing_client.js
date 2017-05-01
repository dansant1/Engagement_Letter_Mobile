
FlowRouter.route('/', {
  name: 'Mobile Design Signup',
  action() {
    BlazeLayout.render('Mobile_Signup')
  }
})

FlowRouter.route('/mobile/signup', {
  name: 'Mobile Design Signup',
  action() {
    BlazeLayout.render('Mobile_Signup')
  }
})

FlowRouter.route('/mobile/signup/2', {
  name: 'Mobile Design Signup',
  action() {
    BlazeLayout.render('Mobile_Signup_2')
  }
})

FlowRouter.route('/mobile/login', {
  name: 'Mobile Design login',
  action() {
    BlazeLayout.render('Mobile_Login')
  }
})

FlowRouter.route('/mobile', {
  name: 'Mobile Design',
  action() {
    BlazeLayout.render('Mobile_Layout', { page: 'Mobile_Home'})
  }
})

FlowRouter.route('/mobile/setup', {
  name: 'Mobile Design Setup',
  action() {
    BlazeLayout.render('Mobile_Layout', { page: 'Mobile_Setup'})
  }
})

FlowRouter.route('/mobile/new_letter', {
  name: 'Mobile Design New Letter',
  action() {
    BlazeLayout.render('Mobile_New_Letter')
  }
})

FlowRouter.route('/mobile/new_letter/write_letter', {
  name: 'Mobile Design New Letter 2',
  action() {
    BlazeLayout.render('Mobile_New_Letter_2')
  }
})

FlowRouter.route('/mobile/new_letter/write_letter/:letterId', {
  name: 'Mobile Design New Letter 2',
  action() {
    BlazeLayout.render('Mobile_New_Letter_2')
  }
})

FlowRouter.route('/mobile/new_letter/write_exclusion', {
  name: 'Mobile Design New Letter 3',
  action() {
    BlazeLayout.render('Mobile_New_Letter_3')
  }
})

FlowRouter.route('/mobile/create-template', {
  name: 'Create Template',
  action() {
    BlazeLayout.render('Mobile_New_Template')
  }
})

FlowRouter.route('/mobile/draw', {
  name: 'Draw Signature',
  action() {
    BlazeLayout.render('Mobile_Draw')
  }
})

FlowRouter.route('/mobile/new_letter/conflicts/:letterId', {
  name: 'Mobile Design New Letter 4',
  action() {
    BlazeLayout.render('Mobile_New_Letter_4')
  }
})

FlowRouter.route('/mobile/new_letter/payments/:letterId', {
  name: 'Mobile Design New Letter 5',
  action() {
    BlazeLayout.render("Mobile_New_Letter_5")
  }
})

FlowRouter.route('/mobile/new_letter/signature', {
  name: 'Mobile Design New Letter 6',
  action() {
    BlazeLayout.render("Mobile_New_Letter_6")
  }
})

FlowRouter.route('/mobile/edit/:letterId', {
  name: 'Edit Letter',
  action() {
    BlazeLayout.render("Mobile_New_Letter")
  }
})

FlowRouter.route('/mobile/draw_signature', {
  name: 'Mobile Design Draw Signature',
  action() {
    BlazeLayout.render("Draw_Signature")
  }
})

FlowRouter.route('/mobile/letters', {
  name: 'Mobile Design List of Letters',
  action() {
    BlazeLayout.render('Mobile_Layout', { page: 'Mobile_List_Letters'})
  }
})

FlowRouter.route('/mobile/preview/:letterId', {
  name: 'Preview of Letter',
  action() {
    BlazeLayout.render('Preview')
  }
})

FlowRouter.route('/mobile/view_letter/:letterId', {
  name: 'Mobile Design View of Letter',
  action() {
    BlazeLayout.render('Mobile_Layout', { page: 'mobile_view_letter'})
  }
})
