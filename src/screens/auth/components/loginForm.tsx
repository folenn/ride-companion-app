import React, { Component } from 'react';

import { Button, Text, View, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { formStyles } from '../styles/form-styles';

const loginSchema = yup.object().shape({
	email: yup.string().required().email(),
	password: yup.string().required().min(3)
});

interface Props {
	onFormSubmit(value: any);
}

class LoginFormComponent extends Component<Props> {
	passwordInputRef: any;

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
						password: ''
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
								returnKeyType = { "send" }
								onChangeText={handleChange('password')}
								onBlur={() => setFieldTouched('password')}
								onSubmitEditing={handleSubmit}
								ref={(input) => { this.passwordInputRef = input; }}/>

							{(errors.password && touched.password) && <Text>{errors.password}</Text>}

							<Button onPress={handleSubmit}
							        title={'Submit'}/>
						</View>
					)}
				</Formik>
			</View>
		)
	};

	onSubmit = (value: any) => {
		this.props.onFormSubmit(value);
	}
}

export default LoginFormComponent;
