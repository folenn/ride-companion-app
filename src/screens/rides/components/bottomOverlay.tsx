import React, { Component } from 'react';
import { Animated, Dimensions, PanResponder, PanResponderInstance, StyleSheet, Text } from 'react-native';
import { getInset } from 'react-native-safe-area-view';
import { mainBackgroundColor } from '../../../styles/colors';

const bottomOffset = getInset('bottom');

class BottomOverlay extends Component {
  _panResponder: PanResponderInstance;
  animatedValue = new Animated.Value(-200);
  windowHeight = Dimensions.get('window').height;
  locationPageOffset;

  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        // @ts-ignore
        this.animatedValue.setOffset(this.animatedValue._value);
        this.animatedValue.setValue(0);
        // this.animatedValue.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        Animated.event([{y: this.animatedValue}])({y: -gestureState.dy});
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        // if (300 / 4 - gestureState.dy < 0) {
        //   this.animatedValue.setValue(-200);
        // }
        this.animatedValue.flattenOffset();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }
  render() {
    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={{...styles.test, bottom: this.animatedValue.interpolate({
            inputRange: [-200, 0],
            outputRange: [-200, 0],
            extrapolate: 'clamp'
          })}}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    position: 'absolute',
    width: '99%',
    alignSelf: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
    height: 300,
    backgroundColor: mainBackgroundColor,
  },
});

export default BottomOverlay;
