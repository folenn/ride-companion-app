import {SharedActions, SharedActionsTypes} from '../actions';
import {RootState} from './index';

export interface SharedState {
  globalLoaderActive: boolean;
}

const initialState: SharedState = {
  globalLoaderActive: false
};

export default function(state = initialState, action: SharedActions) {
  switch (action.type) {
    case SharedActionsTypes.SHOW_LOADER:
      return {...state, globalLoaderActive: true};
    case SharedActionsTypes.HIDE_LOADER:
      return {...state, globalLoaderActive: false};
    default:
      return state;
  }
}

export function getGlobalLoaderStatus(state: RootState) {
  return state.shared.globalLoaderActive;
}
