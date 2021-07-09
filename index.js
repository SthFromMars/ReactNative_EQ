import {AppRegistry, Linking, ToastAndroid} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import * as NotificationService from './src/NotificationService';
import store from './state/store';
import {changePreset, setState} from './state/actions';
import * as BbEnableService from './src/BbEnableService';
import RNFS from 'react-native-fs';
import EqModule from './src/EqModule';
import * as FileService from './src/FileService';

async function openSpotify() {
  const supported = await Linking.canOpenURL('spotify://');
  if (supported) {
    // await Linking.openURL('spotify://');
  } else {
    ToastAndroid.show('Could not open Spotify', ToastAndroid.LONG);
  }
}

function initialization() {
  // NotificationService.initialize();
  EqModule.setStatus(true, () => {
    store.dispatch(changePreset(store.getState().activePreset));
    BbEnableService.start();
    // NotificationService.show();
    openSpotify().then(() => {});
  });
}

AppRegistry.registerComponent(appName, () => App);
RNFS.exists(FileService.path).then((fileExists) => {
  console.log(fileExists);
  if (fileExists) {
    RNFS.readFile(FileService.path)
      .then((stateJson) => {
        console.log(stateJson);
        const readState = JSON.parse(stateJson);
        store.dispatch(setState(readState));
        initialization();
      })
      .catch((e) => {
        console.log(`readFailed: ${e}`);
        RNFS.unlink(FileService.path).then(() => {
          FileService.write(store.getState());
          initialization();
        });
      });
  } else {
    FileService.write(store.getState());
    initialization();
  }
});
