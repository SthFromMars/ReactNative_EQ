import EqModule from '../src/EqModule';
import {enableBb} from '../state/actions';
import store from '../state/store';

let bbEnablerID;

export function start() {
  bbEnablerID = setInterval(() => {
    EqModule.getBbSettings((settings) => {
      const {isSupported} = settings;
      if (isSupported !== store.getState().bbIsSupported) {
        store.dispatch(enableBb(isSupported));
      }
    });
  }, 1000);
  EqModule.startBbTimer();
}

export function stop() {
  clearTimeout(bbEnablerID);
  EqModule.stopBbTimer();
}
