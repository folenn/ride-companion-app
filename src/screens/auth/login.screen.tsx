import React, { Component } from 'react';

import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { login, loginSuccess, requestPhoneVerification, socialLogin } from './store';
import { Authenticate, AuthenticateSocial } from './models';
import { RootState } from '../../redux/store/reducers';
import { getAuthStatusState, StatusState } from './store/reducers';
import LoginByPhoneForm from './components/loginByPhoneForm';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { wrapperStyles } from '../../styles/wrapperStyles';
import { textStyles } from '../../styles/textStyles';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { buttonStyles } from '../../styles/buttonsStyles';
import FacebookIcon from '../../images/icons/facebook-icon.svg';
import GoogleIcon from '../../images/icons/google-icon.svg';


GoogleSignin.configure({
	offlineAccess: true,
	webClientId: null,
});

export interface Props {
	login(data: Authenticate): void;

	socialLogin(data: AuthenticateSocial): void;

	requestPhoneVerification(data: Authenticate): void;

	status: StatusState;
}

export interface State {
	isLoginByEmailActive: boolean;
	isSigninInProgress: boolean;
	userInfo: any;
}

class LoginScreen extends Component<Props, State> {

	state = {
		isLoginByEmailActive: false,
		isSigninInProgress: false,
		userInfo: null,
	};

	constructor(props: Props) {
		super(props);
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
		console.log(prevProps, snapshot, this.props);
	}

	render() {
		return (
			<SafeAreaView style={ wrapperStyles.safeView }>
				<View style={ wrapperStyles.generalView }>
					<Text style={ textStyles.mainTitle }>Login</Text>
					<KeyboardAvoidingView style={ styles.formWrapper }>
						{ !this.state.isLoginByEmailActive && <LoginByPhoneForm onFormSubmit={ this.handlePhoneSubmit }/> }
						{ this.props.status.error && <Text>{ this.props.status.error }</Text> }
						<View style={ {flexDirection: 'row', justifyContent: 'space-between'} }>
							<TouchableOpacity onPress={ this.handleFacebookLogin } activeOpacity={ .6 }
							                  style={ {...buttonStyles.facebookLoginButton, marginRight: 20} }>
								<FacebookIcon/>
							</TouchableOpacity>
							<TouchableOpacity onPress={ this.handleGoogleLogin } activeOpacity={ .6 }
							                  style={ buttonStyles.googleLoginButton }>
								<GoogleIcon/>
							</TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				</View>
			</SafeAreaView>
		);
	};

	handlePhoneSubmit = (loginByPhone: Authenticate) => {
		this.props.requestPhoneVerification(loginByPhone);
	};

	handleFacebookLogin = async () => {
		try {
			const result = await LoginManager.logInWithPermissions(['public_profile']);
			const token = await AccessToken.getCurrentAccessToken();
			this.props.socialLogin({
				accessToken: token.accessToken,
				tokenSource: 'facebook',
			});
		} catch (e) {
			console.log(e);
		}
	};

	handleGoogleLogin = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo: any = await GoogleSignin.signIn();
			this.setState({userInfo});
			this.props.socialLogin({
				accessToken: userInfo.idToken,
				tokenSource: 'google',
			});
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (f.e. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
			}
		}
	};
}

const styles = StyleSheet.create({
	formWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	error: {
		color: 'red',
	},
});

function mapStateToProps(state: RootState) {
	return {
		status: getAuthStatusState(state),
	};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
	return bindActionCreators({login, socialLogin, loginSuccess, requestPhoneVerification}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
