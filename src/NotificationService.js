import PushNotification from 'react-native-push-notification';
import EqModule from './EqModule';

const channelId = 'EqNotificationChannel';
let presets;

export function initialize(presetsNew) {
  presets = presetsNew;
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      switch (notification.action) {
        case presets[0]:
          EqModule.setBand(15, 0);
          EqModule.setBand(15, 1);
          EqModule.setBand(15, 2);
          EqModule.setBand(-15, 3);
          EqModule.setBand(-15, 4);
          EqModule.setBb(1000);
          break;
        case presets[1]:
          EqModule.setBand(0, 0);
          EqModule.setBand(0, 1);
          EqModule.setBand(0, 2);
          EqModule.setBand(0, 3);
          EqModule.setBand(0, 4);
          EqModule.setBb(500);
          break;
        case presets[2]:
          EqModule.setBand(-15, 0);
          EqModule.setBand(-15, 1);
          EqModule.setBand(-15, 2);
          EqModule.setBand(15, 3);
          EqModule.setBand(15, 4);
          EqModule.setBb(0);
      }
    },
    popInitialNotification: false,
    requestPermissions: Platform.OS === 'ios',
  });
}

export function show(activePreset) {
  PushNotification.channelExists(channelId, (exists) => {
    PushNotification.cancelAllLocalNotifications();
    console.log(exists);
    if (!exists) {
      PushNotification.createChannel({
        channelId: channelId, // (required)
        channelName: 'EQ Notification Channel', // (required)
        playSound: false,
        vibrate: false,
      });
    }
    PushNotification.localNotification({
      channelId: channelId, // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
      actions: presets, // (Android only) See the doc for notification actions to know more
      message: `Active preset: ${presets[activePreset]}`, // (required)
      ongoing: true,
      autoCancel: false,
      playSound: false,
      vibrate: false,
      invokeApp: false,
    });
  });
}

export function close() {
  PushNotification.cancelAllLocalNotifications();
  PushNotification.deleteChannel(channelId);
}
