import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
	input: {
		width: '100%',
		height: 60,
		paddingLeft: 20,
		paddingRight: 20,
		fontFamily: 'Montserrat-Regular',
		fontSize: 16,
		backgroundColor: '#ffffff',
		borderRadius: 6,
		shadowColor: '#000',
		shadowOpacity: .1,
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowRadius: 10
	},
	textInput: {
		width: '100%',
		height: 50,
		color: '#000',
		borderWidth: 1,
		borderColor: '#000',
		marginBottom: 10,
		borderRadius: 5,
		padding: 10
	}
});
