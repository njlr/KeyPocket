import React, {
  Component,
  Navigator,
  StyleSheet,
  Text,
  TextInput, 
  CheckBox, 
  SliderIOS, 
  View,
  TouchableHighlight, 
  TouchableOpacity
} from 'react-native';

const KeyPocket = require("./KeyPocket.js");

const Create = React.createClass({
    getInitialState() {
        return {
            name: "My Secret", 
            secret: "", 
            numberOfShares: 3, 
            threshold: 2
        };
    }, 
    updateNumberOfShares(value) {
        this.setState({numberOfShares: value}); 
        if (value < this.state.threshold) {
            this.setState({threshold: value})
        }
    }, 
    complete() {
        this.props.navigator.pop();
        let callback = this.props.callback;
        if (callback) {
            let secretSharing = KeyPocket.createSecretSharing(
                this.state.name, 
                this.state.secret, 
                this.state.numberOfShares, 
                this.state.threshold);
            callback(secretSharing);
        }
    }, 
    render() {
        return (
          <View style={styles.container}>
              <Text style={styles.label}>Name</Text>
              <TextInput 
                style={styles.textInput} 
                onChangeText={(text) => this.setState({name: text})} 
                value={this.state.name} />
              <Text style={styles.label}>Secret</Text>
              <TextInput 
                style={styles.textInputMultiline} 
                multiline={true}
                onChangeText={(text) => this.setState({secret: text})} 
                value={this.state.secret} />
              <View style={styles.labelValue}>
                <Text>Number of Shares</Text>
                <Text style={styles.value}>{this.state.numberOfShares}</Text>
              </View>
              <SliderIOS 
                style={styles.slider} 
                value={this.state.numberOfShares} 
                onValueChange={(value) => this.updateNumberOfShares(value)}
                minimumValue={3} maximumValue={10} step={1} />
              <View style={styles.labelValue}>
                <Text>Shares to Recover Secret</Text>
                <Text style={styles.value}>{this.state.threshold}</Text>
              </View>
              <SliderIOS 
                style={styles.slider} 
                value={this.state.threshold} 
                onValueChange={(value) => this.setState({threshold: value})}
                minimumValue={2} maximumValue={this.state.numberOfShares} step={1} />
              <TouchableOpacity style={styles.button} onPress={() => this.complete()}>
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
          </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: "column",
        margin: 10, 
    }, 
  label: {
    marginTop: 10, 
  }, 
  labelValue: {
    marginTop: 10, 
    alignSelf: "stretch", 
    justifyContent: "space-between", 
    flexDirection: "row", 
  }, 
  textInput: {
    height: 32,
    marginTop: 10,  
    padding: 4, 
    borderRadius: 4, 
    borderWidth: 1, 
    borderColor: "#d6d7da",
    fontSize: 16, 
  }, 
    textInputMultiline : {
        flex: 1, 
        marginTop: 10,  
        padding: 4, 
        borderRadius: 4, 
        borderWidth: 1, 
        borderColor: "#d6d7da",
        fontSize: 16, 
    }, 
  slider: { 
    alignSelf: "stretch", 
    height: 32, 
    marginTop: 10,
  },
    button: { 
        backgroundColor: "#00dcb0", 
        borderRadius: 8, 
        marginTop: 10, 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 10, 
    }, 
    buttonText: {
        color: "#fff", 
        fontSize: 18, 
    }
});

module.exports = Create;
