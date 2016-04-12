import React, {
  Component,
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableHighlight, 
  TouchableOpacity
} from 'react-native';

const InvalidScan = React.createClass({
  showRecoverScreen() {
    this.props.navigator.replace({index: 1, name: 'Recover', sceneConfig: Navigator.SceneConfigs.FloatFromBottom});
  },
  render() {
    var text = (this.props.code == null) ? "Code not defined" : this.props.code;
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.code}>
            {text}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}
            onPress={() => this.showRecoverScreen()}>
            <Text style={styles.buttonText}>Try Another</Text>
          </TouchableOpacity>
        </View>
     </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column", 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 64,
  },
  code: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: "#000"
  },
  contentContainer : {
    flex: 5
  }, 
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    height: 44,
    width: 120,
    flex: 1,
    backgroundColor: '#48BBEC',
    justifyContent: 'center',
    margin: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
});

module.exports = InvalidScan;
