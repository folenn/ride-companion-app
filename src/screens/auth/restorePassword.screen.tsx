import React, { Component } from 'react';
import { getAuthStatusState, requestPasswordReset, StatusState } from './store';
import { RootState } from '../../redux/store/reducers';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PasswordReset } from './models';
import { Button, ImageBackground, KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
// import { pushLoginScreen } from '../../navigation/navigation'
import RestorePasswordFormComponent from './components/restorePasswordForm';

export interface Props {
	status: StatusState;

	requestPasswordReset(data: PasswordReset): void;
}

class RestorePasswordScreen extends Component<Props> {

	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<ImageBackground source={require('./images/bg.jpg')} style={{width: '100%', height: '100%'}}>
				<KeyboardAvoidingView style={styles.formWrapper}>
					<RestorePasswordFormComponent onFormSubmit={this.handleRestorePasswordSubmit}/>
					<Button onPress={this.handleNavigateToLoginScreen} title={'Back to Login'}/>
					{this.props.status.error && <Text>{this.props.status.error}</Text>}
				</KeyboardAvoidingView>
			</ImageBackground>
		);
	}

	handleRestorePasswordSubmit = (value: PasswordReset) => {
		this.props.requestPasswordReset(value);
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
	return bindActionCreators({requestPasswordReset}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RestorePasswordScreen);
