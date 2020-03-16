import React, { Component } from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import InitialUserSetupForm from './components/initialUserSetupForm';
import { RootState } from '../../redux/store/reducers';
import { getAvatarUrl, getError } from './store/reducers';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { updateUserData, uploadUserAvatar } from './store/actions';
import { connect } from 'react-redux';
import { UserDataModel } from './models/userData.model';
import { wrapperStyles } from '../../styles/wrapperStyles';
import { textStyles } from '../../styles/textStyles';

interface Props {
  avatarUrl: string;
  error: string;

  uploadUserAvatar(data: FormData): void;

  updateUserData(data: UserDataModel): void;
}

class SetupScreen extends Component<Props> {

  render() {
    return (
      <SafeAreaView style={ wrapperStyles.safeView }>
        <View style={ wrapperStyles.generalView }>
          <Text style={ textStyles.mainTitle }>Fill your details</Text>
	        <KeyboardAvoidingView style={ styles.formWrapper }>
		        <InitialUserSetupForm onFormSubmit={ this.handleFormSubmit }
	                                avatarUrl={ this.props.avatarUrl }
	                                error={ this.props.error }
	                                onAvatarUpload={ this.handleAvatarUpload }/>
	        </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    );
  }

  handleFormSubmit = (value) => {
    this.props.updateUserData(value);
  };

  handleAvatarUpload = (data: FormData) => {
    this.props.uploadUserAvatar(data);
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
    avatarUrl: getAvatarUrl(state),
    error: getError(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return bindActionCreators({uploadUserAvatar, updateUserData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupScreen);

