import RNFS from 'react-native-fs';
import {ToastAndroid} from 'react-native';

export const path = RNFS.DocumentDirectoryPath + '/state.json';

export function write(state) {
  const {enabled, bbIsSupported, ...serializableState} = state;
  RNFS.writeFile(path, JSON.stringify(serializableState)).then(() => {
    ToastAndroid.show('settings saved', ToastAndroid.LONG);
  });
}
