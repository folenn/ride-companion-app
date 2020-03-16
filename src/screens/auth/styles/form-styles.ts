import { StyleSheet } from 'react-native';

export const formStyles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    width: '65%',
    padding: 20,
    backgroundColor: '#d7d7d7',
    borderRadius: 5
  },
  field: {
    width: '100%',
    height: 30,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    marginBottom: 20
  },
  fieldInvalid: {
    width: '100%',
    height: 30,
    borderBottomWidth: 2,
    marginBottom: 20,
    borderBottomColor: 'red'
  }
});
