import React, { Component } from 'react';
import { verifyPhoneCode } from './store/actions';
import { KeyboardAvoidingView, SafeAreaView, View } from 'react-native';
import { formStyles } from './styles/form-styles';
import PhoneCodeVerificationForm, { PhoneCodeFormSubmitAction } from './components/phoneCodeVerificationForm';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { wrapperStyles } from '../../styles/wrapperStyles';

interface Props {
  verifyPhoneCode(payload: { code: string | number }): {}
}

class PhoneCodeVerificationScreen extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={ wrapperStyles.safeView }>
        <View style={ wrapperStyles.generalView }>
          <KeyboardAvoidingView style={ formStyles.formWrapper } behavior={ 'padding' }>
            <PhoneCodeVerificationForm onFormSubmit={ this.handleCodeVerification }/>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    );
  }

  handleCodeVerification = (data: PhoneCodeFormSubmitAction) => {
    this.props.verifyPhoneCode(data);
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return bindActionCreators({verifyPhoneCode}, dispatch);
}

export default connect(null, mapDispatchToProps)(PhoneCodeVerificationScreen);
