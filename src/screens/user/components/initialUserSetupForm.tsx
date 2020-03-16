import React, { Component } from 'react';

import { Alert, Button, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import ImagePicker from 'react-native-image-picker';
import { inputStyles } from '../../../styles/inputStyles';
import { buttonStyles } from '../../../styles/buttonsStyles';

const setupSchema = yup.object().shape({
  name: yup.string().min(3).required(),
});

interface Props {
  avatarUrl?: string;
  error?: string;

  onFormSubmit(value: any);

  onAvatarUpload(data: FormData);
}

const options = {
  title: 'Select avatar',
  storageOptions: {
    skipBackup: true
  }
};

class InitialUserSetupForm extends Component<Props> {

  constructor(props: any) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.error) {
      this.showAvatarUploadErrorAlert(this.props.error);
    }
  }

  render() {
    return (
      <View style={ {width: '100%'} }>
        <TouchableOpacity onPress={ this.handleAvatarClick } style={{alignItems: 'center'}}>
          <Image
            source={ this.props.avatarUrl ? {uri: this.props.avatarUrl} : require('../../../images/user-placeholder.png') }
            style={ styles.userImage }/>
          <Button onPress={ this.handleAvatarClick } title={ 'Upload avatar' }/>
        </TouchableOpacity>
        <Formik
          onSubmit={ this.onSubmit }
          validationSchema={ setupSchema }
          validateOnBlur={ true }
          initialValues={ {
            name: '',
          } }>
          { ({handleChange, handleSubmit, isValid, errors, touched, setFieldTouched, isSubmitting}) => (
            <View>
              <TextInput autoCapitalize={ 'none' }
                         placeholder={ 'Name' }
                         style={ (errors.name && touched.name) ? inputStyles.input : inputStyles.input }
                         returnKeyType={ 'send' }
                         keyboardType='default'
                         onChangeText={ handleChange('name') }
                         onBlur={ () => setFieldTouched('name') }
                         onSubmitEditing={ handleSubmit }/>

              { (errors.name && touched.name) && <Text>{ errors.name }</Text> }

              <TouchableOpacity style={ {...buttonStyles.buttonDark, marginTop: 32, marginBottom: 20} }
                                onPress={ () => {isValid && handleSubmit()} }>
                <Text style={ buttonStyles.buttonDarkText }>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          ) }
        </Formik>
        { this.props.error && <Text>{ this.props.error }</Text> }
      </View>
    );
  };

  onSubmit = (value: any) => {
    this.props.onFormSubmit(value);
  };

  handleAvatarClick = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.showAvatarUploadErrorAlert(response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const formData = new FormData();
        formData.append('avatar', {
          name: response.fileName,
          type: response.type,
          data: response.data,
          uri:
            Platform.OS === 'android' ? response.uri : response.uri.replace('file://', ''),
        });
        this.props.onAvatarUpload(formData);
      }
    });
  };

  showAvatarUploadErrorAlert = (error: string) => {
    Alert.alert('Error', error);
  };
}

const styles = StyleSheet.create({
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
});

export default InitialUserSetupForm;
