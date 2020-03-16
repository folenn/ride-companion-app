import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { inputStyles } from '../../styles/inputStyles';
import { AddressSuggestion } from './models/addressSuggestion.model';
import { RootState } from '../../redux/store/reducers';
import { FindRide, FoundRide } from './models/findRide.model';
import { getAddressSuggestions, getRides, getRidesStateLoading } from './store/reducers';
import { clearAddressSuggestionsAction, findRideAction, loadAddressSuggestionsAction } from './store/actions';
import MapView, { PROVIDER_GOOGLE, Region, Polyline } from 'react-native-maps';
import { googleMapsStyles } from './constants/mapsStyles.contant';
import { mainBackgroundColor, mainColor } from '../../styles/colors';
import { textStyles } from '../../styles/textStyles';
import { HeaderBackButton } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-navigation';
import navigationService from '../../navigation/navigationService';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { buttonStyles } from '../../styles/buttonsStyles';
import { Ride } from './models/ride.model';
import MapViewDirections from 'react-native-maps-directions';

const {width, height} = Dimensions.get('window');

interface Props {
  suggestions?: AddressSuggestion[];
  rides?: FoundRide[];
  loading?: boolean;

  findRideAction(ride: FindRide): void;

  loadAddressSuggestionsAction(term: string): void;

  clearAddressSuggestionsAction(): void;
}

interface State {
  region: Region | undefined;
  rideFrom: string;
  rideTo: string;
  defaultDate: string;
  date: string | null;
  passengersCount: number | string;
  isDatePickerVisible: boolean;
  isManagingFocus: boolean;
  activeInput: string;
  fadeAnim: any;

  selectedRide: Ride;
}


class FindRidesScreen extends Component<Props, State> {
  _focusTimeout: any;
  mapRef: MapView | undefined | null;
  inputFromRef;
  inputToRef;

  state = {
    region: null,
    rideFrom: '',
    rideTo: '',
    defaultDate: new Date().toISOString(),
    date: null,
    passengersCount: '1',
    isDatePickerVisible: false,
    isManagingFocus: false,
    fadeAnim: new Animated.Value(0),
    activeInput: null,
    selectedRide: null,
  };

