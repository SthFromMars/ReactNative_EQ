// import PushNotification from 'react-native-push-notification';
// import {changePreset} from '../state/actions';
// import store from '../state/store';
//
// const channelId = 'EqNotificationChannel';
//
// export function initialize() {
//   const state = store.getState();
//   PushNotification.configure({
//     // (required) Called when a remote is received or opened, or local notification is opened
//     onNotification: function (notification) {},
//     // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
//     onAction: function (notification) {
//       switch (notification.action) {
//         case state.presets[0].name:
//           store.dispatch(changePreset(0));
//           show(store);
//           break;
//         case state.presets[1].name:
//           store.dispatch(changePreset(1));
//           show(store);
//           break;
//         case state.presets[2].name:
//           store.dispatch(changePreset(2));
//           show(store);
//       }
//     },
//     popInitialNotification: false,
//     requestPermissions: Platform.OS === 'ios',
//   });
// }
//
// export function show() {
//   const state = store.getState();
//   const activePreset = state.activePreset;
//   const presets = state.presets.map((preset) => preset.name);
//   const presetName = state.presets[activePreset].name;
//   PushNotification.channelExists(channelId, (exists) => {
//     PushNotification.cancelAllLocalNotifications();
//     if (!exists) {
//       PushNotification.createChannel({
//         channelId: channelId, // (required)
//         channelName: 'EQ Notification Channel', // (required)
//         playSound: false,
//         vibrate: false,
//       });
//     }
//     PushNotification.localNotification({
//       channelId: channelId, // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
//       actions: presets, // (Android only) See the doc for notification actions to know more
//       message: `Active preset: ${presetName}`, // (required)
//       ongoing: true,
//       autoCancel: false,
//       playSound: false,
//       vibrate: false,
//       invokeApp: false,
//     });
//   });
// }
//
// export function close() {
//   PushNotification.cancelAllLocalNotifications();
//   PushNotification.deleteChannel(channelId);
// }
