'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    TouchableHighlight,
    StyleSheet,
    RecyclerViewBackedScrollView,
    Text,
    View,
    VibrationIOS, 
    ActivityIndicatorIOS, 
    Navigator, 
} = ReactNative;

import Camera from 'react-native-camera';

const Recover = React.createClass({
    getInitialState() {
        return {waitingForCode: true}
    }, 
    _onBarCodeRead(result) {
        if (this.state.waitingForCode) {
            this.setState({ waitingForCode: false });
            VibrationIOS.vibrate();
            this.props.navigator.pop();
            let callback = this.props.callback;
            if (callback) {
                callback(result.data);
            }
        }
    }, 
    render() {
        return (
          <View style={styles.container}>
              <Camera onBarCodeRead={this._onBarCodeRead} style={styles.camera}>
                  <View style={styles.rectangleContainer}>
                      <View style={styles.rectangle}/>
                  </View>
              </Camera>
          </View>);
    }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: "#fff", 
  },
  camera: {
    flex: 1,
    alignItems: 'center'
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent'
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = Recover;
