import { Action } from 'redux';
import { UserDataModel } from '../../models/userData.model';

export enum UserActionsTypes {
	GET_USER = '[User] Get User Info',
	GET_USER_SUCCESS = '[User] Get User Info Success',
	GET_USER_FAILED = '[User] Get User Info Failed',

	UPLOAD_AVATAR = '[User] Upload Avatar',
	UPLOAD_AVATAR_SUCCESS = '[User] Upload Avatar Success',
	UPLOAD_AVATAR_FAILED = '[User] Upload Avatar Failed',

	UPDATE_USER_DATA = '[User] Update UserData',
	UPDATE_USER_DATA_SUCCESS = '[User] Update UserData Success',
	UPDATE_USER_DATA_FAILED = '[User] Update UserData FAILED',
}

export interface GetUserInfoAction extends Action {
	type: UserActionsTypes.GET_USER,
	payload: any;
}

export const getUserInfo = (payload: any): GetUserInfoAction => ({
	type: UserActionsTypes.GET_USER,
	payload
});

export interface GetUserInfoSuccessAction extends Action {
	type: UserActionsTypes.GET_USER_SUCCESS,
	payload: any;
}

export const getUserInfoSuccess = (payload: any): GetUserInfoSuccessAction => {
	return {
		type: UserActionsTypes.GET_USER_SUCCESS,
		payload
	};
};

export interface GetUserInfoFailedAction extends Action {
	type: UserActionsTypes.GET_USER_FAILED,
	payload: { error: string };
}

export const getUserFailed = (error: string): GetUserInfoFailedAction => ({
	type: UserActionsTypes.GET_USER_FAILED,
	payload: {error}
});

export interface UploadUserAvatar extends Action {
	type: UserActionsTypes.UPLOAD_AVATAR;
	payload: { data: FormData; }
}

export const uploadUserAvatar = (data: FormData): UploadUserAvatar => ({
	type: UserActionsTypes.UPLOAD_AVATAR,
	payload: {data}
});

export interface UploadUserAvatarSuccess extends Action {
	type: UserActionsTypes.UPLOAD_AVATAR_SUCCESS;
	payload: { avatarUrl: string; }
}

export const uploadUserAvatarSuccess = (avatarUrl: string): UploadUserAvatarSuccess => ({
	type: UserActionsTypes.UPLOAD_AVATAR_SUCCESS,
	payload: {avatarUrl}
});

export interface UploadUserAvatarFailed extends Action {
	type: UserActionsTypes.UPLOAD_AVATAR_FAILED;
	payload: { error: string; }
}

export const uploadUserAvatarFailed = (error: string): UploadUserAvatarFailed => ({
	type: UserActionsTypes.UPLOAD_AVATAR_FAILED,
	payload: {error}
});

export interface UpdateUserData extends Action {
	type: UserActionsTypes.UPDATE_USER_DATA;
	payload: { data: UserDataModel }
}

export const updateUserData = (data: UserDataModel) => ({
	type: UserActionsTypes.UPDATE_USER_DATA,
	payload: {data}
});

export interface UpdateUserDataSuccess extends Action {
	type: UserActionsTypes.UPDATE_USER_DATA_SUCCESS;
}

export const updateUserDataSuccess = () => ({
	type: UserActionsTypes.UPDATE_USER_DATA_SUCCESS
});

export interface UpdateUserDataFailed extends Action {
	type: UserActionsTypes.UPDATE_USER_DATA_FAILED;
	payload: { error: string };
}

export const updateUserDataFailed = (error: string) => ({
	type: UserActionsTypes.UPDATE_USER_DATA_SUCCESS,
	payload: {error}
});


export type UserActions =
	GetUserInfoAction
	| GetUserInfoSuccessAction
	| GetUserInfoFailedAction
	| UploadUserAvatar
	| UploadUserAvatarSuccess
	| UploadUserAvatarFailed
	| UpdateUserData
	| UpdateUserDataSuccess
	| UpdateUserDataFailed;
