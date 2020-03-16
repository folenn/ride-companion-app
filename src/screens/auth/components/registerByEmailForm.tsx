import React, { Component } from 'react';

import { Button, Text, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { formStyles } from '../styles/form-styles';

const loginSchema = yup.object().shape({
	email: yup.string().required().email(),
	password: yup.string().required().min(3),
	confirmPassword: yup.string().required().min(3).test('password-match', 'Password mismatch',
		function(value) { return this.parent.password === value })
});

interface Props {
	onFormSubmit(value: any);
}

class RegisterByEmailFormComponent extends Component<Props> {
	passwordInputRef: any;
	confirmPasswordInputRef: any;

	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<View style={formStyles.form}>
				<Formik
					onSubmit={this.onSubmit}
					validationSchema={loginSchema}
					validateOnBlur={ true }
					initialValues={{
						email: '',
						password: '',
						confirmPassword: ''
					}}>
					{({handleChange, handleSubmit, values, errors, touched, setFieldTouched, isSubmitting}) => (
						<View>
							<TextInput
								autoCapitalize={'none'}
								ref='email'
								placeholder={'Email'}
								style={(errors.email && touched.email) ? formStyles.fieldInvalid : formStyles.field}
								returnKeyType = { "next" }
								keyboardType='email-address'
								onChangeText={handleChange('email')}
								onBlur={() => setFieldTouched('email')}
								onSubmitEditing={() => { this.passwordInputRef.focus(); }}/>

							{(errors.email && touched.email) && <Text>{errors.email}</Text>}

							<TextInput
								placeholder={'Password'}
								style={(errors.password && touched.password) ? formStyles.fieldInvalid : formStyles.field}
								secureTextEntry={ true }
								returnKeyType = { "next" }
								onChangeText={handleChange('password')}
								onBlur={() => setFieldTouched('password')}
								onSubmitEditing={() => { this.confirmPasswordInputRef.focus(); }}
								ref={(input) => { this.passwordInputRef = input; }}/>

							{(errors.password && touched.password) && <Text>{errors.password}</Text>}

							<TextInput
								placeholder={'Confirm password'}
								style={(errors.confirmPassword && touched.confirmPassword) ? formStyles.fieldInvalid : formStyles.field}
								secureTextEntry={ true }
								returnKeyType = { "send" }
								onChangeText={handleChange('confirmPassword')}
								onBlur={() => setFieldTouched('confirmPassword')}
								onSubmitEditing={handleSubmit}
								ref={(input) => { this.confirmPasswordInputRef = input; }}/>

							{(errors.confirmPassword && touched.confirmPassword) && <Text>{errors.confirmPassword}</Text>}

							<Button onPress={handleSubmit}
							        title={'Submit'}/>
						</View>
					)}
				</Formik>
			</View>
		)
	};

	onSubmit = (value: any) => {
		delete value.confirmPassword;
		this.props.onFormSubmit(value);
	}
}

export default RegisterByEmailFormComponent;
