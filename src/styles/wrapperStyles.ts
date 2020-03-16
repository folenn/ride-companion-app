import {StyleSheet} from 'react-native';
import {mainBackgroundColor} from './colors';

export const wrapperStyles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: mainBackgroundColor
  },
  generalView: {
    flex: 1,
    paddingRight: 25,
    paddingLeft: 25
  }
});
