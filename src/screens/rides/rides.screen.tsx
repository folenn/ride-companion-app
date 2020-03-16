import React, { Component } from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import MapViewDirections, { MapViewDirectionsWaypoints } from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { createRide } from './store/actions';
import { Ride } from './models/ride.model';

const API_KEY = null;
const GEOCODE_API_KEY = null;
const {width, height} = Dimensions.get('window');

export interface Props {
	createRide(ride: Ride): void;
}

export interface State {
	mapRef: any;
	initialRegion: Region | undefined;
	region: Region | undefined;
	waypoints: MapViewDirectionsWaypoints[];
	waypointsToSet: MapViewDirectionsWaypoints[];
	date: Date | null | string;
	defaultDate: Date | null | string;
	isDatePickerVisible: boolean;
	coordinates: any[];
	passengersCount: number | string;
	from: string;
	to: string;
	route: {
		from: string;
		to: string;
	}
}

// @ts-ignore
Geocoder.init(GEOCODE_API_KEY, {lang: 'en'});

class RidesScreen extends Component<Props, State> {
	mapRef: MapView | undefined | null;
	state = {
		mapRef: null,
		initialRegion: {
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		},
		region: undefined,
		waypoints: [],
		waypointsToSet: [],
		date: null,
		defaultDate: new Date().toISOString(),
		isDatePickerVisible: false,
		coordinates: [],
		passengersCount: '1',
		from: '',
		to: '',
		route: {
			from: '',
			to: '',
		},
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		Geolocation.getCurrentPosition(
			(position) => {
				this.mapRef.animateToRegion({
					longitude: position.coords.longitude,
					latitude: position.coords.latitude,
					latitudeDelta: 0.0043,
					longitudeDelta: 0.0034,
				});
			},
			(error) => {
				// See error code charts below.
				console.log(error.code, error.message);
			},
			{enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
		);
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
	}

	render() {
		return (
			<View style={ styles.container }>
				<Text>Rides</Text>
				<MapView ref={ (mapRef) => this.mapRef = mapRef } style={ StyleSheet.absoluteFillObject }
				         provider={ PROVIDER_GOOGLE }>
					{/*{this.state.waypoints.forEach(waypoint => {*/ }
					{/*  return waypoint && <MapView.Marker coordinate={waypoint}/>;*/ }
					{/*})}*/ }
					<MapViewDirections
						region={ 'UA' }
						onReady={ this.handleRoutingReady }
						origin={ this.state.route.from }
						waypoints={ this.state.waypointsToSet }
						destination={ this.state.route.to }
						apikey={ API_KEY }
					/>
				</MapView>
				<View style={ styles.overlay }>
					<TextInput style={ styles.inputs }
					           placeholder={ 'from' }
					           value={ this.state.from }
					           onChangeText={ (text) => this.setState({from: text}) }
					/>
					{ this.state.waypoints.map((waypoint, i) =>
						(<TextInput key={ i } style={ styles.inputs } onChangeText={ text => this.handleSetWaypoint(text, i) }/>))
					}
					<TextInput style={ styles.inputs }
					           placeholder={ 'to' } value={ this.state.to }
					           onChangeText={ (text) => this.setState({to: text}) }
					/>
					<TextInput style={ styles.inputs }
					           keyboardType={ 'number-pad' }
					           placeholder={ 'to' } value={ this.state.passengersCount }
					           onChangeText={ (text) => this.setState({passengersCount: text}) }
					/>
					<TouchableWithoutFeedback onPress={ () => this.setState({isDatePickerVisible: true}) }>
						<Text style={ styles.inputs }>
							{ this.state.date ? this.state.date : this.state.defaultDate }
						</Text>
					</TouchableWithoutFeedback>

					<DateTimePickerModal isVisible={ this.state.isDatePickerVisible }
					                     onConfirm={ this.handleDateSet }
					                     onCancel={ () => this.setState({isDatePickerVisible: false}) }
					                     mode={ 'datetime' }/>
					<Button onPress={ this.handleSubmit }
					        title={ 'Set' }>
						Set
					</Button>
					<Button onPress={ this.handleAddWaypoint } title={ '+' }>
						+
					</Button>
				</View>
			</View>
		);
	};

	handleRoutingReady = async (distance: any) => {
		const {coordinates = null} = distance;
		this.props.createRide({
			coordinates,
			passengersCount: this.state.passengersCount,
			rideFromName: this.state.from,
			rideToName: this.state.to,
			date: this.state.date,
		});

		this.setState({region: coordinates[0]});
		this.mapRef.fitToCoordinates(coordinates, {
			edgePadding: {
				right: (width / 20),
				bottom: (height / 20),
				left: (width / 20),
				top: (height / 20),
			},
			animated: true,
		});
		// this.mapRef.animateToRegion({
		//   longitude: coordinates[0].longitude,
		//   latitude: coordinates[0].latitude,
		//   latitudeDelta: 5,
		//   longitudeDelta: 5
		// });
	};

	handleSetWaypoint = (text: string, i: number) => {
		this.setState(state => {
			const updatedWaypoints = state.waypoints.map((waypoint, j) => {
				if (i === j) {
					return waypoint = text;
				}
				return waypoint;
			});
			return {
				...state,
				waypoints: updatedWaypoints,
			};
		});
	};

	handleAddWaypoint = () => {
		this.setState({
			waypoints: [...this.state.waypoints, ''],
		});
	};

	handleDateSet = (date: Date) => {
		this.setState({date: date.toISOString(), isDatePickerVisible: false});
	};

	handleSubmit = () => {
		this.setState({route: {from: this.state.from, to: this.state.to}, waypointsToSet: this.state.waypoints});
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	overlay: {
		position: 'absolute',
		flex: 1,
		top: 100,
		left: 100,
		zIndex: 1000,
		alignItems: 'center',
	},
	inputs: {
		width: 200,
		height: 40,
		marginBottom: 10,
		color: '#000',
		backgroundColor: '#fff',
	},
	maps: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({createRide}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesScreen);