  componentDidMount(): void {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
    }).start();
  }

  showFullscreenInputs = (input: string) => {
    this.props.clearAddressSuggestionsAction();
    this.setState({
      activeInput: input,
    });
    clearTimeout(this._focusTimeout);
    if (!this.state.isManagingFocus) {
      Animated.timing(this.state.fadeAnim, {
          toValue: 1,
          duration: 300,
        },
      ).start();
      this.setState({
        isManagingFocus: true,
      });
    }
  };

  hideFullscreenInputs = () => {
    this.setState({
      activeInput: null,
    });
    clearTimeout(this._focusTimeout);
    this._focusTimeout = setTimeout(() => {
      if (this.state.isManagingFocus) {
        this.setState({
          isManagingFocus: false,
          activeInput: null,
        });
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 300,
          },
        ).start();
        this.inputToRef.blur();
        this.inputFromRef.blur();
      }
    }, 100);
  };

  render() {
    return (
      <View style={ {flex: 1} }>
        <MapView ref={ (mapRef) => this.mapRef = mapRef } region={ this.state.region }
                 style={ StyleSheet.absoluteFillObject }
                 customMapStyle={ googleMapsStyles }
                 provider={ PROVIDER_GOOGLE }>
          { this.state.selectedRide && <Polyline onLayout={this.handleRoutingReady} coordinates={this.state.selectedRide.coordinates}/> }
        </MapView>
        <SafeAreaView forceInset={ {top: 'always'} }>
          <HeaderBackButton backTitleVisible={ true } title={ 'Назад' } onPress={ () => {
            navigationService.navigate('DashboardScreen');
          } }/>
        </SafeAreaView>
        <Animated.View style={ {
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: this.state.fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['30%', '100%'],
          }),
          minHeight: 220,
          backgroundColor: mainBackgroundColor,
          paddingBottom: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        } }>
          <SafeAreaView forceInset={ {top: 'always'} }>
            <DateTimePickerModal
              isVisible={ this.state.isDatePickerVisible }
              onConfirm={ this.handleDateSet }
              onCancel={ () => this.setState({isDatePickerVisible: false}) }
              mode={ 'datetime' }
            />
            { this.state.isManagingFocus &&
            <TouchableOpacity style={ {paddingLeft: 15} } onPress={ this.hideFullscreenInputs }>
              <Icon name={ 'arrow-left' } size={ 26 }/>
            </TouchableOpacity>
            }
            { !this.state.isManagingFocus &&
            <Text style={ {...textStyles.smallerTitle, marginBottom: 15, paddingLeft: 20, paddingRight: 20} }>Звідки
              почнемо?</Text> }
            <View style={ {
              position: 'relative',
              flexWrap: 'wrap',
              flexDirection: 'row',
              borderBottomWidth: this.state.isManagingFocus ? 1 : 0,
              borderBottomColor: 'gray',
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 20,
            } }>
              <View style={ {width: '10%', justifyContent: 'center'} }>
                <Icon name={ 'route' } color='#000' size={ 26 }/>
              </View>
              <View style={ {width: '90%'} }>
                <TextInput
                  style={ {...inputStyles.input, marginBottom: 15} }
                  value={ this.state.rideFrom }
                  onFocus={ () => this.showFullscreenInputs('rideFrom') }
                  ref={ ref => this.inputFromRef = ref }
                  onChangeText={ this.handleRideFromInput }
                  onSubmitEditing={ () => this.inputToRef.focus() }
                  placeholder={ 'Звідки' }/>
                <TextInput
                  style={ inputStyles.input }
                  value={ this.state.rideTo }
                  onFocus={ () => this.showFullscreenInputs('rideTo') }
                  ref={ ref => this.inputToRef = ref }
                  onChangeText={ this.handleRideToInput }
                  onSubmitEditing={ this.handleSubmit }
                  placeholder={ 'Куди' }
                />
              </View>
              { this.state.isManagingFocus &&
              <View style={ {width: '100%', marginTop: 15, flexDirection: 'row', flexWrap: 'nowrap'} }>
                <View style={ {width: '10%'} }>
                </View>
                <Text style={ {...textStyles.regularText, width: '45%'} }>
                  Дата
                </Text>
                <Text style={ {...textStyles.regularText, width: '45%'} }>
                  К-сть пасажирів
                </Text>
              </View> }
              { this.state.isManagingFocus && <View style={ {
                width: '100%', marginTop: 15, flexWrap: 'nowrap',
                flexDirection: 'row', alignItems: 'center',
              } }>
                <TouchableOpacity onPress={ () => this.setState({isDatePickerVisible: true}) } style={ {
                  width: '55%',
                  flexWrap: 'nowrap',
                  flexDirection: 'row',
                  alignItems: 'center',
                } }>
                  <View style={ {width: '18%'} }>
                    <Icon name={ 'calendar' } color='#000' size={ 26 }/>
                  </View>
                  <View style={ {width: '90%'} }>
                    <Text style={ textStyles.regularText }>
                      { !this.state.date && moment(this.state.defaultDate).format('DD MMM YYYY HH:MM') }
                      { this.state.date && moment(this.state.date).format('DD MMM YYYY HH:MM') }
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={ {width: '45%', flexDirection: 'row', flexWrap: 'nowrap'} }>
                  <TouchableOpacity disabled={ +this.state.passengersCount <= 1 }
                                    onPress={ this.handlePassengersDecrease }
                                    style={ {
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      opacity: +this.state.passengersCount <= 1 ? .4 : 1,
                                    } }>
                    <Icon name={ 'minus-circle' } color={ mainColor } size={ 33 }/>
                  </TouchableOpacity>
                  <TextInput value={ this.state.passengersCount } onChangeText={ this.handlePassengersInput }
                             keyboardType={ 'number-pad' } contextMenuHidden={ true } style={ {
                    ...inputStyles.input,
                    flex: 1,
                    marginLeft: 15,
                    marginRight: 15,
                    padding: 10,
                    height: 40,
                    textAlign: 'center',
                  } }/>
                  <TouchableOpacity onPress={ this.handlePassengersIncrease }
                                    disabled={ +this.state.passengersCount >= 20 }
                                    style={ {
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      opacity: +this.state.passengersCount >= 20 ? .4 : 1,
                                    } }>
                    <Icon name={ 'plus-circle' } color={ mainColor } size={ 33 }/>
                  </TouchableOpacity>
                </View>
              </View> }
              { this.state.isManagingFocus && <View style={ {width: '100%', marginTop: 15} }>
                <TouchableOpacity style={ buttonStyles.buttonDark } onPress={ this.handleSubmit }>
                  <Text style={ buttonStyles.buttonDarkText }>
                    Знайти поїздку
                  </Text>
                </TouchableOpacity>
              </View> }
            </View>
            {/*{ this.state.isManagingFocus &&*/ }
            {/*<View style={ {padding: 20, borderBottomWidth: 6, borderBottomColor: '#BEBEBE'} }>*/ }
            {/*  <TouchableOpacity style={ {flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center'} }>*/ }
            {/*    <MaterialIcon name={ 'my-location' } size={ 26 }/>*/ }
            {/*    <Text style={ {...textStyles.regularText, marginLeft: 10} }>Використати геопозицію</Text>*/ }
            {/*  </TouchableOpacity>*/ }
            {/*</View> }*/ }
            { this.state.isManagingFocus &&
            <ScrollView style={ {height: '100%'} } onScroll={ () => Keyboard.dismiss() }
                        keyboardShouldPersistTaps={ 'always' }>
              { this.props.suggestions && (!this.props.rides.length) &&
              this.props.suggestions.map((suggestion, i) => (
                <View key={ i }>
                  <TouchableOpacity style={ {
                    padding: 20,
                    minHeight: 40,
                    borderBottomWidth: 1,
                    borderBottomColor: '#BEBEBE',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                  } }
                                    onPress={ () => this.handleSuggestionClick(`${ suggestion.locale_names && suggestion.locale_names[0] }, ${ suggestion && suggestion.administrative[0] }, ${ suggestion.city && suggestion.city[0] }, ${ suggestion.country }`) }>
                    <MaterialIcon name={ 'location-on' } size={ 26 }/>
                    <Text style={ {...textStyles.regularText, marginLeft: 10} }>
                      { suggestion.locale_names && suggestion.locale_names[0] }, { suggestion && suggestion.administrative[0] }, { suggestion.city && suggestion.city[0] }, { suggestion.country }
                    </Text>
                  </TouchableOpacity>
                </View>
              )) }
              { this.props.rides &&
              this.props.rides.map((ride, i) => (
                <View key={ i }>
                  <TouchableOpacity style={ {
                    padding: 20,
                    minHeight: 40,
                    borderBottomWidth: 1,
                    borderBottomColor: '#BEBEBE',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                  } } onPress={ () => {this.setState({selectedRide: ride}); this.hideFullscreenInputs(); } }>
                    <MaterialIcon name={ 'location-on' } size={ 26 }/>
                    <Text style={ {...textStyles.regularText, marginLeft: 10} }>{ ride.rideFromName }</Text>
                    <Text style={ {...textStyles.regularText, marginLeft: 10} }>{ ride.rideToName }</Text>
                    <Text style={ {...textStyles.regularText, marginLeft: 10} }>{ ride.date }</Text>
                  </TouchableOpacity>
                </View>
              )) }
            </ScrollView>
            }
          </SafeAreaView>
        </Animated.View>
        {/*<View style={ styles.container }>*/
        }
        {/*  <TextInput*/
        }
        {/*    style={ {...inputStyles.textInput, zIndex: 2} }*/
        }
        {/*    value={ this.state.rideFrom }*/
        }
        {/*    onChangeText={ this.handleRideFromInput }*/
        }
        {/*    onSubmitEditing={ () => this.setState({isPopoverVisible: false}) }*/
        }
        {/*    placeholder={ 'From' }*/
        }
        {/*  />*/
        }
        {/*  <TextInput*/
        }
        {/*    style={ inputStyles.textInput }*/
        }
        {/*    value={ this.state.rideTo }*/
        }
        {/*    onChangeText={ this.handleRideToInput }*/
        }
        {/*    onSubmitEditing={ () => this.setState({isPopoverVisible: false}) }*/
        }
        {/*    placeholder={ 'To' }*/
        }
        {/*  />*/
        }
        {/*  <TextInput*/
        }
        {/*    style={ inputStyles.textInput }*/
        }
        {/*    value={ this.state.passengersCount }*/
        }
        {/*    onChangeText={ text => this.setState({passengersCount: text}) }*/
        }
        {/*    placeholder={ 'Passengers count' }*/
        }
        {/*  />*/
        }
        {/*  <TouchableWithoutFeedback*/
        }
        {/*    onPress={ () => this.setState({isDatePickerVisible: true}) }>*/
        }
        {/*    <Text style={ inputStyles.textInput }>*/
        }
        {/*      { this.state.date ? this.state.date : this.state.defaultDate }*/
        }
        {/*    </Text>*/
        }
        {/*  </TouchableWithoutFeedback>*/
        }

        {/*  <DateTimePickerModal*/
        }
        {/*    isVisible={ this.state.isDatePickerVisible }*/
        }
        {/*    onConfirm={ this.handleDateSet }*/
        }
        {/*    onCancel={ () => this.setState({isDatePickerVisible: false}) }*/
        }
        {/*    mode={ 'datetime' }*/
        }
        {/*  />*/
        }
        {/*  <Button title={ 'Submit' } onPress={ this.handleSubmit }/>*/
        }
        {/*  { this.state.isPopoverVisible && <Animated.View style={ {...styles.popover, opacity: this.state.fadeAnim} }>*/
        }
        {/*    { this.props.suggestions &&*/
        }
        {/*    this.props.suggestions.map((suggestion, i) => (*/
        }
        {/*      <View key={ i }>*/
        }
        {/*        <Text style={ {*/
        }
        {/*          marginBottom: 10,*/
        }
        {/*          borderBottomColor: 'red',*/
        }
        {/*          borderBottomWidth: 2,*/
        }
        {/*        } }>{ suggestion.locale_names && suggestion.locale_names[0] }, { suggestion && suggestion.administrative[0] }, { suggestion.city && suggestion.city[0] }, { suggestion.country }</Text>*/
        }
        {/*      </View>*/
        }
        {/*    )) }*/
        }
        {/*  </Animated.View> }*/
        }
        {/*  <Text>Rides</Text>*/
        }
        {/*  { this.props.rides &&*/
        }
        {/*  this.props.rides.map((rides, i) => (*/
        }
        {/*    <View key={ i }>*/
        }
        {/*      <Text>{ rides.rideFromName }</Text>*/
        }
        {/*      <Text>{ rides.rideToName }</Text>*/
        }
        {/*      <Text>{ rides.date }</Text>*/
        }
        {/*    </View>*/
        }
        {/*  )) }*/
        }
        {/*</View>*/
        }
      </View>
    );
  }

  handleRoutingReady = () => {

    // this.setState({region: this.state.selectedRide.coordinates[0]});
    this.mapRef.fitToCoordinates(this.state.selectedRide.coordinates, {
      edgePadding: {
        right: (width / 20),
        bottom: (height / 20),
        left: (width / 20),
        top: (height / 20),
      },
      animated: true,
    });
  };

  handlePassengersInput = (value) => {
    if (+value < 1) {
      this.setState({
        passengersCount: '1',
      });
    } else if (+value > 20) {
      this.setState({
        passengersCount: '20',
      });
    } else {
      this.setState({
        passengersCount: value,
      });
    }
  };

  handlePassengersDecrease = () => {
    if (+this.state.passengersCount > 1) {
      this.setState({
        passengersCount: (+this.state.passengersCount - 1).toString(),
      });
    }
  };

  handlePassengersIncrease = () => {
    if (+this.state.passengersCount < 20) {
      this.setState({
        passengersCount: (+this.state.passengersCount + 1).toString(),
      });
    }
  };

  handleRideFromInput = (text: string) => {
    text.length ? this.setState({rideFrom: text}) : this.setState({
      rideFrom: text,
    });
    this.props.loadAddressSuggestionsAction(text);
  };

  handleRideToInput = (text: string) => {
    text.length ? this.setState({rideTo: text}) : this.setState({
      rideTo: text,
    });
    this.props.loadAddressSuggestionsAction(text);
  };

  handleSuggestionClick = (suggestion: string) => {
    if (this.state.activeInput === 'rideFrom') {
      this.setState({rideFrom: suggestion});
    } else {
      this.setState({rideTo: suggestion});
    }
  };

  handleDateSet = (date: Date) => {
    this.setState({date: date.toISOString(), isDatePickerVisible: false});
  };

  handleSubmit = () => {
    Keyboard.dismiss();
    this.props.findRideAction({
      rideFrom: this.state.rideFrom,
      rideTo: this.state.rideTo,
      date: this.state.date,
      passengersCount: this.state.passengersCount.toString(),
    });
  };
}

function mapStateToProps(state: RootState) {
  return {
    loading: getRidesStateLoading(state),
    rides: getRides(state),
    suggestions: getAddressSuggestions(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {findRideAction, loadAddressSuggestionsAction, clearAddressSuggestionsAction},
    dispatch,
  );
}

const styles = StyleSheet.create({
  container: {
    margin: '10%',
    flex: 1,
    alignItems: 'center',
  },
  popover: {
    paddingTop: 100,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 1,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  // @ts-ignore
)(FindRidesScreen);
