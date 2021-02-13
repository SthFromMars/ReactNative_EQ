import {
  CHANGE_PRESET,
  CHANGE_EQ_VALUE,
  CHANGE_BB_STATUS,
  CHANGE_BB_VALUE,
  CHANGE_STATUS,
  SET_STATE,
  SAVE_STATE,
} from './actionTypes';

export const changePreset = (presetId) => ({
  type: CHANGE_PRESET,
  payload: {presetId},
});

export const changeEqValue = (eqValue, eqChannel) => ({
  type: CHANGE_EQ_VALUE,
  payload: {eqValue, eqChannel},
});

export const changeBbValue = (bbValue) => ({
  type: CHANGE_BB_VALUE,
  payload: {bbValue},
});

export const enableBb = (status) => ({
  type: CHANGE_BB_STATUS,
  payload: {status},
});

export const changeStatus = (status) => ({
  type: CHANGE_STATUS,
  payload: {status},
});

export const setState = (state) => ({
  type: SET_STATE,
  payload: {state},
});

export const saveState = () => ({
  type: SAVE_STATE,
});
