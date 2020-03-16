import { GlobalError } from '../../../../shared/models';
import { UserActions, UserActionsTypes } from '../actions';
import { RootState } from '../../../../redux/store/reducers';

export interface UserState {
  email: string | null;
  firstLogin: boolean;
  loading: boolean;
  phone: {
    number: string;
    verified: boolean;
  }
  details: {
    imageUrl: string | null;
    name: string | null;
  }
  error: GlobalError | null;
}

const initialState: UserState = {
  email: null,
  details: {
    imageUrl: null,
    name: null
  },
  phone: {
    number: null,
    verified: false,
  },
  firstLogin: false,
  loading: false,
  error: null,
};

export default function(state = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionsTypes.GET_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case UserActionsTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        ...action.payload,
        error: null,
      };
    }
    case UserActionsTypes.GET_USER_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case UserActionsTypes.UPLOAD_AVATAR: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case UserActionsTypes.UPLOAD_AVATAR_SUCCESS: {
      return {
        ...state,
        details: {
          imageUrl: action.payload.avatarUrl,
        },
        loading: false,
        error: null,
      };
    }
    case UserActionsTypes.UPLOAD_AVATAR_FAILED: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }
    default:
      return state;
  }
}

export function getUsername(state: RootState): string {
  return state.user.details.name;
}

export function getIsFirstLogin(state: RootState): boolean {
  return state.user.firstLogin;
}

export function getAvatarUrl(state: RootState): string {
  return state.user.details.imageUrl;
}

export function getUserPhoneNumber(state: RootState): string {
  return state.user.phone.number;
}

export function getError(state: RootState): string | any {
  return state.user.error;
}
