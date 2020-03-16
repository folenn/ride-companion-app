import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
  DashboardScreen,
  FindRidesScreen,
  LoginScreen,
  PhoneCodeVerificationScreen,
  RidesScreen,
  SetupScreen,
} from '../screens';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

export const NotLoggedInNavigator = createStackNavigator({
  LoginScreen: LoginScreen,
  PhoneCodeVerificationScreen: PhoneCodeVerificationScreen,
}, {
  initialRouteName: 'LoginScreen',
  headerMode: 'none',
});
export const LoggedInNavigator = createStackNavigator({
  DashboardScreen: {
    screen: DashboardScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  FindRidesScreen: {
    screen: FindRidesScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  RidesScreen: {
    screen: RidesScreen,
    navigationOptions: {
      headerShown: false
    }
  }
}, {
  initialRouteName: 'DashboardScreen'
});
// export const LoggedInNavigator = createBottomTabNavigator({
//   DashboardScreen: {
//     screen: DashboardScreen
//   },
//   FindRidesScreen: {
//     screen: FindRidesScreen
//   },
//   RidesScreen: {
//     screen: RidesScreen
//   },
// }
// });
export const createRootNavigator = (loggedIn = false) => {
  return createAppContainer(createSwitchNavigator(
    {
      LoggedInScreens: {
        screen: LoggedInNavigator,
      },
      NotLoggedInScreens: {
        screen: NotLoggedInNavigator,
      },
      InitialSetupScreen: {
        screen: SetupScreen
      }
    }, {
      initialRouteName: loggedIn ? 'LoggedInScreens' : 'NotLoggedInScreens',
    },
  ));
};
