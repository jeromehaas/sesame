import { Reducer } from 'react';
import { Action, DialogStatus } from '../types';

let originalState: DialogStatus = {
  users_create: 'inactive',
  users_update: 'inactive',
  groups_create: 'inactive',
  groups_update: 'inactice',
  issues_update: 'inactive',
  settings_update: 'inactive',
};

const dialogStatusReducer: Reducer<DialogStatus, Action> = (state = originalState, action: Action) => {
  switch (action.type) {
    case 'USERS_DIALOG_CREATE':
      originalState = {
        users_create: 'active',
        users_update: 'inactive',
        groups_create: 'inactive',
        groups_update: 'inactice',
        issues_update: 'inactive',
        settings_update: 'inactive',
      };
      return originalState;
    case 'USERS_DIALOG_UPDATE':
      originalState = {
        users_create: 'inactive',
        users_update: 'active',
        groups_create: 'inactive',
        groups_update: 'inactice',
        issues_update: 'inactive',
        settings_update: 'inactive',
      };
      return originalState;
    case 'GROUPS_DIALOG_CREATE':
      originalState = {
        users_create: 'inactive',
        users_update: 'inactive',
        groups_create: 'active',
        groups_update: 'inactice',
        issues_update: 'inactive',
        settings_update: 'inactive',
      };
      return originalState;
    case 'GROUPS_DIALOG_UPDATE':
      originalState = {
        users_create: 'inactive',
        users_update: 'inactive',
        groups_create: 'inactive',
        groups_update: 'active',
        issues_update: 'inactive',
        settings_update: 'inactive',
      };
      return originalState;
    case 'ISSUES_DIALOG_UPDATE':
      originalState = {
        users_create: 'inactive',
        users_update: 'inactive',
        groups_create: 'inactive',
        groups_update: 'inactice',
        issues_update: 'active',
        settings_update: 'inactive',
      };
      return originalState;
    case 'SETTINGS_DIALOG_UPDATE':
      originalState = {
        users_create: 'inactive',
        users_update: 'inactive',
        groups_create: 'inactive',
        groups_update: 'inactice',
        issues_update: 'inactive',
        settings_update: 'active',
      };
      return originalState;
    case 'RESET':
      originalState = {
        users_create: 'inactive',
        users_update: 'inactive',
        groups_create: 'inactive',
        groups_update: 'inactice',
        issues_update: 'inactive',
        settings_update: 'inactive',
      };
      return originalState;
    default:
      return originalState;
  }
};

export default dialogStatusReducer;
