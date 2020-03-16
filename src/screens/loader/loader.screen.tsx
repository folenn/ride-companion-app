import React, { Component } from 'react';
import { ActivityIndicator, Animated, StyleSheet, View } from 'react-native';
import { RootState } from '../../redux/store/reducers';
import { connect } from 'react-redux';
import { getGlobalLoaderStatus } from '../../redux/store/reducers/shared.reducer';

interface Props {
  loaderActive: boolean;
}

interface State {
	fadeAnim: any;
}

class LoaderScreen extends Component<Props, State> {
	state = {
		fadeAnim: new Animated.Value(0)
	};

	componentDidMount(): void {
		Animated.timing(this.state.fadeAnim, {
			toValue: 0,
			duration: 200,
		}).start();
	}

	componentWillUnmount(): void {
		Animated.timing(this.state.fadeAnim, {
			toValue: 0,
			duration: 200,
		}).start();
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
		Animated.timing(this.state.fadeAnim, {
			toValue: this.props.loaderActive ? 1 : 0,
			duration: 200,
		}).start();
	}

	render() {
    return (
      <Animated.View style={ { ...(this.props.loaderActive ? styles.loaderActive : styles.loaderInactive), opacity: this.state.fadeAnim} }>
        <ActivityIndicator size="large" color="#FFCA27"/>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
	loaderInactive: {
		display: 'none'
	},
  loaderActive: {
	  position: 'absolute',
	  zIndex: 2,
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  width: '100%',
	  height: '100%',
	  backgroundColor: 'rgba(255, 255, 255, .7)',
  },
});

function mapStateToProps(state: RootState) {
  return {
    loaderActive: getGlobalLoaderStatus(state),
  };
}

export default connect(mapStateToProps)(LoaderScreen);
