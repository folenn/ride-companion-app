import React, { Component } from 'react';
import { getAuthStatusState, registerByEmail, registerByPhone, requestPhoneVerification, StatusState } from './store';
import { RootState } from '../../redux/store/reducers';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Authenticate } from './models';
import { Button, ImageBackground, KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
import RegisterByEmailFormComponent from './components/registerByEmailForm';
// import { pushLoginScreen } from '../../navigation/navigation'
import LoginByPhoneForm from './components/loginByPhoneForm';

export interface Props {
	status: StatusState;

	requestPhoneVerification(data: Authenticate): void;

	registerByPhone(data: Authenticate): void;

	registerByEmail(data: Authenticate): void;
}

export interface State {
	isRegisterByPhoneActive: boolean;
}

class RegisterScreen extends Component<Props, State> {
	state = {
		isRegisterByPhoneActive: false
	};

	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<ImageBackground source={require('./images/bg.jpg')} style={{width: '100%', height: '100%'}}>
				<KeyboardAvoidingView style={styles.formWrapper}>
					{!this.state.isRegisterByPhoneActive &&
          <RegisterByEmailFormComponent onFormSubmit={this.handleEmailFormSubmit}/>}
					{!this.state.isRegisterByPhoneActive &&
          <Button onPress={this.handleToggleRegisterMethod} title={'Register by Phone'}/>}
					{this.state.isRegisterByPhoneActive && <LoginByPhoneForm onFormSubmit={this.handlePhoneFormSubmit}/>}
					{this.state.isRegisterByPhoneActive &&
          <Button onPress={this.handleToggleRegisterMethod} title={'Register by Email'}/>}
					<Button title={'Login'} onPress={this.handleNavigateToLoginScreen}/>
					{this.props.status.error && <Text>{this.props.status.error}</Text>}
				</KeyboardAvoidingView>
			</ImageBackground>
		);
	}

	handleToggleRegisterMethod = () => {
		this.setState({isRegisterByPhoneActive: !this.state.isRegisterByPhoneActive});
	};

	handleEmailFormSubmit = (value: Authenticate) => {
		this.props.registerByEmail(value);
	};

	handlePhoneFormSubmit = (value: Authenticate) => {
		this.props.requestPhoneVerification(value);
	};

	handleNavigateToLoginScreen = () => {
		// pushLoginScreen();
	};
}

const styles = StyleSheet.create({
	formWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	error: {
		color: 'red'
	}
});

function mapStateToProps(state: RootState) {
	return {
		status: getAuthStatusState(state)
	};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
	return bindActionCreators({registerByPhone, requestPhoneVerification, registerByEmail}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
