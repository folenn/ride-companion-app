import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
	buttonDark: {
		width: '100%',
		justifyContent: 'center',
		textAlign: 'center',
		height: 60,
		backgroundColor: '#FFCA27',
		borderRadius: 10,
		paddingLeft: 20,
		paddingRight: 20
	},
	buttonDarkText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 16,
		width: '100%',
		textAlign: 'center'
	},
	facebookLoginButton: {
		width: 85,
		height: 60,
		borderRadius: 10,
		backgroundColor: '#3B5998',
		justifyContent: 'center',
		alignItems: 'center',
	},
	facebookLoginButtonImage: {
		width: 10,
		height: 22,
	},
	googleLoginButton: {
		width: 85,
		height: 60,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOpacity: .1,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowRadius: 5,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	googleLoginButtonImage: {
		width: 18,
		height: 18,
	}
});
