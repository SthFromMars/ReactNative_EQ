import {
  CHANGE_BB_STATUS,
  CHANGE_EQ_VALUE,
  CHANGE_PRESET,
  CHANGE_BB_VALUE,
  CHANGE_STATUS,
  SET_STATE,
  SAVE_STATE,
} from './actionTypes';
import EqModule from '../src/EqModule';
import * as FileService from '../src/FileService';

const initialState = {
  enabled: true,
  activePreset: 2,
  presets: [
    {
      name: 'Car (Podcast)',
      eq: [0, 0, 0, 0, 0],
      bb: 0,
    },
    {
      name: 'Car (Music)',
      eq: [3, 0, -3, 1, 5],
      bb: 750,
    },
    {
      name: 'Headphones',
      eq: [3, 0, -3, 1, 5],
      bb: 1000,
    },
  ],
  bbIsSupported: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_PRESET:
      const {presetId} = action.payload;
      EqModule.setBb(state.presets[presetId].bb);
      state.presets[presetId].eq.forEach((value, index) => {
        EqModule.setBand(value, index);
      });
      const newState = {
        ...state,
        activePreset: presetId,
      };
      FileService.write(newState);
      return newState;
    case CHANGE_EQ_VALUE:
      const {eqValue, eqChannel} = action.payload;
      EqModule.setBand(eqValue, eqChannel);
      const presets = [...state.presets];
      presets[state.activePreset].eq[eqChannel] = eqValue;
      return {
        ...state,
        presets: presets,
      };
    case CHANGE_BB_VALUE:
      const {bbValue} = action.payload;
      EqModule.setBb(bbValue);
      const presets2 = [...state.presets];
      presets2[state.activePreset].bb = bbValue;
      return {
        ...state,
        presets: presets2,
      };
    case CHANGE_BB_STATUS:
      const {status} = action.payload;
      if (status) {
        EqModule.setBb(state.presets[state.activePreset].bb);
      }
      return {
        ...state,
        bbIsSupported: status,
      };
    case CHANGE_STATUS:
      return {
        ...state,
        enabled: action.payload.status,
      };
    case SET_STATE:
      return {
        ...state,
        activePreset: action.payload.state.activePreset,
        presets: action.payload.state.presets,
      };
    case SAVE_STATE:
      FileService.write(state);
      return state;
    default:
      return state;
  }
}
