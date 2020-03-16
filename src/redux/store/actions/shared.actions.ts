import { Action } from 'redux';

export enum SharedActionsTypes {
  SHOW_LOADER = '[Shared] Show Global Loader',
  HIDE_LOADER = '[Shared] Hide Global Loader'
}

export interface ShowLoaderAction extends Action {
  type: SharedActionsTypes.SHOW_LOADER;
}

export function showLoaderAction(): ShowLoaderAction {
  return {
    type: SharedActionsTypes.SHOW_LOADER,
  };
}

export interface HideLoaderAction extends Action {
  type: SharedActionsTypes.HIDE_LOADER;
}

export function hideLoaderAction(): HideLoaderAction {
  return {
    type: SharedActionsTypes.HIDE_LOADER,
  };
}

export type SharedActions = ShowLoaderAction
  | HideLoaderAction;

