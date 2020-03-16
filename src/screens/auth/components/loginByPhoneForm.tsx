import React, { Component } from 'react';
import * as yup from 'yup';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import { inputStyles } from '../../../styles/inputStyles';
import { buttonStyles } from '../../../styles/buttonsStyles';

const loginByPhoneSchema = yup.object().shape({
  phone: yup.string().required().matches(/^\+?3?8?(0\d{9})$/)
});

interface Props {
  onFormSubmit: Function
}

interface State {
  phone: string;
}

class LoginByPhoneForm extends Component<Props, State> {

  state = {
    phone: '+380'
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={{width: '100%'}}>
        <Formik
          onSubmit={this.onSubmit}
          validationSchema={loginByPhoneSchema}
          validateOnBlur={true}
          initialValues={{
            phone: '+380'
          }}>
          {({handleChange, handleSubmit, values, errors, touched, setFieldValue, setFieldTouched, isSubmitting, isValid}) => (
            <View>
              <TextInput value={this.state.phone}
                     placeholder={'+380'}
                     keyboardType={'phone-pad'}
                     contextMenuHidden={true}
                     onChangeText={text => this.handlePhoneChange(text, setFieldValue)}
                     onBlur={() => setFieldTouched('phone')}
                     onSubmitEditing={handleSubmit}
                     style={(errors.phone && touched.phone) ? inputStyles.input : inputStyles.input}/>
              {(errors.phone && touched.phone) && <Text>{errors.phone}</Text>}
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
    );
  }

  handlePhoneChange = (value: any, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
    if (value.length <= 4) {
      this.setState({phone: '+380'})
    } else {
      this.setState({phone: value})
    }
    setFieldValue('phone', value);
  };

  onSubmit = (value: any) => {
    this.props.onFormSubmit(value);
  };
}

export default LoginByPhoneForm;
