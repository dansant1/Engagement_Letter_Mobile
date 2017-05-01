// the entire section is optional.
App.info({
  id: 'co.engagement.letter.grupoddv',
  name: 'Engagement Letter',
  description: 'Engagement Letter',
  author: 'Grupo DDV SAC - Engagement Letter Co',
  email: 'admin@engagementletter.co',
  version: '1.0.0',
});

App.setPreference('Orientation', 'portrait');

App.accessRule('*');

/*App.icons({
  'iphone_2x': 'public/logos/logo_120x120.png',
  'iphone_3x': 'public/logos/logo_180x180.png',
  'ipad': 'public/logos/logo_76x76.png',
  'ipad_2x': 'public/logos/logo_152x152.png',
  'ipad_pro': 'public/logos/logo_167x167.png',
  'ios_settings': 'public/logos/logo_29x29.png',
  'ios_settings_2x': 'public/logos/logo_58x58.png',
  'ios_settings_3x': 'public/logos/logo_87x87.png',
  'ios_spotlight': 'public/logos/logo_40x40.png',
  'ios_spotlight_2x': 'public/logos/logo_80x80.png'
});*/

/*App.launchScreens({
  'iphone_2x': 'public/logos/launch_640x960.png',
  'iphone5': 'public/logos/launch_640x1136.png',
  'iphone6': 'public/logos/launch_750x1334.png',
  'iphone6p_portrait': 'public/logos/launch_1242x2208.png'
});*/

App.appendToConfig(`<platform name="ios">
    <config-file platform="ios" target="*-Info.plist" parent="NSPhotoLibraryUsageDescription">
      <string>We access to the photos of your device</string>
    </config-file>
    <config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription">
      <string>We access to the photos of your device</string>
    </config-file>
  </platform>`);