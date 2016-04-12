"use strict;"

const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    LinkingIOS, 
} = ReactNative;

const Disclaimer = React.createClass({
    getInitialState() {

    }, 
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Disclaimer</Text>
                <Text style="bullet">KeyPocket </Text>
                <Text>
                    You can review the source code on&nbsp;                
                    <Text 
                        style={{color: 'blue'}}
                        onPress={() => LinkingIOS.openURL('http://google.com')}>
                        BitBucket
                    </Text>. 
                </Text>
            </View>
        );
    }, 
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 10, 
    },
    header: {
        fontSize: 18, 
    }
});

module.exports = Disclaimer;