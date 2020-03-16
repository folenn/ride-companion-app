import React, { Component } from 'react';
import { Button, View, Text, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { bindActionCreators } from 'redux';
import { logout, LogoutAction } from '../auth/store/actions';
import { connect } from 'react-redux';
import { wrapperStyles } from '../../styles/wrapperStyles';
import { getUsername } from '../user/store/reducers';
import { textStyles } from '../../styles/textStyles';
import navigationService from '../../navigation/navigationService';
import TabBar from './components/bottomNav';
import Icon from 'react-native-vector-icons/FontAwesome';
import { mainBackgroundColor } from '../../styles/colors';

export interface Props {
  name: string | null;

  logout(): LogoutAction;
}

class DashboardScreen extends Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={ wrapperStyles.safeView }>
        <View style={ wrapperStyles.generalView }>
          <Text style={ textStyles.mainTitle }>Hello { this.props.name }</Text>
          <Button onPress={ this.handleClick } title={ 'Log Out' }/>
          <Button onPress={ () => navigationService.navigate('FindRidesScreen') } title={ 'huj' }/>
        </View>
        <TabBar style={{ marginBottom: 0 }} bgNavBar='#FFCA27' bgNavBarSelector="#FFCA27" stroke="white">
          <TabBar.Item
            onPress={() => navigationService.navigate('FindRidesScreen')}
            selectedIcon={<Icon name={ 'search' } color='#fff' size={24}/>}
            icon={<Icon name={ 'search' } size={20}/>}
            title="Tab1">
            <View>
            </View>
          </TabBar.Item>
          <TabBar.Item
            selectedIcon={<Icon name={ 'home' } color='#fff' size={24}/>}
            icon={<Icon name={ 'home' } size={20}/>}
            title="Tab2">
            <View>
              {/*Page Content*/ }
            </View>
          </TabBar.Item>
          <TabBar.Item
            onPress={() => navigationService.navigate('RidesScreen')}
            selectedIcon={<Icon name={ 'plus-circle' } color='#fff' size={24}/>}
            icon={<Icon name={ 'plus-circle' } size={20}/>}
            title="Tab3">
            <View>
              {/*Page Content*/ }
            </View>
          </TabBar.Item>
        </TabBar>
      </SafeAreaView>
    );
  };

  handleClick = () => {
    this.props.logout();
  };
}

function mapStateToProps(state: any) {
  return {
    name: getUsername(state),
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({logout}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
