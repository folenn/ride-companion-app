import React, {Component} from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {formStyles} from '../styles/form-styles';
import {Formik} from 'formik';
import * as yup from 'yup';
import { inputStyles } from '../../../styles/inputStyles';
import { buttonStyles } from '../../../styles/buttonsStyles';

const verificationCodeSchema = yup.object().shape({
  code: yup.string().required().min(6).max(6)
});

interface Props {
  onFormSubmit(data: PhoneCodeFormSubmitAction): void;
}

export interface PhoneCodeFormSubmitAction {
  code: string | number;
}

export class PhoneCodeVerificationForm extends Component<Props> {
  render() {
    return (
      <View style={{width: '100%'}}>
        <Formik
          onSubmit={this.handleSubmit}
          validationSchema={verificationCodeSchema}
          validateOnBlur={ true }
          initialValues={{
            code: ''
          }}>
          {({handleChange, handleSubmit, values, errors, touched, setFieldTouched, isSubmitting, isValid}) => (
            <View>
              <TextInput
                placeholder={'Verification code'}
                style={(errors.code && touched.code) ? inputStyles.input : inputStyles.input}
                returnKeyType = { "send" }
                keyboardType='number-pad'
                onChangeText={handleChange('code')}
                onBlur={() => setFieldTouched('code')}
                onSubmitEditing={handleSubmit}/>

              {(errors.code && touched.code) && <Text>{errors.code}</Text>}

              <TouchableOpacity style={ {...buttonStyles.buttonDark, marginTop: 32, marginBottom: 20} }
                                onPress={handleSubmit}>
                <Text style={buttonStyles.buttonDarkText}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    )
  }

  handleSubmit = (value: PhoneCodeFormSubmitAction) => {
    this.props.onFormSubmit(value);
  }
}

export default PhoneCodeVerificationForm;
