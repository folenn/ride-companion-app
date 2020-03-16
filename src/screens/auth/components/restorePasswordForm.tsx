import React, { Component } from 'react';

import { Button, Text, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { formStyles } from '../styles/form-styles';

const loginSchema = yup.object().shape({
	email: yup.string().required().email()
});

interface Props {
	onFormSubmit(value: any);
}

class RestorePasswordFormComponent extends Component<Props> {

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
						email: ''
					}}>
					{({handleChange, handleSubmit, errors, touched, setFieldTouched}) => (
						<View>
							<TextInput
								autoCapitalize={'none'}
								ref='email'
								placeholder={'Email'}
								style={(errors.email && touched.email) ? formStyles.fieldInvalid : formStyles.field}
								returnKeyType = { "send" }
								keyboardType='email-address'
								onChangeText={handleChange('email')}
								onBlur={() => setFieldTouched('email')}
								onSubmitEditing={handleSubmit}/>

							{(errors.email && touched.email) && <Text>{errors.email}</Text>}

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

export default RestorePasswordFormComponent;
